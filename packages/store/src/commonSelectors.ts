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
import type { AuditLog as AuditLogEvent } from '@northern.tech/types/types.gen';
import type { DeviceIssueOption } from '@northern.tech/utils/constants';
import { attributeDuplicateFilter, getDemoDeviceAddress as getDemoDeviceAddressHelper } from '@northern.tech/utils/helpers';
import { createSelector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { ADDONS, PLANS, defaultReports } from './appSlice/constants';
import { getFeatures, getSearchedDevices } from './appSlice/selectors';
import { DEVICE_LIST_MAXIMUM_LENGTH, UNGROUPED_GROUP } from './commonConstants';
import { ALL_DEVICES, ATTRIBUTE_SCOPES, DEVICE_ISSUE_OPTIONS, rolesById, rolesByName, serviceProviderRolesById, uiPermissionsById } from './constants';
import type { Role } from './constants';
import type { Deployment } from './deploymentsSlice';
import { getDeploymentsById, getDeploymentsSelectionState, getSelectedDeploymentDeviceIds } from './deploymentsSlice/selectors';
import type { Device, DeviceGroup } from './devicesSlice';
import { getDeviceById, getDevicesById, getFilteringAttributes, getGroupsById, getListedDevices } from './devicesSlice/selectors';
import { getIssueCountsByType } from './monitorSlice/selectors';
import { onboardingSteps } from './onboardingSlice/constants';
import { getOnboarding } from './onboardingSlice/selectors';
import { getAuditLogEntry, getIsServiceProvider, getOrganization } from './organizationSlice/selectors';
import { getReleasesById } from './releasesSlice/selectors';
import {
  getCurrentUser,
  getGlobalSettings,
  getHas2FA,
  getRolesById,
  getRolesList,
  getSecurityAlertDismissedTimestamp,
  getUserSettings,
  getUserSettingsInitialized
} from './usersSlice/selectors';
import { listItemMapper, mapUserRolesToUiPermissions } from './utils';

export const getIsEnterprise = createSelector(
  [getOrganization, getFeatures],
  ({ plan = PLANS.os.id }, { isEnterprise, isHosted }) => isEnterprise || (isHosted && plan === PLANS.enterprise.id)
);

export const getUserRoles = createSelector([getCurrentUser, getRolesById, getIsEnterprise], (currentUser, rolesById, isEnterprise) => {
  const isAdmin = currentUser.roles?.length ? currentUser.roles.some(role => role === rolesByName.admin) : !isEnterprise;
  const uiPermissions = isAdmin ? mapUserRolesToUiPermissions([rolesByName.admin], rolesById) : mapUserRolesToUiPermissions(currentUser.roles || [], rolesById);
  return { isAdmin, uiPermissions };
});

const hasPermission = (thing: Record<string, string[]>, permission: string): boolean =>
  Object.values(thing).some(permissions => permissions.includes(permission));

export const getUserCapabilities = createSelector([getUserRoles, getIsServiceProvider], ({ uiPermissions }, isServiceProvider) => {
  const canManageReleases = hasPermission(uiPermissions.releases, uiPermissionsById.manage.value);
  const canReadReleases = canManageReleases || hasPermission(uiPermissions.releases, uiPermissionsById.read.value);
  const canUploadReleases = canManageReleases || hasPermission(uiPermissions.releases, uiPermissionsById.upload.value);

  const canAuditlog = uiPermissions.auditlog.includes(uiPermissionsById.read.value);

  const canReadUsers = uiPermissions.userManagement.includes(uiPermissionsById.read.value);
  const canManageUsers = uiPermissions.userManagement.includes(uiPermissionsById.manage.value);

  const canReadDevices = hasPermission(uiPermissions.groups, uiPermissionsById.read.value);
  const canWriteDevices = Object.values(uiPermissions.groups).some(
    groupPermissions => groupPermissions.includes(uiPermissionsById.read.value) && groupPermissions.length > 1
  );
  const canTroubleshoot = hasPermission(uiPermissions.groups, uiPermissionsById.connect.value);
  const canManageDevices = hasPermission(uiPermissions.groups, uiPermissionsById.manage.value);
  const canConfigure = hasPermission(uiPermissions.groups, uiPermissionsById.configure.value);

  const canDeploy =
    (uiPermissions.deployments?.includes(uiPermissionsById.deploy.value) ?? false) || hasPermission(uiPermissions.groups, uiPermissionsById.deploy.value);
  const canReadDeployments = uiPermissions.deployments?.includes(uiPermissionsById.read.value) ?? false;

  return {
    canAuditlog,
    canConfigure,
    canDeploy,
    canManageDevices,
    canManageReleases,
    canManageUsers,
    canReadDeployments,
    canReadDevices,
    canReadReleases,
    canReadUsers,
    canTroubleshoot,
    canUploadReleases,
    canWriteDevices,
    groupsPermissions: uiPermissions.groups,
    releasesPermissions: uiPermissions.releases,
    SPTenant: isServiceProvider
  };
});

export const getTenantCapabilities = createSelector(
  [getFeatures, getOrganization, getIsEnterprise],
  (
    {
      hasAuditlogs: isAuditlogEnabled,
      hasDeviceConfig: isDeviceConfigEnabled,
      hasDeviceConnect: isDeviceConnectEnabled,
      hasMonitor: isMonitorEnabled,
      isHosted
    },
    { addons = [], plan = PLANS.os.id },
    isEnterprise
  ) => {
    const canDelta = isEnterprise || plan === PLANS.professional.id;
    const hasAuditlogs = isAuditlogEnabled && isEnterprise;
    const hasDeviceConfig = addons.some(addon => addon.name === ADDONS.configure.id && addon.enabled) || (isDeviceConfigEnabled && !isHosted);
    const hasDeviceConnect = addons.some(addon => addon.name === ADDONS.troubleshoot.id && addon.enabled) || (isDeviceConnectEnabled && !isHosted);
    const hasMonitor = isMonitorEnabled && addons.some(addon => addon.name === ADDONS.monitor.id && addon.enabled);
    return {
      canDelta,
      canRetry: canDelta,
      canSchedule: canDelta,
      hasAuditlogs,
      hasDeviceConfig,
      hasDeviceConnect,
      hasFullFiltering: canDelta,
      hasMonitor,
      isEnterprise,
      plan
    };
  }
);

export const getFilterAttributes = createSelector(
  [getGlobalSettings, getFilteringAttributes],
  ({ previousFilters }, { identityAttributes, inventoryAttributes, systemAttributes, tagAttributes }) => {
    const deviceNameAttribute = { key: 'name', value: 'Name', scope: ATTRIBUTE_SCOPES.tags, category: ATTRIBUTE_SCOPES.tags, priority: 1 };
    const deviceIdAttribute = { key: 'id', value: 'Device ID', scope: ATTRIBUTE_SCOPES.identity, category: ATTRIBUTE_SCOPES.identity, priority: 1 };
    const checkInAttribute = { key: 'check_in_time', value: 'Latest activity', scope: ATTRIBUTE_SCOPES.system, category: ATTRIBUTE_SCOPES.system, priority: 4 };
    const updateAttribute = { ...checkInAttribute, key: 'updated_ts', value: 'Last inventory update' };
    const firstRequestAttribute = { key: 'created_ts', value: 'First request', scope: ATTRIBUTE_SCOPES.system, category: ATTRIBUTE_SCOPES.system, priority: 4 };
    const attributes = [
      ...previousFilters.map(item => ({
        ...item,
        value: deviceIdAttribute.key === item.key ? deviceIdAttribute.value : item.key,
        category: 'recently used',
        priority: 0
      })),
      deviceNameAttribute,
      deviceIdAttribute,
      ...identityAttributes.map(item => ({ key: item, value: item, scope: ATTRIBUTE_SCOPES.identity, category: ATTRIBUTE_SCOPES.identity, priority: 1 })),
      ...inventoryAttributes.map(item => ({ key: item, value: item, scope: ATTRIBUTE_SCOPES.inventory, category: ATTRIBUTE_SCOPES.inventory, priority: 2 })),
      ...tagAttributes.map(item => ({ key: item, value: item, scope: ATTRIBUTE_SCOPES.tags, category: ATTRIBUTE_SCOPES.tags, priority: 3 })),
      checkInAttribute,
      updateAttribute,
      firstRequestAttribute,
      ...systemAttributes.map(item => ({ key: item, value: item, scope: ATTRIBUTE_SCOPES.system, category: ATTRIBUTE_SCOPES.system, priority: 4 }))
    ];
    return attributeDuplicateFilter(attributes, 'key');
  }
);

export const getOnboardingState = createSelector([getOnboarding, getUserSettings], ({ complete, progress, showTips, ...remainder }, { onboarding = {} }) => ({
  ...remainder,
  ...onboarding,
  complete: onboarding.complete || complete,
  progress:
    Object.keys(onboardingSteps).findIndex(step => step === progress) > Object.keys(onboardingSteps).findIndex(step => step === onboarding.progress)
      ? progress
      : onboarding.progress,
  showTips: !onboarding.showTips ? onboarding.showTips : showTips
}));

export const getDemoDeviceAddress = createSelector([getDevicesById, getOnboarding], (devicesById, { approach, demoArtifactPort }) => {
  const demoDeviceAddress = `http://${getDemoDeviceAddressHelper(Object.values(devicesById), approach)}`;
  return demoArtifactPort ? `${demoDeviceAddress}:${demoArtifactPort}` : demoDeviceAddress;
});

export const getDeviceConfigDeployment = createSelector([getDeviceById, getDeploymentsById], (device, deploymentsById) => {
  const { config = {} } = device;
  const { deployment_id: configDeploymentId = '' } = config;
  const deviceConfigDeployment = deploymentsById[configDeploymentId] ?? {};
  return { device, deviceConfigDeployment };
});

export const getDeploymentRelease = createSelector(
  [getDeploymentsById, getDeploymentsSelectionState, getReleasesById],
  (deploymentsById, { selectedId = '' }, releasesById) => {
    const deployment = deploymentsById[selectedId] ?? {};
    return deployment?.artifact_name && releasesById[deployment.artifact_name] ? releasesById[deployment.artifact_name] : { device_types_compatible: [] };
  }
);

export const getSelectedDeploymentData = createSelector(
  [getDeploymentsById, getDeploymentsSelectionState, getDevicesById, getSelectedDeploymentDeviceIds],
  (deploymentsById, { selectedId = '' }, devicesById, selectedDeviceIds) => {
    const deployment = deploymentsById[selectedId] ?? {};
    const { devices = {} } = deployment as Deployment;
    return {
      deployment,
      selectedDevices: selectedDeviceIds.map(deviceId => ({ ...devicesById[deviceId], ...(devices[deviceId] ?? {}) }))
    };
  }
);

export const getAvailableIssueOptionsByType = createSelector([getTenantCapabilities, getIssueCountsByType], ({ hasFullFiltering, hasMonitor }, issueCounts) =>
  Object.values<DeviceIssueOption>(DEVICE_ISSUE_OPTIONS).reduce(
    (accu, { isCategory, key, needsFullFiltering, needsMonitor, title }) => {
      if (isCategory || (needsFullFiltering && !hasFullFiltering) || (needsMonitor && !hasMonitor)) {
        return accu;
      }
      accu[key] = { count: issueCounts[key].filtered, key, title };
      return accu;
    },
    {} as Record<string, { count: number; key: string; title: string }>
  )
);

export const getGroupNames = createSelector([getGroupsById, getUserRoles], (groupsById, { uiPermissions }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [UNGROUPED_GROUP.id]: ungrouped, ...groups } = groupsById;
  return Object.keys(
    Object.entries(groups).reduce(
      (accu, [groupName, group]) => {
        if (group.filters || uiPermissions.groups[ALL_DEVICES]) {
          accu[groupName] = group;
        }
        return accu;
      },
      { ...uiPermissions.groups } as Record<string, DeviceGroup>
    )
  ).sort();
});

export const getDeviceReportsForUser = createSelector(
  [getUserSettings, getCurrentUser, getGlobalSettings, getDevicesById],
  ({ reports }, { id: currentUserId }, globalSettings, devicesById) =>
    reports || globalSettings[`${currentUserId}-reports`] || (Object.keys(devicesById).length ? defaultReports : [])
);

const listTypeDeviceIdMap = {
  deviceList: getListedDevices,
  search: getSearchedDevices
};
const deviceMapDefault = { defaultObject: { auth_sets: [] }, cutOffSize: DEVICE_LIST_MAXIMUM_LENGTH };
const getDeviceMappingDefaults = () => deviceMapDefault;

export const getMappedDevicesList = createSelector(
  [getDevicesById, (state, listType) => listTypeDeviceIdMap[listType](state), getDeviceMappingDefaults],
  listItemMapper
);

export const getAuditlogDevice = createSelector([getAuditLogEntry, getDevicesById], (auditlogEvent, devicesById) => {
  let auditlogDevice: Partial<Device> = {};
  if (auditlogEvent) {
    const { object } = auditlogEvent as AuditLogEvent;
    const objectData = object as AuditLogEvent['object'] | undefined;
    if (objectData?.type === 'device' && objectData.id) {
      auditlogDevice = { id: objectData.id, ...(objectData.device ?? {}) } as Device;
    }
  }
  return { ...auditlogDevice, ...(auditlogDevice.id ? devicesById[auditlogDevice.id] : {}) };
});

type RoleItem = Role | { value: string };
export const getRelevantRoles = createSelector([getOrganization, getRolesList], ({ service_provider }, roles) => {
  if (service_provider) {
    return roles.reduce(
      (accu, role) => {
        if (rolesById[role.value as keyof typeof rolesById]) {
          return accu;
        }
        accu.push(role);
        return accu;
      },
      [...Object.values(serviceProviderRolesById)] as RoleItem[]
    );
  }
  return Object.keys(rolesById)
    .reverse()
    .reduce((accu, key) => {
      const index = accu.findIndex(({ value }) => value === key);
      if (index >= 0) {
        accu = [accu[index], ...accu.filter((_, itemIndex) => index !== itemIndex)];
      }
      return accu;
    }, roles);
});

export const getShowSecurityAlert = createSelector(
  [getCurrentUser, getHas2FA, getFeatures, getIsEnterprise, getUserSettingsInitialized, getSecurityAlertDismissedTimestamp],
  (currentUser, has2FA, features, isEnterprise, settingsInitialized, dismissedTimestamp) => {
    const isOAuth2 = !!currentUser?.sso?.length;
    const userVerified = !!currentUser.verified;

    const isHosted = features?.isHosted;
    const canHave2FA = isEnterprise || isHosted;
    const secureOAuthUser = isOAuth2 && userVerified;
    if (!currentUser || !settingsInitialized || has2FA || !canHave2FA || secureOAuthUser) {
      return false;
    }

    if (dismissedTimestamp === null) {
      return true;
    }

    const today = dayjs();
    const dismissedMonthAgo = today.diff(dismissedTimestamp, 'months');

    return dismissedMonthAgo > 0;
  }
);
