// Copyright 2024 Northern.tech AS
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
/*eslint import/namespace: ['error', { allowComputed: true }]*/
import { Link } from 'react-router-dom';

import type {
  AttributeV2,
  Device as BackendDevice,
  DeviceConfiguration,
  DeviceInventory,
  DeviceState,
  DeviceWithImage,
  Integration,
  ManagementApiConfiguration,
  NewConfigurationDeployment,
  PreAuthSet,
  SortCriteria,
  Status
} from '@northern.tech/types/MenderTypes';
import { attributeDuplicateFilter, dateRangeToUnix, deepCompare, getSnackbarMessage } from '@northern.tech/utils/helpers';
import { isCancel } from 'axios';
import pluralize from 'pluralize';
import { v4 as uuid } from 'uuid';

import type { Device, DeviceFilter, DeviceGroup, DeviceGroups, DeviceListState, DeviceSelectedAttribute, DeviceStatus } from '.';
import { actions, sliceName } from '.';
import storeActions from '../actions';
import GeneralApi from '../api/general-api';
import type { SearchState } from '../appSlice';
import {
  ALL_DEVICE_STATES,
  DEVICE_FILTERING_OPTIONS,
  DEVICE_LIST_DEFAULTS,
  DEVICE_STATES,
  EXTERNAL_PROVIDER,
  MAX_PAGE_SIZE,
  SORTING_OPTIONS,
  TIMEOUTS,
  UNGROUPED_GROUP,
  auditLogsApiUrl,
  deviceAuthV2,
  deviceConfig,
  deviceConnect,
  headerNames,
  inventoryApiUrl,
  inventoryApiUrlV2,
  iotManagerBaseURL,
  rootfsImageVersion
} from '../constants';
import type { DeviceIssueOptionKey } from '../constants';
import {
  getAcceptedDevices,
  getAttrsEndpoint,
  getDeviceReports,
  getDeviceReportsForUser,
  getDeviceTwinIntegrations,
  getGlobalSettings,
  getIdAttribute,
  getSearchEndpoint,
  getSelectedDeviceAttribute,
  getTenantCapabilities,
  getUserCapabilities,
  getUserSettings
} from '../selectors';
import type { AppDispatch, RootState } from '../store';
import { commonErrorFallback, commonErrorHandler, createAppAsyncThunk } from '../store';
import { getDeviceMonitorConfig, getLatestDeviceAlerts, getSingleDeployment, saveGlobalSettings } from '../thunks';
import {
  convertDeviceListStateToFilters,
  extractErrorMessage,
  filtersFilter,
  mapDeviceAttributes,
  mapFiltersToTerms,
  mapTermsToFilters,
  progress
} from '../utils';
import { emptyFilter } from './constants';
import { getDeviceById as getDeviceByIdSelector, getDeviceFilters, getDeviceListState, getDevicesById, getGroupsById, getSelectedGroup } from './selectors';

const { cleanUpUpload, initUpload, setSnackbar, uploadProgress } = storeActions;
const { page: defaultPage, perPage: defaultPerPage } = DEVICE_LIST_DEFAULTS;

const defaultAttributes = [
  { scope: 'identity', attribute: 'status' },
  { scope: 'inventory', attribute: 'artifact_name' },
  { scope: 'inventory', attribute: 'device_type' },
  { scope: 'inventory', attribute: 'mender_is_gateway' },
  { scope: 'inventory', attribute: 'mender_gateway_system_id' },
  { scope: 'inventory', attribute: rootfsImageVersion },
  { scope: 'monitor', attribute: 'alerts' },
  { scope: 'system', attribute: 'created_ts' },
  { scope: 'system', attribute: 'updated_ts' },
  { scope: 'system', attribute: 'check_in_time' },
  { scope: 'system', attribute: 'group' },
  { scope: 'tags', attribute: 'name' }
];

export const getGroups = createAppAsyncThunk(`${sliceName}/getGroups`, (_, { dispatch, getState }) =>
  GeneralApi.get(`${inventoryApiUrl}/groups`).then(res => {
    const state: Record<string, DeviceGroup> = getGroupsById(getState());
    const dynamicGroups = Object.entries(state).reduce((accu, [id, group]) => {
      if (group.id || (group.filters?.length && id !== UNGROUPED_GROUP.id)) {
        accu[id] = group;
      }
      return accu;
    }, {});
    const groups = res.data.reduce((accu, group) => {
      accu[group] = { deviceIds: [], filters: [], total: 0, ...state[group] };
      return accu;
    }, dynamicGroups);
    const filters = [{ key: 'group', value: res.data, operator: DEVICE_FILTERING_OPTIONS.$nin.key, scope: 'system' }];
    return Promise.all([
      dispatch(actions.receivedGroups(groups)),
      dispatch(getDevicesByStatus({ filterSelection: filters, group: '', page: 1, perPage: 1, status: undefined }))
    ]).then((promises: [any, any]) => {
      const devicesRetrieval = promises[promises.length - 1] || [];
      const { payload } = devicesRetrieval || {};
      const result = payload[payload.length - 1] || {};
      if (!result.total) {
        return Promise.resolve() as ReturnType<AppDispatch>;
      }
      return Promise.resolve(
        dispatch(
          actions.addGroup({
            groupName: UNGROUPED_GROUP.id,
            group: { filters: [{ key: 'group', value: res.data, operator: DEVICE_FILTERING_OPTIONS.$nin.key, scope: 'system' }] }
          })
        )
      );
    });
  })
);

export const addDevicesToGroup = createAppAsyncThunk(
  `${sliceName}/addDevicesToGroup`,
  ({ group, deviceIds, isCreation }: { deviceIds: string[]; group: string; isCreation: boolean }, { dispatch }) =>
    GeneralApi.patch(`${inventoryApiUrl}/groups/${group}/devices`, deviceIds)
      .then(() => dispatch(actions.addToGroup({ group, deviceIds })))
      .finally(() => (isCreation ? Promise.resolve(dispatch(getGroups())) : {}))
);

export const removeDevicesFromGroup = createAppAsyncThunk(
  `${sliceName}/removeDevicesFromGroup`,
  ({ group, deviceIds }: { deviceIds: string[]; group: string }, { dispatch }) =>
    GeneralApi.delete(`${inventoryApiUrl}/groups/${group}/devices`, deviceIds).then(() =>
      Promise.all([
        dispatch(actions.removeFromGroup({ group, deviceIds })),
        dispatch(
          setSnackbar({
            message: `The ${pluralize('devices', deviceIds.length)} ${pluralize('were', deviceIds.length)} removed from the group`,
            autoHideDuration: TIMEOUTS.fiveSeconds
          })
        )
      ])
    )
);

const getGroupNotification = (newGroup: string, selectedGroup?: string) => {
  const successMessage = 'The group was updated successfully';
  if (newGroup === selectedGroup) {
    return { message: successMessage, autoHideDuration: TIMEOUTS.fiveSeconds };
  }
  return {
    action: '',
    autoHideDuration: TIMEOUTS.fiveSeconds,
    message: (
      <>
        {successMessage} - <Link to={`/devices?inventory=group:eq:${newGroup}`}>click here</Link> to see it.
      </>
    ),
    preventClickToCopy: true
  };
};

export const addStaticGroup = createAppAsyncThunk(
  `${sliceName}/addStaticGroup`,
  ({ group, devices }: { devices: Device[]; group: string }, { dispatch, getState }) =>
    Promise.resolve(dispatch(addDevicesToGroup({ group, deviceIds: devices.map(({ id }) => id), isCreation: true })))
      .then(() =>
        Promise.resolve(
          dispatch(
            actions.addGroup({
              group: { deviceIds: [], total: 0, filters: [], ...getState().devices.groups.byId[group] },
              groupName: group
            })
          )
        ).then(() =>
          Promise.all([
            dispatch(setDeviceListState({ setOnly: true })),
            dispatch(getGroups()),
            dispatch(setSnackbar(getGroupNotification(group, getState().devices.groups.selectedGroup)))
          ])
        )
      )
      .catch(err => commonErrorHandler(err, `Group could not be updated:`, dispatch))
);

export const removeStaticGroup = createAppAsyncThunk(`${sliceName}/removeStaticGroup`, (groupName: string, { dispatch }) =>
  GeneralApi.delete(`${inventoryApiUrl}/groups/${groupName}`).then(() =>
    Promise.all([
      dispatch(actions.removeGroup(groupName)),
      dispatch(getGroups()),
      dispatch(setSnackbar({ message: 'Group was removed successfully', autoHideDuration: TIMEOUTS.fiveSeconds }))
    ])
  )
);

export const getDynamicGroups = createAppAsyncThunk(`${sliceName}/getDynamicGroups`, (_, { dispatch, getState }) =>
  GeneralApi.get(`${inventoryApiUrlV2}/filters?per_page=${MAX_PAGE_SIZE}`)
    .then(({ data: filters }) => {
      const state: Record<string, DeviceGroup> = getGroupsById(getState());
      const staticGroups = Object.entries(state).reduce((accu, [id, group]) => {
        if (!(group.id || group.filters?.length)) {
          accu[id] = group;
        }
        return accu;
      }, {});
      const groups = (filters || []).reduce((accu, filter) => {
        accu[filter.name] = {
          deviceIds: [],
          total: 0,
          ...state[filter.name],
          id: filter.id,
          filters: mapTermsToFilters(filter.terms)
        };
        return accu;
      }, staticGroups);
      return Promise.resolve(dispatch(actions.receivedGroups(groups)));
    })
    .catch(() => console.log('Dynamic group retrieval failed - likely accessing a non-enterprise backend'))
);

export const addDynamicGroup = createAppAsyncThunk(
  `${sliceName}/addDynamicGroup`,
  ({ groupName, filterPredicates }: { filterPredicates: DeviceFilter[]; groupName: string }, { dispatch, getState }) =>
    GeneralApi.post(`${inventoryApiUrlV2}/filters`, { name: groupName, terms: mapFiltersToTerms(filterPredicates) })
      .then(res =>
        Promise.resolve(
          dispatch(
            actions.addGroup({
              groupName,
              group: {
                id: res.headers[headerNames.location].substring(res.headers[headerNames.location].lastIndexOf('/') + 1),
                filters: filterPredicates
              }
            })
          )
        ).then(() => {
          const { cleanedFilters } = getGroupFilters(groupName, getState().devices.groups);
          return Promise.all([
            dispatch(actions.setDeviceFilters(cleanedFilters)),
            dispatch(setSnackbar(getGroupNotification(groupName, getState().devices.groups.selectedGroup))),
            dispatch(getDynamicGroups())
          ]);
        })
      )
      .catch(err => commonErrorHandler(err, `Group could not be updated:`, dispatch))
);

export const updateDynamicGroup = createAppAsyncThunk(
  `${sliceName}/updateDynamicGroup`,
  ({ groupName, filterPredicates }: { filterPredicates: DeviceFilter[]; groupName: string }, { dispatch, getState }) => {
    const filterId = getState().devices.groups.byId[groupName].id;
    return GeneralApi.delete(`${inventoryApiUrlV2}/filters/${filterId}`).then(() =>
      Promise.resolve(dispatch(addDynamicGroup({ groupName, filterPredicates })) as ReturnType<AppDispatch>)
    );
  }
);

export const removeDynamicGroup = createAppAsyncThunk(`${sliceName}/removeDynamicGroup`, (groupName: string, { dispatch, getState }) => {
  const filterId = getState().devices.groups.byId[groupName].id;
  return GeneralApi.delete(`${inventoryApiUrlV2}/filters/${filterId}`).then(() =>
    Promise.all([
      dispatch(actions.removeGroup(groupName)),
      dispatch(setSnackbar({ message: 'Group was removed successfully', autoHideDuration: TIMEOUTS.fiveSeconds }))
    ])
  );
});

/*
 * Device inventory functions
 */
const getGroupFilters = (group: string, groupsState: DeviceGroups, filters: DeviceFilter[] = []) => {
  const groupName = group === UNGROUPED_GROUP.id || group === UNGROUPED_GROUP.name ? UNGROUPED_GROUP.id : group;
  const selectedGroup = groupsState.byId[groupName];
  const groupFilterLength = selectedGroup?.filters?.length || 0;
  const cleanedFilters = groupFilterLength ? [...filters, ...(selectedGroup.filters || [])].filter(filtersFilter) : filters;
  return { cleanedFilters, groupName, selectedGroup, groupFilterLength };
};

export const selectGroup = createAppAsyncThunk(
  `${sliceName}/selectGroup`,
  ({ group, filters = [] }: { filters: DeviceFilter[]; group: string }, { dispatch, getState }) => {
    const { cleanedFilters, groupName, selectedGroup, groupFilterLength } = getGroupFilters(group, getState().devices.groups, filters);
    if (getSelectedGroup(getState()) === groupName && ((filters.length === 0 && !groupFilterLength) || filters.length === cleanedFilters.length)) {
      return Promise.resolve() as ReturnType<AppDispatch>;
    }
    const tasks: ReturnType<AppDispatch>[] = [];
    if (groupFilterLength) {
      tasks.push(dispatch(actions.setDeviceFilters(cleanedFilters)));
    } else {
      tasks.push(dispatch(actions.setDeviceFilters(filters)));
      tasks.push(dispatch(getGroupDevices({ group: groupName, perPage: 1, shouldIncludeAllStates: true })));
    }
    const selectedGroupName = selectedGroup || !Object.keys(getGroupsById(getState())).length ? groupName : undefined;
    tasks.push(dispatch(actions.selectGroup(selectedGroupName)));
    return Promise.all(tasks);
  }
);

const getEarliestTs = (dateA = '', dateB = '') => (!dateA || !dateB ? dateA || dateB : dateA < dateB ? dateA : dateB);

type ReceivedDevice = BackendDevice & DeviceInventory & Omit<DeviceWithImage, 'status'>;
const reduceReceivedDevices = (devices: ReceivedDevice[], ids: string[], state: RootState, status?: DeviceStatus) =>
  devices.reduce(
    (accu, device: any) => {
      const stateDevice = getDeviceByIdSelector(state, device.id);
      const {
        attributes: storedAttributes = {},
        identity_data: storedIdentity = {},
        monitor: storedMonitor = {},
        tags: storedTags = {},
        group: storedGroup
      } = stateDevice;
      const { identity, inventory, monitor, system = {}, tags } = mapDeviceAttributes(device.attributes);
      device.tags = { ...storedTags, ...tags };
      device.group = system.group ?? storedGroup;
      device.monitor = { ...storedMonitor, ...monitor };
      device.identity_data = { ...storedIdentity, ...identity, ...(device.identity_data ? device.identity_data : {}) };
      device.status = status ? status : device.status || identity.status;
      device.check_in_time_rounded = system.check_in_time ?? stateDevice.check_in_time_rounded;
      device.check_in_time_exact = device.check_in_time ?? stateDevice.check_in_time_exact;
      device.created_ts = getEarliestTs(getEarliestTs(system.created_ts, device.created_ts), stateDevice.created_ts);
      device.updated_ts = device.attributes ? device.updated_ts : stateDevice.updated_ts;
      device.isNew = new Date(device.created_ts) > new Date(state.app.newThreshold);
      device.isOffline = new Date(device.check_in_time_rounded) < new Date(state.app.offlineThreshold) || device.check_in_time_rounded === undefined;
      // all the other mapped attributes return as empty objects if there are no attributes to map, but identity will be initialized with an empty state
      // for device_type and artifact_name, potentially overwriting existing info, so rely on stored information instead if there are no attributes
      device.attributes = device.attributes ? { ...storedAttributes, ...inventory } : storedAttributes;
      accu.devicesById[device.id] = { ...stateDevice, ...device };
      accu.ids.push(device.id);
      return accu;
    },
    { ids, devicesById: {} }
  );
type getGroupDevicesPayload = {
  group: string;
  page?: number;
  perPage?: number;
  shouldIncludeAllStates: boolean;
};
export const getGroupDevices = createAppAsyncThunk(`${sliceName}/getGroupDevices`, (options: getGroupDevicesPayload, { dispatch, getState }) => {
  const { group, shouldIncludeAllStates, ...remainder } = options;
  const { cleanedFilters: filterSelection } = getGroupFilters(group, getState().devices.groups);
  return dispatch(
    getDevicesByStatus({
      ...remainder,
      filterSelection,
      group,
      status: shouldIncludeAllStates ? undefined : DEVICE_STATES.accepted
    })
  )
    .unwrap()
    .then(results => {
      if (!group) {
        return Promise.resolve() as ReturnType<AppDispatch>;
      }
      const { deviceAccu, total } = results[results.length - 1];
      const stateGroup = getState().devices.groups.byId[group];
      if (!stateGroup && !total && !deviceAccu.ids.length) {
        return Promise.resolve();
      }
      return Promise.resolve(
        dispatch(
          actions.addGroup({
            group: {
              deviceIds:
                deviceAccu.ids.length === total || (stateGroup && stateGroup.deviceIds && deviceAccu.ids.length > stateGroup.deviceIds)
                  ? deviceAccu.ids
                  : stateGroup.deviceIds,
              total
            },
            groupName: group
          })
        )
      );
    });
});

export const getAllGroupDevices = createAppAsyncThunk(
  `${sliceName}/getAllGroupDevices`,
  ({ group, attribute }: { attribute: string; group: string }, { dispatch, getState }) => {
    if (!group || (!!group && (!getGroupsById(getState())[group] || getGroupsById(getState())[group].filters!.length))) {
      return Promise.resolve();
    }
    const { attributes, filterTerms } = prepareSearchArguments({
      filters: [],
      group,
      state: getState(),
      status: DEVICE_STATES.accepted
    });
    const getAllDevices = (perPage = MAX_PAGE_SIZE, page = defaultPage, devices: string[] = []) =>
      GeneralApi.post(getSearchEndpoint(getState()), {
        page,
        per_page: perPage,
        filters: filterTerms,
        attributes: [...attributes, { scope: 'inventory', attribute }]
      }).then(res => {
        const state = getState();
        const deviceAccu = reduceReceivedDevices(res.data, devices, state);
        dispatch(actions.receivedDevices(deviceAccu.devicesById));
        const total = Number(res.headers[headerNames.total]);
        if (total > perPage * page) {
          return getAllDevices(perPage, page + 1, deviceAccu.ids);
        }
        return Promise.resolve(dispatch(actions.addGroup({ group: { deviceIds: deviceAccu.ids, total: deviceAccu.ids.length }, groupName: group })));
      });
    return getAllDevices();
  }
);

export const getAllDynamicGroupDevices = createAppAsyncThunk(
  `${sliceName}/getAllDynamicGroupDevices`,
  ({ group, attribute }: { attribute: string; group: string }, { dispatch, getState }) => {
    if (!!group && (!getGroupsById(getState())[group] || !getGroupsById(getState())[group].filters!.length)) {
      return Promise.resolve();
    }
    const { attributes, filterTerms: filters } = prepareSearchArguments({
      filters: getState().devices.groups.byId[group].filters,
      state: getState(),
      status: DEVICE_STATES.accepted
    });
    const getAllDevices = (perPage = MAX_PAGE_SIZE, page = defaultPage, devices: string[] = []) =>
      GeneralApi.post(getSearchEndpoint(getState()), { page, per_page: perPage, filters, attributes: [...attributes, { scope: 'inventory', attribute }] }).then(
        res => {
          const state = getState();
          const deviceAccu = reduceReceivedDevices(res.data, devices, state);
          dispatch(actions.receivedDevices(deviceAccu.devicesById));
          const total = Number(res.headers[headerNames.total]);
          if (total > deviceAccu.ids.length) {
            return getAllDevices(perPage, page + 1, deviceAccu.ids);
          }
          return Promise.resolve(dispatch(actions.addGroup({ group: { deviceIds: deviceAccu.ids, total }, groupName: group })));
        }
      );
    return getAllDevices();
  }
);

export const getDeviceById = createAppAsyncThunk(`${sliceName}/getDeviceById`, (id: string, { dispatch, getState }) =>
  GeneralApi.get(`${inventoryApiUrl}/devices/${id}`)
    .then(res => {
      const device = reduceReceivedDevices([res.data], [], getState()).devicesById[id];
      device.etag = res.headers.etag;
      dispatch(actions.receivedDevice(device));
      return Promise.resolve(device);
    })
    .catch(err => {
      const errMsg = extractErrorMessage(err);
      if (errMsg.includes('Not Found')) {
        console.log(`${id} does not have any inventory information`);
        const device = reduceReceivedDevices(
          [
            {
              id,
              attributes: [
                { name: 'status', value: 'decomissioned', scope: 'identity' },
                { name: 'decomissioned', value: 'true', scope: 'inventory' }
              ],
              log: false
            }
          ],
          [],
          getState()
        ).devicesById[id];
        dispatch(actions.receivedDevice(device));
      }
    })
);

export const getDeviceInfo = createAppAsyncThunk(`${sliceName}/getDeviceInfo`, (deviceId: string, { dispatch, getState }) => {
  const device = getDeviceByIdSelector(getState(), deviceId) as Device;
  const { hasDeviceConfig, hasDeviceConnect, hasMonitor } = getTenantCapabilities(getState());
  const { canConfigure } = getUserCapabilities(getState());
  const integrations = getDeviceTwinIntegrations(getState());
  // Get full device identity details for single selected device
  const tasks: ReturnType<AppDispatch>[] = [
    dispatch(getDeviceAuth(deviceId)),
    dispatch(getDeviceById(deviceId)),
    ...integrations.map(integration => dispatch(getDeviceTwin({ deviceId, integration })))
  ];
  if (hasDeviceConfig && canConfigure && (device.status === DEVICE_STATES.accepted || device.status === DEVICE_STATES.preauth)) {
    tasks.push(dispatch(getDeviceConfig(deviceId)));
  }
  if (device.status === DEVICE_STATES.accepted) {
    if (hasDeviceConnect) {
      tasks.push(dispatch(getDeviceConnect(deviceId)));
    }
    if (hasMonitor) {
      tasks.push(dispatch(getLatestDeviceAlerts({ id: deviceId })));
      tasks.push(dispatch(getDeviceMonitorConfig(deviceId)));
    }
  }
  return Promise.all(tasks);
});

/*
    Device Auth + admission
  */
export const getDeviceCount = createAppAsyncThunk(`${sliceName}/getDeviceCount`, (status: DeviceStatus, { dispatch, getState }) =>
  GeneralApi.post(getSearchEndpoint(getState()), {
    page: 1,
    per_page: 1,
    filters: mapFiltersToTerms([{ key: 'status', value: status, operator: DEVICE_FILTERING_OPTIONS.$eq.key, scope: 'identity' }]),
    attributes: defaultAttributes
  }).then(response => {
    const count = Number(response.headers[headerNames.total]);
    return dispatch(actions.setDevicesCountByStatus({ count, status }));
  })
);

export const getAllDeviceCounts = createAppAsyncThunk(`${sliceName}/getAllDeviceCounts`, (_, { dispatch }) =>
  Promise.all([DEVICE_STATES.accepted, DEVICE_STATES.pending].map(status => dispatch(getDeviceCount(status))))
);

export const getDeviceLimit = createAppAsyncThunk(`${sliceName}/getDeviceLimit`, (_, { dispatch }) =>
  GeneralApi.get(`${deviceAuthV2}/limits/max_devices`).then(res => dispatch(actions.setDeviceLimit(res.data.limit)))
);

type SetDeviceListStatePayload = {
  fetchAuth?: boolean;
  forceRefresh?: boolean;
  shouldSelectDevices?: boolean;
} & Partial<DeviceListState>;
export const setDeviceListState = createAppAsyncThunk(
  `${sliceName}/setDeviceListState`,
  ({ shouldSelectDevices = true, forceRefresh, fetchAuth = true, ...selectionState }: SetDeviceListStatePayload, { dispatch, getState }) => {
    const currentState = getDeviceListState(getState());
    const refreshTrigger = forceRefresh ? !currentState.refreshTrigger : selectionState.refreshTrigger;
    const nextState = {
      ...currentState,
      setOnly: false,
      refreshTrigger,
      ...selectionState,
      sort: { ...currentState.sort, ...selectionState.sort }
    };
    const tasks: ReturnType<AppDispatch>[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isLoading: currentLoading, deviceIds: currentDevices, selection: currentSelection, ...currentRequestState } = currentState;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isLoading: nextLoading, deviceIds: nextDevices, selection: nextSelection, ...nextRequestState } = nextState;
    if (!nextState.setOnly && !deepCompare(currentRequestState, nextRequestState)) {
      const { direction: sortDown = SORTING_OPTIONS.desc, key: sortCol, scope: sortScope = '' } = nextState.sort ?? {};
      const sortBy = sortCol ? ([{ attribute: sortCol, order: sortDown as SortCriteria['order'], scope: sortScope }] as SortCriteria[]) : undefined;
      const applicableSelectedState = nextState.state === ALL_DEVICE_STATES ? undefined : nextState.state;
      nextState.isLoading = true;
      tasks.push(
        dispatch(getDevicesByStatus({ ...nextState, status: applicableSelectedState as DeviceStatus | undefined, sortOptions: sortBy, fetchAuth }))
          .unwrap()
          .then(results => {
            const { deviceAccu, total } = results[results.length - 1];
            const devicesState = shouldSelectDevices ? { deviceIds: deviceAccu.ids, total, isLoading: false } : { isLoading: false };
            return Promise.resolve(dispatch(actions.setDeviceListState(devicesState)));
          })
          // whatever happens, change "loading" back to null
          .catch(() => Promise.resolve({ isLoading: false }))
      );
    }
    tasks.push(dispatch(actions.setDeviceListState(nextState)));
    return Promise.all(tasks);
  }
);

type GetDevicesByStatusPayload = {
  fetchAuth: boolean;
  filterSelection: DeviceFilter[];
  group: string;
  page: number;
  perPage: number;
  selectedAttributes: DeviceSelectedAttribute[];
  selectedIssues: DeviceIssueOptionKey[];
  sortOptions: SortCriteria[];
  status: DeviceStatus;
};
// get devices from inventory
export const getDevicesByStatus = createAppAsyncThunk(
  `${sliceName}/getDevicesByStatus`,
  (options: Partial<GetDevicesByStatusPayload>, { dispatch, getState }) => {
    const {
      status,
      fetchAuth = true,
      filterSelection,
      group,
      selectedIssues = [],
      page = defaultPage,
      perPage = defaultPerPage,
      sortOptions = [],
      selectedAttributes = getSelectedDeviceAttribute(getState())
    } = options;
    const state = getState();
    const { applicableFilters, filterTerms } = convertDeviceListStateToFilters({
      filters: filterSelection ?? getDeviceFilters(state),
      group: group ?? getSelectedGroup(state),
      groups: state.devices.groups,
      offlineThreshold: state.app.offlineThreshold,
      selectedIssues,
      status
    });
    const attributes = [...defaultAttributes, getIdAttribute(getState()), ...selectedAttributes];
    return GeneralApi.post(getSearchEndpoint(getState()), {
      page,
      per_page: perPage,
      filters: filterTerms,
      sort: sortOptions,
      attributes
    })
      .then(response => {
        const state = getState();
        const deviceAccu = reduceReceivedDevices(response.data, [], state, status);
        let total = !applicableFilters.length ? Number(response.headers[headerNames.total]) : 0;
        if (status && state.devices.byStatus[status].total === deviceAccu.ids.length) {
          total = deviceAccu.ids.length;
        }
        const tasks: ReturnType<AppDispatch>[] = [dispatch(actions.receivedDevices(deviceAccu.devicesById))];
        if (status) {
          tasks.push(dispatch(actions.setDevicesByStatus({ deviceIds: deviceAccu.ids, status, total })));
        }
        // for each device, get device identity info
        const receivedDevices: Device[] = Object.values(deviceAccu.devicesById);
        if (receivedDevices.length && fetchAuth) {
          tasks.push(dispatch(getDevicesWithAuth(receivedDevices)));
        }
        tasks.push(Promise.resolve({ deviceAccu, total: Number(response.headers[headerNames.total]) }));
        return Promise.all(tasks);
      })
      .catch(err => commonErrorHandler(err, `${status} devices couldn't be loaded.`, dispatch, commonErrorFallback));
  }
);

export const getAllDevicesByStatus = createAppAsyncThunk(
  `${sliceName}/getAllDevicesByStatus`,
  ({ status, attribute }: { attribute: string; status: DeviceStatus }, { dispatch, getState }) => {
    const attributes = [...defaultAttributes, getIdAttribute(getState())];
    const getAllDevices = (perPage = MAX_PAGE_SIZE, page = 1, devices: string[] = []) =>
      GeneralApi.post(getSearchEndpoint(getState()), {
        page,
        per_page: perPage,
        filters: mapFiltersToTerms([{ key: 'status', value: status, operator: DEVICE_FILTERING_OPTIONS.$eq.key, scope: 'identity' }]),
        attributes: [...attributes, { scope: 'inventory', attribute }]
      }).then(res => {
        const state = getState();
        const deviceAccu = reduceReceivedDevices(res.data, devices, state, status);
        dispatch(actions.receivedDevices(deviceAccu.devicesById));
        const total = Number(res.headers[headerNames.total]);
        if (total > state.deployments.deploymentDeviceLimit) {
          return Promise.resolve();
        }
        if (total > perPage * page) {
          return getAllDevices(perPage, page + 1, deviceAccu.ids);
        }
        return Promise.resolve();
      });
    return getAllDevices();
  }
);

type SearchDevicesPayload = SearchState & { sortOptions: SortCriteria[] };
export const searchDevices = createAppAsyncThunk(`${sliceName}/searchDevices`, (passedOptions: Partial<SearchDevicesPayload> = {}, { dispatch, getState }) => {
  const state = getState();
  const options = { ...state.app.searchState, ...passedOptions };
  const { page = defaultPage, searchTerm, sortOptions = [] } = options;
  const { columnSelection = [] } = getUserSettings(state);
  const selectedAttributes = columnSelection.map(column => ({ attribute: column.key, scope: column.scope }));
  const attributes = attributeDuplicateFilter([...defaultAttributes, getIdAttribute(state), ...selectedAttributes], 'attribute');
  return GeneralApi.post(getSearchEndpoint(getState()), {
    page,
    per_page: 10,
    filters: [],
    sort: sortOptions,
    text: searchTerm,
    attributes
  })
    .then(response => {
      const deviceAccu = reduceReceivedDevices(response.data, [], getState());
      return Promise.all([
        dispatch(actions.receivedDevices(deviceAccu.devicesById)),
        Promise.resolve({ deviceIds: deviceAccu.ids, searchTotal: Number(response.headers[headerNames.total]) })
      ]);
    })
    .catch(err => commonErrorHandler(err, `devices couldn't be searched.`, dispatch, commonErrorFallback));
});

const ATTRIBUTE_LIST_CUTOFF = 100;
const attributeReducer = (attributes: AttributeV2[] = []) =>
  attributes.slice(0, ATTRIBUTE_LIST_CUTOFF).reduce(
    (accu, { name, scope }) => {
      if (!accu[scope]) {
        accu[scope] = [];
      }
      accu[scope].push(name);
      return accu;
    },
    { identity: [], inventory: [], system: [], tags: [] }
  );

export const getDeviceAttributes = createAppAsyncThunk(`${sliceName}/getDeviceAttributes`, (_, { dispatch, getState }) =>
  GeneralApi.get(getAttrsEndpoint(getState())).then(({ data }) => {
    // TODO: remove the array fallback once the inventory attributes endpoint is fixed
    const { identity: identityAttributes, inventory: inventoryAttributes, system: systemAttributes, tags: tagAttributes } = attributeReducer(data || []);
    return dispatch(actions.setFilterAttributes({ identityAttributes, inventoryAttributes, systemAttributes, tagAttributes }));
  })
);

const initializeDistributionData = (report, groups: Record<string, DeviceGroup>, devices: Record<string, Device>, totalDeviceCount: number) => {
  const { attribute, group = '', software = '' } = report;
  const effectiveAttribute = software ? software : attribute;
  const { deviceIds, total = 0 } = groups[group] || {};
  const relevantDevices: Device[] = deviceIds ? deviceIds.map(id => devices[id]) : Object.values(devices);
  const distributionByAttribute = relevantDevices.reduce<Record<string, number>>((accu, item) => {
    if (!item.attributes || item.status !== DEVICE_STATES.accepted) return accu;
    const attributeValue: string = item.attributes[effectiveAttribute] as string;
    if (!accu[attributeValue]) {
      accu[attributeValue] = 0;
    }
    accu[attributeValue] = accu[attributeValue] + 1;
    return accu;
  }, {});
  const distributionByAttributeSorted = Object.entries(distributionByAttribute).sort((pairA, pairB) => pairB[1] - pairA[1]);
  const items: { count: number; key: string }[] = distributionByAttributeSorted.map(([key, count]) => ({ key, count }));
  const dataCount = items.reduce<number>((accu, item) => accu + item.count, 0);
  // the following is needed to show reports including both old (artifact_name) & current style (rootfs-image.version) device software
  const otherCount = (groups[group] ? total : totalDeviceCount) - dataCount;
  return { items, otherCount, total: otherCount + dataCount };
};

export const updateReportData = createAppAsyncThunk(`${sliceName}/updateReportData`, (reportIndex: number, { dispatch, getState }) => {
  const reports = getDeviceReportsForUser(getState());
  const report = reports[reportIndex];
  const { group = '' } = report;
  const devicesById = getDevicesById(getState());
  const groups = getGroupsById(getState());
  const acceptedDevices = getAcceptedDevices(getState());
  const totalDeviceCount = groups[group] ? (groups[group].total as number) : acceptedDevices.total;

  const reportsData = getDeviceReports(getState());
  const newReports = [...reportsData];
  newReports[reportIndex] = initializeDistributionData(report, groups, devicesById, totalDeviceCount);
  return Promise.resolve(dispatch(actions.setDeviceReports(newReports)));
});

export const getReportDataWithoutBackendSupport = createAppAsyncThunk(
  `${sliceName}/getReportDataWithoutBackendSupport`,
  (reportIndex: number, { dispatch, getState }) => {
    const reports = getDeviceReportsForUser(getState());
    const report = reports[reportIndex];
    if (!report) {
      return;
    }
    const { attribute, group = '', software = '' } = report;
    const effectiveAttribute = software ? software : attribute;
    const devicesById = getDevicesById(getState());
    const acceptedDevices = getAcceptedDevices(getState());
    const groups = getGroupsById(getState());
    const { deviceIds = [], filters = [], total = 0 } = groups[group] || {};
    let groupDevicesRequest = Promise.resolve({
      payload: { groupName: '', group: { deviceIds: Object.keys(devicesById), total: Object.keys(devicesById).length } }
    });
    if (group && (!(deviceIds.length && total) || deviceIds.length !== total || !deviceIds.every(id => !!devicesById[id]))) {
      groupDevicesRequest = filters.length
        ? dispatch(getAllDynamicGroupDevices({ group, attribute: effectiveAttribute })).unwrap()
        : dispatch(getAllGroupDevices({ group, attribute: effectiveAttribute })).unwrap();
    } else if (!group && (acceptedDevices.deviceIds.length !== acceptedDevices.total || !acceptedDevices.deviceIds.every(id => !!devicesById[id]))) {
      groupDevicesRequest = dispatch(getAllDevicesByStatus({ status: DEVICE_STATES.accepted, attribute: effectiveAttribute })).unwrap();
    }
    return groupDevicesRequest.then(() => dispatch(updateReportData(reportIndex)));
  }
);

export const getDeviceConnect = createAppAsyncThunk(`${sliceName}/getDeviceConnect`, (id: string, { dispatch }) =>
  GeneralApi.get(`${deviceConnect}/devices/${id}`).then(({ data }) =>
    Promise.all([dispatch(actions.receivedDevice({ connect_status: data.status, connect_updated_ts: data.updated_ts, id })), Promise.resolve(data)])
  )
);

const updateTypeMap = { deploymentUpdate: 'check-update', inventoryUpdate: 'send-inventory' };
export const triggerDeviceUpdate = createAppAsyncThunk(`${sliceName}/triggerDeviceUpdate`, ({ id, type }: { id: string; type: string }, { dispatch }) =>
  GeneralApi.post(`${deviceConnect}/devices/${id}/${updateTypeMap[type] ?? updateTypeMap.deploymentUpdate}`)
    .catch(err => commonErrorHandler(err, `The request couldn’t be sent.`, dispatch))
    .then(() => {
      dispatch(setSnackbar('Request has been sent.'));
      return new Promise(resolve => setTimeout(() => resolve(dispatch(getDeviceById(id)) as ReturnType<AppDispatch>), TIMEOUTS.threeSeconds));
    })
);

type GetSessionDetailsPayload = { deviceId: string; endDate: string; sessionId: string; startDate: string; userId: string };
export const getSessionDetails = createAppAsyncThunk(
  `${sliceName}/getSessionDetails`,
  ({ sessionId, deviceId, userId, startDate, endDate }: GetSessionDetailsPayload) => {
    const { start: startUnix, end: endUnix } = dateRangeToUnix(startDate, endDate);
    const createdAfter = startDate ? `&created_after=${startUnix}` : '';
    const createdBefore = endDate ? `&created_before=${endUnix}` : '';
    const objectSearch = `&object_id=${deviceId}`;
    return GeneralApi.get(`${auditLogsApiUrl}/logs?per_page=500${createdAfter}${createdBefore}&actor_id=${userId}${objectSearch}`).then(
      ({ data: auditLogEntries }) => {
        const { start, end } = auditLogEntries.reduce(
          (accu, item) => {
            if (item.meta?.session_id?.includes(sessionId)) {
              accu.start = new Date(item.action.startsWith('open') ? item.time : accu.start);
              accu.end = new Date(item.action.startsWith('close') ? item.time : accu.end);
            }
            return accu;
          },
          { start: startDate || endDate, end: endDate || startDate }
        );
        return Promise.resolve({ start, end });
      }
    );
  }
);

export const getDeviceFileDownloadLink = createAppAsyncThunk(
  `${sliceName}/getDeviceFileDownloadLink`,
  ({ deviceId, path }: { deviceId: string; path: string }) =>
    Promise.resolve(`${window.location.origin}${deviceConnect}/devices/${deviceId}/download?path=${encodeURIComponent(path)}`)
);

export const deviceFileUpload = createAppAsyncThunk(
  `${sliceName}/deviceFileUpload`,
  ({ deviceId, path, file }: { deviceId: string; file: File; path: string }, { dispatch }) => {
    const formData = new FormData();
    formData.append('path', path);
    formData.append('file', file);
    const uploadId = uuid();
    const cancelSource = new AbortController();
    return Promise.all([
      dispatch(setSnackbar('Uploading file')),
      dispatch(initUpload({ id: uploadId, upload: { progress: 0, cancelSource } })),
      GeneralApi.uploadPut(
        `${deviceConnect}/devices/${deviceId}/upload`,
        formData,
        e => dispatch(uploadProgress({ id: uploadId, progress: progress(e) })),
        cancelSource.signal
      )
    ])
      .then(() => Promise.resolve(dispatch(setSnackbar({ message: 'Upload successful', autoHideDuration: TIMEOUTS.fiveSeconds }))))
      .catch(err => {
        if (isCancel(err)) {
          return dispatch(setSnackbar({ message: 'The upload has been cancelled', autoHideDuration: TIMEOUTS.fiveSeconds }));
        }
        return commonErrorHandler(err, `Error uploading file to device.`, dispatch);
      })
      .finally(() => dispatch(cleanUpUpload(uploadId)));
  }
);

export const getDeviceAuth = createAppAsyncThunk(`${sliceName}/getDeviceAuth`, (id: string, { dispatch }) =>
  dispatch(getDevicesWithAuth([{ id }]))
    .unwrap()
    .then(results => {
      if (results[results.length - 1]) {
        return Promise.resolve(results[results.length - 1][0]);
      }
      return Promise.resolve();
    })
);

export const getDevicesWithAuth = createAppAsyncThunk(`${sliceName}/getDevicesWithAuth`, (devices: { id: string }[], { dispatch, getState }) =>
  devices.length
    ? GeneralApi.get(`${deviceAuthV2}/devices?id=${devices.map(device => device.id).join('&id=')}`)
        .then(({ data: receivedDevices }) => {
          const { devicesById } = reduceReceivedDevices(receivedDevices, [], getState());
          return Promise.all([dispatch(actions.receivedDevices(devicesById)), Promise.resolve(receivedDevices)]);
        })
        .catch(err => commonErrorHandler(err, `Error: ${err}`, dispatch))
    : (Promise.resolve([[], []]) as ReturnType<AppDispatch>)
);

export const updateDeviceAuth = createAppAsyncThunk(
  `${sliceName}/updateDeviceAuth`,
  ({ deviceId, authId, status }: { authId: string; deviceId: string; status: Status['status'] }, { dispatch, getState }) =>
    GeneralApi.put(`${deviceAuthV2}/devices/${deviceId}/auth/${authId}/status`, { status })
      .then(() => Promise.all([dispatch(getDeviceAuth(deviceId)), dispatch(setSnackbar('Device authorization status was updated successfully'))]))
      .catch(err => commonErrorHandler(err, 'There was a problem updating the device authorization status:', dispatch))
      .then(() => Promise.resolve(dispatch(actions.maybeUpdateDevicesByStatus({ deviceId, authId }))))
      .finally(() => dispatch(setDeviceListState({ refreshTrigger: !getDeviceListState(getState()).refreshTrigger })))
);

export const updateDevicesAuth = createAppAsyncThunk(
  `${sliceName}/updateDevicesAuth`,
  ({ deviceIds, status }: { deviceIds: string[]; status: Status['status'] }, { dispatch, getState }) => {
    let devices = getDevicesById(getState());
    const deviceIdsWithoutAuth = deviceIds.reduce<{ id: string }[]>((accu, id) => (devices[id].auth_sets ? accu : [...accu, { id }]), []);
    return dispatch(getDevicesWithAuth(deviceIdsWithoutAuth)).then(() => {
      devices = getDevicesById(getState());
      // for each device, get id and id of authset & make api call to accept
      // if >1 authset, skip instead
      const deviceAuthUpdates = deviceIds.map(id => {
        const device = devices[id];
        if (device.auth_sets && device.auth_sets.length !== 1) {
          return Promise.reject();
        }
        // api call device.id and device.authsets[0].id
        return dispatch(updateDeviceAuth({ authId: device.auth_sets![0].id!, deviceId: device.id, status }))
          .unwrap()
          .catch(err => commonErrorHandler(err, 'The action was stopped as there was a problem updating a device authorization status: ', dispatch, '', false));
      });
      return Promise.allSettled(deviceAuthUpdates).then(results => {
        const { skipped, count } = results.reduce(
          (accu, item) => {
            if (item.status === 'rejected') {
              accu.skipped = accu.skipped + 1;
            } else {
              accu.count = accu.count + 1;
            }
            return accu;
          },
          { skipped: 0, count: 0 }
        );
        const message = getSnackbarMessage(skipped, count);
        // break if an error occurs, display status up til this point before error message
        return dispatch(setSnackbar(message));
      });
    });
  }
);

export const deleteAuthset = createAppAsyncThunk(
  `${sliceName}/deleteAuthset`,
  ({ deviceId, authId }: { authId: string; deviceId: string }, { dispatch, getState }) =>
    GeneralApi.delete(`${deviceAuthV2}/devices/${deviceId}/auth/${authId}`)
      .then(() => Promise.all([dispatch(setSnackbar('Device authorization status was updated successfully'))]))
      .catch(err => commonErrorHandler(err, 'There was a problem updating the device authorization status:', dispatch))
      .then(() => Promise.resolve(dispatch(actions.maybeUpdateDevicesByStatus({ deviceId, authId }))))
      .finally(() => dispatch(setDeviceListState({ refreshTrigger: !getState().devices.deviceList.refreshTrigger })))
);

export const preauthDevice = createAppAsyncThunk(`${sliceName}/preauthDevice`, (authset: PreAuthSet, { dispatch, rejectWithValue }) =>
  GeneralApi.post(`${deviceAuthV2}/devices`, authset)
    .then(() =>
      Promise.resolve(dispatch(setSnackbar({ message: 'Device was successfully added to the preauthorization list', autoHideDuration: TIMEOUTS.fiveSeconds })))
    )
    .catch(err => {
      if (err.response.status === 409) {
        return rejectWithValue('A device with a matching identity data set already exists');
      }
      return commonErrorHandler(err, 'The device could not be added:', dispatch);
    })
);

export const decommissionDevice = createAppAsyncThunk(
  `${sliceName}/decommissionDevice`,
  ({ deviceId, authId }: { authId?: string; deviceId: string }, { dispatch, getState }) =>
    GeneralApi.delete(`${deviceAuthV2}/devices/${deviceId}`)
      .then(() => Promise.resolve(dispatch(setSnackbar('Device was decommissioned successfully'))))
      .catch(err => commonErrorHandler(err, 'There was a problem decommissioning the device:', dispatch))
      .then(() => Promise.resolve(dispatch(actions.maybeUpdateDevicesByStatus({ deviceId, authId }))))
      // trigger reset of device list list!
      .finally(() => dispatch(setDeviceListState({ refreshTrigger: !getState().devices.deviceList.refreshTrigger })))
);

export const getDeviceConfig = createAppAsyncThunk(`${sliceName}/getDeviceConfig`, (deviceId: string, { dispatch }) =>
  GeneralApi.get<DeviceConfiguration>(`${deviceConfig}/${deviceId}`)
    .then(({ data }) => Promise.all([dispatch(actions.receivedDevice({ id: deviceId, config: data })), Promise.resolve(data)]))
    .catch(err => {
      // if we get a proper error response we most likely queried a device without an existing config check-in and we can just ignore the call
      if (err.response?.data?.error.status_code !== 404) {
        return commonErrorHandler(err, `There was an error retrieving the configuration for device ${deviceId}.`, dispatch, commonErrorFallback);
      }
    })
);

export const setDeviceConfig = createAppAsyncThunk(
  `${sliceName}/setDeviceConfig`,
  ({ deviceId, config }: { config: ManagementApiConfiguration; deviceId: string }, { dispatch }) =>
    GeneralApi.put(`${deviceConfig}/${deviceId}`, config)
      .catch(err => commonErrorHandler(err, `There was an error setting the configuration for device ${deviceId}.`, dispatch, commonErrorFallback))
      .then(() => Promise.resolve(dispatch(getDeviceConfig(deviceId))))
);
type ApplyDeviceConfigPayload = {
  config: DeviceConfiguration;
  configDeploymentConfiguration: NewConfigurationDeployment;
  deviceId: string;
  isDefault: boolean;
};
export const applyDeviceConfig = createAppAsyncThunk(
  `${sliceName}/applyDeviceConfig`,
  ({ deviceId, configDeploymentConfiguration, isDefault, config }: ApplyDeviceConfigPayload, { dispatch, getState }) =>
    GeneralApi.post(`${deviceConfig}/${deviceId}/deploy`, configDeploymentConfiguration)
      .catch(err => commonErrorHandler(err, `There was an error deploying the configuration to device ${deviceId}.`, dispatch, commonErrorFallback))
      .then(({ data }) => {
        const device = getDeviceByIdSelector(getState(), deviceId);
        const { canManageUsers } = getUserCapabilities(getState());
        const tasks: ReturnType<AppDispatch>[] = [
          dispatch(actions.receivedDevice({ ...device, config: { ...device.config, deployment_id: data.deployment_id } })),
          new Promise(resolve => setTimeout(() => resolve(dispatch(getSingleDeployment(data.deployment_id))), TIMEOUTS.oneSecond))
        ];
        if (isDefault && canManageUsers) {
          const { previous } = getGlobalSettings(getState()).defaultDeviceConfig ?? {};
          tasks.push(dispatch(saveGlobalSettings({ defaultDeviceConfig: { current: config, previous } })));
        }
        return Promise.all(tasks);
      })
);

export const setDeviceTags = createAppAsyncThunk(
  `${sliceName}/setDeviceTags`,
  ({ deviceId, tags }: { deviceId: string; tags: Record<string, string> }, { dispatch }) =>
    // to prevent tag set failures, retrieve the device & use the freshest etag we can get
    dispatch(getDeviceById(deviceId))
      .unwrap()
      .then(device => {
        const headers = device.etag ? { 'If-Match': device.etag } : {};
        const tagList = Object.entries(tags).map(([name, value]) => ({ name, value }));
        const isNameChange = tagList.some(({ name }) => name === 'name');
        return GeneralApi.put(`${inventoryApiUrl}/devices/${deviceId}/tags`, tagList, { headers })
          .catch(err => commonErrorHandler(err, `There was an error setting tags for device ${deviceId}.`, dispatch, 'Please check your connection.'))
          .then(() =>
            Promise.all([
              dispatch(actions.receivedDevice({ ...device, id: deviceId, tags })),
              dispatch(setSnackbar(`Device ${tagList.length === 1 && isNameChange ? 'name' : 'tags'} changed`))
            ])
          );
      })
);

type DeviceTwinPayload = { deviceId: string; integration: Integration };
export const getDeviceTwin = createAppAsyncThunk(`${sliceName}/getDeviceTwin`, ({ deviceId, integration }: DeviceTwinPayload, { dispatch, getState }) => {
  let providerResult = {};
  return GeneralApi.get<DeviceState>(`${iotManagerBaseURL}/devices/${deviceId}/state`)
    .then(({ data }) => {
      providerResult = { ...data, twinError: '' };
    })
    .catch(err => {
      providerResult = {
        twinError: `There was an error getting the ${EXTERNAL_PROVIDER[integration.provider].twinTitle.toLowerCase()} for device ${deviceId}. ${err}`
      };
    })
    .finally(() => {
      const device = getDeviceByIdSelector(getState(), deviceId);
      Promise.resolve(dispatch(actions.receivedDevice({ ...device, twinsByIntegration: { ...device.twinsByIntegration, ...providerResult } })));
    });
});

type SetDeviceTwinPayload = { deviceId: string; integration: Integration; settings: any };
export const setDeviceTwin = createAppAsyncThunk(
  `${sliceName}/setDeviceTwin`,
  ({ deviceId, integration, settings }: SetDeviceTwinPayload, { dispatch, getState }) =>
    GeneralApi.put(`${iotManagerBaseURL}/devices/${deviceId}/state/${integration.id}`, { desired: settings })
      .catch(err =>
        commonErrorHandler(
          err,
          `There was an error updating the ${EXTERNAL_PROVIDER[integration.provider].twinTitle.toLowerCase()} for device ${deviceId}.`,
          dispatch
        )
      )
      .then(() => {
        const device = getDeviceByIdSelector(getState(), deviceId);
        const { twinsByIntegration = {} } = device;
        const { [integration.id!]: currentState = {} } = twinsByIntegration;
        return Promise.resolve(
          dispatch(
            actions.receivedDevice({ ...device, twinsByIntegration: { ...twinsByIntegration, [integration.id!]: { ...currentState, desired: settings } } })
          )
        );
      })
);

const prepareSearchArguments = ({ filters, group, state, status }: { filters?: DeviceFilter[]; group?: string; state: RootState; status?: string }) => {
  const { filterTerms } = convertDeviceListStateToFilters({ filters, group, offlineThreshold: state.app.offlineThreshold, selectedIssues: [], status });
  const { columnSelection = [] } = getUserSettings(state);
  const selectedAttributes = columnSelection.map(column => ({ attribute: column.key, scope: column.scope }));
  const attributes = [...defaultAttributes, getIdAttribute(state), ...selectedAttributes];
  return { attributes, filterTerms };
};
type GetSystemDevicesPayload = { id: string; page?: number; perPage?: number; sortOptions: SortCriteria[] };
export const getSystemDevices = createAppAsyncThunk(`${sliceName}/getSystemDevices`, (options: GetSystemDevicesPayload, { dispatch, getState }) => {
  const { id, page = defaultPage, perPage = defaultPerPage, sortOptions = [] } = options;
  const state = getState();
  const { hasFullFiltering } = getTenantCapabilities(state);
  if (!hasFullFiltering) {
    return Promise.resolve();
  }
  const { attributes: deviceAttributes = {} } = getDeviceByIdSelector(state, id);
  const { mender_gateway_system_id = '' } = deviceAttributes as { mender_gateway_system_id?: string };
  const filters: DeviceFilter[] = [
    { ...emptyFilter, key: 'mender_is_gateway', operator: DEVICE_FILTERING_OPTIONS.$ne.key, value: 'true', scope: 'inventory' },
    { ...emptyFilter, key: 'mender_gateway_system_id', value: mender_gateway_system_id, scope: 'inventory' }
  ];
  const { attributes, filterTerms } = prepareSearchArguments({ filters, state });
  return GeneralApi.post(getSearchEndpoint(getState()), {
    page,
    per_page: perPage,
    filters: filterTerms,
    sort: sortOptions,
    attributes
  })
    .catch(err => commonErrorHandler(err, `There was an error getting system devices device ${id}.`, dispatch, 'Please check your connection.'))
    .then(({ data, headers }) => {
      const state = getState();
      const { devicesById, ids } = reduceReceivedDevices(data, [], state);
      const device = {
        ...getDeviceByIdSelector(state, id),
        systemDeviceIds: ids,
        systemDeviceTotal: Number(headers[headerNames.total])
      };
      return Promise.resolve(dispatch(actions.receivedDevices({ ...devicesById, [id]: device })));
    });
});

export const getGatewayDevices = createAppAsyncThunk(`${sliceName}/getGatewayDevices`, (deviceId: string, { dispatch, getState }) => {
  const state = getState();
  const { attributes = {} } = getDeviceByIdSelector(state, deviceId);
  const { mender_gateway_system_id = '' } = attributes as { mender_gateway_system_id?: string };
  const filters = [
    { ...emptyFilter, key: 'id', operator: DEVICE_FILTERING_OPTIONS.$ne.key, value: deviceId, scope: 'identity' },
    { ...emptyFilter, key: 'mender_is_gateway', value: 'true', scope: 'inventory' },
    { ...emptyFilter, key: 'mender_gateway_system_id', value: mender_gateway_system_id, scope: 'inventory' }
  ];
  const { attributes: attributeSelection, filterTerms } = prepareSearchArguments({ filters, state });
  return GeneralApi.post(getSearchEndpoint(getState()), {
    page: 1,
    per_page: MAX_PAGE_SIZE,
    filters: filterTerms,
    attributes: attributeSelection
  }).then(({ data }) => {
    const { ids } = reduceReceivedDevices(data, [], getState());
    const tasks: ReturnType<AppDispatch> = ids.map(deviceId => dispatch(getDeviceInfo(deviceId)));
    tasks.push(dispatch(actions.receivedDevice({ id: deviceId, gatewayIds: ids })));
    return Promise.all(tasks);
  });
});
