// Copyright 2023 Northern.tech AS
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
import { duplicateFilter } from '@northern.tech/utils/helpers';
import { createSelector } from '@reduxjs/toolkit';

import type { DeviceFilter, DeviceGroup, DeviceSliceType } from '.';
import type { DeviceAuthState } from '../constants';
import { DEVICE_STATES, UNGROUPED_GROUP } from '../constants';

export type DevicesState = { devices: DeviceSliceType };

export const getAcceptedDevices = (state: DevicesState) => state.devices.byStatus.accepted;
export const getDevicesByStatus = (state: DevicesState) => state.devices.byStatus;
export const getDevicesById = (state: DevicesState) => state.devices.byId;
export const getDeviceReports = (state: DevicesState) => state.devices.reports;
export const getGroupsById = (state: DevicesState) => state.devices.groups.byId;
export const getSelectedGroup = (state: DevicesState) => state.devices.groups.selectedGroup;

export const getDeviceListState = (state: DevicesState) => state.devices.deviceList;
export const getListedDevices = (state: DevicesState) => state.devices.deviceList.deviceIds;
export const getFilteringAttributes = (state: DevicesState) => state.devices.filteringAttributes;
export const getDeviceFilters = (state: DevicesState) => state.devices.filters || [];
export const getTestDeviceLimit = (state: DevicesState) => state.devices.testDeviceLimit;
const getFilteringAttributesFromConfig = (state: DevicesState) => state.devices.filteringAttributesConfig.attributes;
export const getSortedFilteringAttributes = createSelector([getFilteringAttributes], filteringAttributes => ({
  ...filteringAttributes,
  identityAttributes: [...filteringAttributes.identityAttributes, 'id']
}));
export const getDeviceLimits = (state: DevicesState) => state.devices.limits;
export const getTestDeviceCount = (state: DevicesState) => state.devices.testDeviceCount;
const getFilteringAttributesLimit = (state: DevicesState) => state.devices.filteringAttributesLimit;

export const getDeviceIdentityAttributes = createSelector(
  [getFilteringAttributes, getFilteringAttributesLimit],
  ({ identityAttributes }, filteringAttributesLimit) => {
    // the device auth status is not a meaningful device identifier
    // limit the selection of the available attribute to AVAILABLE_ATTRIBUTE_LIMIT
    const attributes = identityAttributes.filter(attribute => attribute !== 'status').slice(0, filteringAttributesLimit);
    return attributes.reduce(
      (accu, value) => {
        accu.push({ value, label: value, scope: 'identity' });
        return accu;
      },
      [
        { value: 'name', label: 'Name', scope: 'tags' },
        { value: 'id', label: 'Device ID', scope: 'identity' }
      ]
    );
  }
);

export const getDeviceCountsByStatus = createSelector([getDevicesByStatus], byStatus =>
  Object.values(DEVICE_STATES).reduce<Record<DeviceAuthState, number>>(
    (accu, deviceState) => {
      const { counts } = byStatus[deviceState];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { total, ...tieredCounts } = counts;
      const count = Object.values(tieredCounts).reduce((accu, countPerTier) => accu + countPerTier, 0);
      accu[deviceState] = count;
      accu.total = accu.total + count;
      return accu;
    },
    { total: 0 }
  )
);

export const getDeviceById = createSelector([getDevicesById, (_, deviceId) => deviceId], (devicesById, deviceId = '') => devicesById[deviceId] ?? {});

export const getSelectedGroupInfo = createSelector(
  [getDeviceCountsByStatus, getGroupsById, getSelectedGroup],
  ({ accepted: acceptedDeviceTotal }, groupsById, selectedGroup) => {
    let groupCount = acceptedDeviceTotal;
    let groupFilters: DeviceFilter[] = [];
    if (selectedGroup && groupsById[selectedGroup]) {
      groupCount = groupsById[selectedGroup].total || 0;
      groupFilters = groupsById[selectedGroup].filters || [];
    }
    return { groupCount, selectedGroup, groupFilters };
  }
);

export const getCombinedLimit = createSelector(
  [getDeviceLimits],
  deviceLimits => Object.values(deviceLimits).reduce((accu, limit) => accu + Math.max(limit ?? 0, 0), 0) // limit might be -1 for unlimited devices
);

export const getLimitMaxed = createSelector(
  [getDeviceCountsByStatus, getCombinedLimit],
  ({ accepted: acceptedDevices }, combinedLimit) => !!combinedLimit && combinedLimit <= acceptedDevices
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getGroupsByIdWithoutUngrouped = createSelector([getGroupsById], ({ [UNGROUPED_GROUP.id]: ungrouped, ...groups }) => groups);

export const getGroupData = createSelector([getGroupsByIdWithoutUngrouped], groups => {
  const createdGroup = Object.keys(groups).length ? Object.keys(groups)[0] : undefined;
  const hasDynamicGroups = Object.values(groups).some(group => !!group.id);
  return { createdGroup, hasDynamicGroups, groups };
});

type SelectorGroup = DeviceGroup & { groupId: string };
type SelectorGroups = { dynamic: SelectorGroup[]; static: SelectorGroup[]; ungrouped: SelectorGroup[] };

export const getGroups = createSelector([getGroupsById], groupsById => {
  const groupNames = Object.keys(groupsById).sort();
  const groupedGroups = Object.entries(groupsById)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .reduce<SelectorGroups>(
      (accu, [groupname, group]) => {
        const name = groupname === UNGROUPED_GROUP.id ? UNGROUPED_GROUP.name : groupname;
        const groupItem = { ...group, groupId: name, name: groupname };
        if ((group.filters ?? []).length > 0) {
          if (groupname !== UNGROUPED_GROUP.id) {
            accu.dynamic.push(groupItem);
          } else {
            accu.ungrouped.push(groupItem);
          }
        } else {
          accu.static.push(groupItem);
        }
        return accu;
      },
      { dynamic: [], static: [], ungrouped: [] }
    );
  return { groupNames, ...groupedGroups };
});
export const getAttributesList = createSelector(
  [getFilteringAttributes, getFilteringAttributesFromConfig],
  ({ identityAttributes = [], inventoryAttributes = [] }, { identity = [], inventory = [] }) =>
    [...identityAttributes, ...inventoryAttributes, ...identity, ...inventory].filter(duplicateFilter)
);
const getEnabledTierLimits = createSelector([getDeviceLimits], limits => Object.entries(limits).filter(([, limit]) => limit !== 0));

export const getEnabledTiers = createSelector([getEnabledTierLimits], enabledTierLimits => enabledTierLimits.map(([type]) => type));

export const getDeviceLimitStats = createSelector([getEnabledTierLimits, getAcceptedDevices], (enabledTierLimits, accepted) => {
  const { counts } = accepted;
  return enabledTierLimits.map(([type, limit]) => ({
    type,
    limit,
    total: counts[type] || 0
  }));
});

export const getDeviceTypes = createSelector([getAcceptedDevices, getDevicesById], ({ deviceIds = [] }, devicesById) =>
  Object.keys(
    deviceIds.slice(0, 200).reduce((accu, item) => {
      const { device_type: deviceTypes = [] } = devicesById[item] ? devicesById[item].attributes : {};
      accu = deviceTypes.reduce((deviceTypeAccu, deviceType) => {
        if (deviceType.length > 1) {
          deviceTypeAccu[deviceType] = deviceTypeAccu[deviceType] ? deviceTypeAccu[deviceType] + 1 : 1;
        }
        return deviceTypeAccu;
      }, accu);
      return accu;
    }, {})
  )
);
