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
import { DEVICE_STATES, UNGROUPED_GROUP } from '@northern.tech/store/constants';
import type { RootState } from '@northern.tech/store/store';
import { duplicateFilter } from '@northern.tech/utils/helpers';
import { createSelector } from '@reduxjs/toolkit';

import type { DeviceFilter, DeviceGroup } from '.';

export const getAcceptedDevices = (state: RootState) => state.devices.byStatus.accepted;
export const getDevicesByStatus = (state: RootState) => state.devices.byStatus;
export const getDevicesById = (state: RootState) => state.devices.byId;
export const getDeviceReports = (state: RootState) => state.devices.reports;
export const getGroupsById = (state: RootState) => state.devices.groups.byId;
export const getSelectedGroup = (state: RootState) => state.devices.groups.selectedGroup;

export const getDeviceListState = (state: RootState) => state.devices.deviceList;
export const getListedDevices = (state: RootState) => state.devices.deviceList.deviceIds;
export const getFilteringAttributes = (state: RootState) => state.devices.filteringAttributes;
export const getDeviceFilters = (state: RootState) => state.devices.filters || [];
const getFilteringAttributesFromConfig = (state: RootState) => state.devices.filteringAttributesConfig.attributes;
export const getSortedFilteringAttributes = createSelector([getFilteringAttributes], filteringAttributes => ({
  ...filteringAttributes,
  identityAttributes: [...filteringAttributes.identityAttributes, 'id']
}));
export const getDeviceLimit = (state: RootState) => state.devices.limit;
const getFilteringAttributesLimit = (state: RootState) => state.devices.filteringAttributesLimit;

export const getDeviceIdentityAttributes = createSelector(
  [getFilteringAttributes, getFilteringAttributesLimit],
  ({ identityAttributes }, filteringAttributesLimit) => {
    // limit the selection of the available attribute to AVAILABLE_ATTRIBUTE_LIMIT
    const attributes = identityAttributes.slice(0, filteringAttributesLimit);
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
  Object.values(DEVICE_STATES).reduce((accu, state) => {
    accu[state] = byStatus[state].total || 0;
    return accu;
  }, {})
);

export const getDeviceById = createSelector([getDevicesById, (_, deviceId) => deviceId], (devicesById, deviceId = '') => devicesById[deviceId] ?? {});

export const getSelectedGroupInfo = createSelector(
  [getAcceptedDevices, getGroupsById, getSelectedGroup],
  ({ total: acceptedDeviceTotal }, groupsById, selectedGroup) => {
    let groupCount = acceptedDeviceTotal;
    let groupFilters: DeviceFilter[] = [];
    if (selectedGroup && groupsById[selectedGroup]) {
      groupCount = groupsById[selectedGroup].total || 0;
      groupFilters = groupsById[selectedGroup].filters || [];
    }
    return { groupCount, selectedGroup, groupFilters };
  }
);

export const getLimitMaxed = createSelector([getAcceptedDevices, getDeviceLimit], ({ total: acceptedDevices = 0 }, deviceLimit) =>
  Boolean(deviceLimit && deviceLimit <= acceptedDevices)
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getGroupsByIdWithoutUngrouped = createSelector([getGroupsById], ({ [UNGROUPED_GROUP.id]: ungrouped, ...groups }) => groups);

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
