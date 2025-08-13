'use strict';

// Copyright 2015 Northern.tech AS
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
import type { PermissionSet as BackendPermissionSet, Role as BackendRole, RolePermission, RoleUseradm } from '@northern.tech/types/MenderTypes';

import { ALL_DEVICES, ALL_RELEASES, useradmApiUrlv1 } from '.';

export type ReadPermission = 'read';
export type ManagePermission = 'manage';
export type DeployPermission = 'deploy';
export type ConfigurePermission = 'configure';
export type ConnectPermission = 'connect';
export type UploadPermission = 'upload';
export type AuditLogPermission = ReadPermission;
export type UserManagementPermission = ReadPermission | ManagePermission;
export type DeploymentPermission = ReadPermission | ManagePermission | DeployPermission;
export type GroupsPermission = ReadPermission | ManagePermission | DeployPermission | ConfigurePermission | ConnectPermission;
export type ReleasesPermission = ReadPermission | ManagePermission | UploadPermission;
export type AnyPermission = UiPermissionsByIdKey;

export type UiPermissionsDefinition = Readonly<{
  auditlog: string[];
  deployments?: string[]; // deployments are so far only covered indirectly through releases + device group permissions
  groups: Record<string, string[]>;
  releases: Record<string, string[]>;
  tenantManagement: string[];
  userManagement: string[];
}>;

export type UiRoleDefinition = {
  description: string;
  editable?: boolean;
  isCustom?: boolean;
  name: string;
  permissions?: RolePermission[];
  uiPermissions: UiPermissionsDefinition;
};

export const emptyUiPermissions: UiPermissionsDefinition = Object.freeze({
  auditlog: [],
  deployments: [],
  groups: Object.freeze({}),
  releases: Object.freeze({}),
  tenantManagement: [],
  userManagement: []
});

export const emptyRole: UiRoleDefinition = Object.freeze({
  name: '',
  description: '',
  permissions: [] as RolePermission[],
  uiPermissions: Object.freeze({ ...emptyUiPermissions })
});

// export type UiPermissions = {
//   auditlog: AuditLogPermission[];
//   deployments: DeploymentPermission[];
//   groups: Record<string, GroupsPermission[]>;
//   releases: Record<string, ReleasesPermission[]>;
//   tenantManagement?: UserManagementPermission[];
//   userManagement: UserManagementPermission[];
// };

export type Role = BackendRole &
  Omit<RoleUseradm, 'name' | 'description'> & {
    editable?: boolean;
    isCustom?: boolean;
    uiPermissions: UiPermissionsDefinition;
    value?: string;
  };

export type PermissionSet = Omit<BackendPermissionSet, 'name' | 'permissions'> & {
  isCustom?: boolean;
  name: PermissionSetId;
  permissions?: RolePermission[];
  result: Partial<UiPermissionsDefinition>;
};

const staticRolesByName = {
  admin: 'RBAC_ROLE_PERMIT_ALL',
  readOnly: 'RBAC_ROLE_OBSERVER',
  ci: 'RBAC_ROLE_CI',
  deploymentsManager: 'RBAC_ROLE_DEPLOYMENTS_MANAGER',
  terminalAccess: 'RBAC_ROLE_REMOTE_TERMINAL'
} as const;

export const PermissionTypes = {
  Any: 'any',
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
  Delete: 'DELETE',
  Patch: 'PATCH',
  DeviceGroup: 'DEVICE_GROUP',
  DeviceId: 'DEVICE_ID'
};

const permissionSetIds = {
  Basic: 'Basic',
  ConfigureDevices: 'ConfigureDevices',
  ConnectToDevices: 'ConnectToDevices',
  DeployToDevices: 'DeployToDevices',
  ManageDevices: 'ManageDevices',
  ManageReleases: 'ManageReleases',
  ManageTenants: 'ManageTenants',
  ManageUsers: 'ManageUsers',
  ReadAuditLogs: 'ReadAuditLogs',
  ReadDevices: 'ReadDevices',
  ReadReleases: 'ReadReleases',
  ReadTenants: 'ReadTenants',
  ReadUsers: 'ReadUsers',
  SuperUser: 'SuperUser',
  UploadArtifacts: 'UploadArtifacts'
} as const;
export type PermissionSetId = keyof typeof permissionSetIds;

export const uiPermissionsById = {
  configure: {
    explanations: { groups: `'Configure' allows the user to use mender-configure features and apply configurations.` },
    permissionLevel: 2,
    permissionSets: { groups: permissionSetIds.ConfigureDevices },
    title: 'Configure',
    value: 'configure' as ConfigurePermission,
    verbs: [PermissionTypes.Get, PermissionTypes.Put, PermissionTypes.Post]
  },
  connect: {
    explanations: { groups: `'Connect' allows the user to use mender-connect features and Troubleshoot add-ons.` },
    permissionLevel: 2,
    permissionSets: { groups: permissionSetIds.ConnectToDevices },
    title: 'Connect',
    value: 'connect' as ConnectPermission,
    verbs: [PermissionTypes.Get, PermissionTypes.Put]
  },
  deploy: {
    explanations: { groups: `'Deploy' allows the user to deploy software or configuration updates to devices.` },
    permissionLevel: 2,
    permissionSets: { deployments: permissionSetIds.DeployToDevices, groups: permissionSetIds.DeployToDevices },
    title: 'Deploy',
    value: 'deploy' as DeployPermission,
    verbs: [PermissionTypes.Post]
  },
  manage: {
    explanations: {
      groups: `'Manage' allows the user to edit device name, notes, and manage authentication status. For 'All devices' it also allows the user to edit and create device groups.`,
      releases: `'Manage' allows the user to upload new artifacts, edit release descriptions and remove artifacts.`
    },
    permissionLevel: 2,
    permissionSets: {
      groups: permissionSetIds.ManageDevices,
      releases: permissionSetIds.ManageReleases,
      tenantManagement: permissionSetIds.ManageTenants,
      userManagement: permissionSetIds.ManageUsers
    },
    title: 'Manage',
    value: 'manage' as ManagePermission,
    verbs: [PermissionTypes.Post, PermissionTypes.Put, PermissionTypes.Patch]
  },
  read: {
    explanations: { groups: `'Read' allows the user to view devices.` },
    permissionLevel: 1,
    permissionSets: {
      auditlog: permissionSetIds.ReadAuditLogs,
      groups: permissionSetIds.ReadDevices,
      releases: permissionSetIds.ReadReleases,
      tenantManagement: permissionSetIds.ReadTenants,
      userManagement: permissionSetIds.ReadUsers
    },
    title: 'Read',
    value: 'read' as ReadPermission,
    verbs: [PermissionTypes.Get, PermissionTypes.Post]
  },
  upload: {
    explanations: { groups: `'Upload' allows the user to upload new Artifacts.` },
    unscopedOnly: { releases: true },
    permissionLevel: 1,
    permissionSets: { releases: permissionSetIds.UploadArtifacts },
    title: 'Upload',
    value: 'upload' as UploadPermission,
    verbs: [PermissionTypes.Post, PermissionTypes.Put, PermissionTypes.Patch]
  }
} as const;

export type UiPermissionsByIdKey = keyof typeof uiPermissionsById;
export type PermissionObject = (typeof uiPermissionsById)[UiPermissionsByIdKey];

export const scopedPermissionAreas = {
  groups: { key: 'groups', excessiveAccessSelector: ALL_DEVICES, scopeType: 'DeviceGroups' },
  releases: { key: 'releases', excessiveAccessSelector: ALL_RELEASES, scopeType: 'Releases' }
} as const;
export type ScopedPermissionsByAreaKey = keyof typeof scopedPermissionAreas;

export const uiPermissionsByArea = {
  auditlog: {
    endpoints: [{ path: /\/(auditlog)/i, types: [PermissionTypes.Get], uiPermissions: [uiPermissionsById.read] }],
    explanation:
      'Granting access to the audit log will allow tracing changes to devices, releases and user accounts, as well as providing information about deployments.',
    key: 'auditlog',
    uiPermissions: [uiPermissionsById.read],
    title: 'System Audit Log'
  },
  deployments: {
    endpoints: [
      { path: /\/(deployments\/deployments)/i, types: [PermissionTypes.Post, PermissionTypes.Put], uiPermissions: [uiPermissionsById.deploy] },
      { path: /\/(deployments\/deployments)/i, types: [PermissionTypes.Get], uiPermissions: [uiPermissionsById.read] },
      { path: /\/(deployments\/config)/i, types: [PermissionTypes.Get, PermissionTypes.Put], uiPermissions: [uiPermissionsById.manage] }
    ],
    explanation: 'Providing deploy permissions will allow deployments to be created using the releases and devices a user has access to.',
    key: 'deployments',
    uiPermissions: [uiPermissionsById.read, uiPermissionsById.deploy],
    title: 'Deployments'
  },
  groups: {
    endpoints: [
      {
        path: /\/(devauth|inventory|deviceconfig|devicemonitor|deviceconnect\/devices)/i,
        types: [PermissionTypes.Get],
        uiPermissions: [uiPermissionsById.read]
      },
      { path: /\/(devauth|inventory)/i, types: [PermissionTypes.Put, PermissionTypes.Post], uiPermissions: [uiPermissionsById.manage] },
      { path: /\/(deviceconfig)/i, types: [PermissionTypes.Get, PermissionTypes.Put, PermissionTypes.Post], uiPermissions: [uiPermissionsById.configure] },
      { path: /\/(deviceconnect\/devices)/i, types: [PermissionTypes.Get, PermissionTypes.Post], uiPermissions: [uiPermissionsById.connect] }
    ],
    explanation: 'Device group management permissions control the degree to which devices in a group can be accessed and moved to other groups.',
    key: 'groups',
    scope: scopedPermissionAreas.groups.scopeType,
    uiPermissions: [uiPermissionsById.read, uiPermissionsById.manage, uiPermissionsById.deploy, uiPermissionsById.configure, uiPermissionsById.connect],
    title: 'Group Management'
  },
  releases: {
    endpoints: [
      { path: /\/(deployments\/artifacts|deployments\/deployments\/releases)/i, types: [PermissionTypes.Get], uiPermissions: [uiPermissionsById.read] },
      {
        path: /\/(deployments\/artifacts|deployments\/deployments\/releases)/i,
        types: [PermissionTypes.Post, PermissionTypes.Put],
        uiPermissions: [uiPermissionsById.read, uiPermissionsById.upload]
      },
      {
        path: /\/(deployments\/artifacts|deployments\/deployments\/releases)/i,
        types: [PermissionTypes.Delete],
        uiPermissions: [uiPermissionsById.read, uiPermissionsById.manage]
      }
    ],
    explanation: 'Release permissions can be granted to allow artifact & release modifications, as well as the creation of new releases.',
    key: 'releases',
    scope: 'ReleaseTags',
    uiPermissions: [uiPermissionsById.read, uiPermissionsById.manage, uiPermissionsById.upload],
    title: 'Release Management'
  },
  tenantManagement: {
    endpoints: [
      { path: /\/(tenantadm\/tenants)/i, types: [PermissionTypes.Get], uiPermissions: [uiPermissionsById.read] },
      { path: /\/(tenantadm\/tenants)/i, types: [PermissionTypes.Post, PermissionTypes.Put], uiPermissions: [uiPermissionsById.manage] },
      { path: /\/(users\/exists)/i, types: [PermissionTypes.Get], uiPermissions: [uiPermissionsById.manage] }
    ],
    explanation: 'Tenant management permissions allow listing, creating and modifying child tenants',
    key: 'tenantManagement',
    uiPermissions: [uiPermissionsById.read, uiPermissionsById.manage],
    title: 'Tenant Management'
  },
  userManagement: {
    endpoints: [
      { path: /\/(useradm)/i, types: [PermissionTypes.Get], uiPermissions: [uiPermissionsById.read] },
      { path: /\/(useradm)/i, types: [PermissionTypes.Post], uiPermissions: [uiPermissionsById.manage] }
    ],
    explanation:
      'User management permissions should be granted carefully, as these allow privilege increases for any users managed by a user with user management permissions',
    key: 'userManagement',
    uiPermissions: [uiPermissionsById.read, uiPermissionsById.manage],
    title: 'User Management'
  }
} as const;
export type UiPermissionsByAreaKey = keyof typeof uiPermissionsByArea;

const permissionMapper = (permission: PermissionObject) => permission.value;

// TODO: uiPermissions per area need to get their mapped permissions narrowed to the expected subset coming from the UiPermissions type
// @ts-ignore
export const rolesById: Record<string, Role> = Object.freeze({
  [staticRolesByName.admin]: {
    name: 'Admin',
    value: staticRolesByName.admin,
    description: 'Full access',
    permissions: [], // permissions refers to the values returned from the backend
    uiPermissions: {
      ...emptyUiPermissions,
      auditlog: uiPermissionsByArea.auditlog.uiPermissions.map(permissionMapper),
      deployments: uiPermissionsByArea.deployments.uiPermissions.map(permissionMapper),
      groups: { [ALL_DEVICES]: uiPermissionsByArea.groups.uiPermissions.map(permissionMapper) },
      releases: { [ALL_RELEASES]: uiPermissionsByArea.releases.uiPermissions.map(permissionMapper) },
      userManagement: uiPermissionsByArea.userManagement.uiPermissions.map(permissionMapper)
    }
  },
  [staticRolesByName.readOnly]: {
    name: 'Read Access',
    value: staticRolesByName.readOnly,
    description:
      'Intended for team leaders or limited tech support accounts, this role can see all Devices, Artifacts and Deployment reports but cannot make any changes.',
    permissions: [],
    uiPermissions: {
      ...emptyUiPermissions,
      deployments: [uiPermissionsById.read.value],
      groups: { [ALL_DEVICES]: [uiPermissionsById.read.value] },
      releases: { [ALL_RELEASES]: [uiPermissionsById.read.value] },
      userManagement: [uiPermissionsById.read.value]
    }
  },
  [staticRolesByName.ci]: {
    name: 'Releases Manager',
    value: staticRolesByName.ci,
    description:
      'Intended for automation accounts building software (e.g. CI/CD systems), this role can only manage Artifacts, including upload new Artifacts and delete Artifacts. It does not have access to Devices or Deployments.',
    permissions: [],
    uiPermissions: {
      ...emptyUiPermissions,
      releases: { [ALL_RELEASES]: uiPermissionsByArea.releases.uiPermissions.map(permissionMapper) }
    }
  },
  [staticRolesByName.deploymentsManager]: {
    name: 'Deployments Manager',
    value: staticRolesByName.deploymentsManager,
    description: 'Intended for users responsible for managing deployments, this role can create and abort deployments',
    permissions: [],
    uiPermissions: {
      ...emptyUiPermissions,
      deployments: uiPermissionsByArea.deployments.uiPermissions.map(permissionMapper),
      groups: { [ALL_DEVICES]: [uiPermissionsById.deploy.value, uiPermissionsById.read.value] },
      releases: { [ALL_RELEASES]: [uiPermissionsById.read.value] }
    }
  },
  [staticRolesByName.terminalAccess]: {
    name: 'Troubleshooting',
    value: staticRolesByName.terminalAccess,
    description: 'Access to the troubleshooting features: Remote Terminal, File Transfer, Port Forwarding',
    permissions: [],
    uiPermissions: {
      ...emptyUiPermissions,
      groups: { [ALL_DEVICES]: [uiPermissionsById.connect.value] }
    }
  }
});

export const serviceProviderRolesById = {
  admin: {
    name: 'Admin',
    value: staticRolesByName.admin,
    description: 'Full access',
    permissions: [],
    uiPermissions: {
      ...emptyUiPermissions,
      auditlog: uiPermissionsByArea.auditlog.uiPermissions.map(permissionMapper),
      userManagement: uiPermissionsByArea.userManagement.uiPermissions.map(permissionMapper),
      tenantManagement: uiPermissionsByArea.tenantManagement.uiPermissions.map(permissionMapper)
    }
  },
  readOnly: {
    name: 'Read access',
    value: staticRolesByName.readOnly,
    description: 'This role can see all linked organizations but cannot make any changes',
    permissions: [],
    uiPermissions: {
      ...emptyUiPermissions,
      auditlog: [uiPermissionsById.read.value],
      userManagement: [uiPermissionsById.read.value],
      tenantManagement: [uiPermissionsById.read.value]
    }
  }
} as const;

export const defaultPermissionSets: Record<string, Omit<PermissionSet, 'permissions'>> = {
  [permissionSetIds.Basic]: {
    name: permissionSetIds.Basic,
    result: {
      // this is needed to prevent the detailed permissions of the basic permission set from being interpreted as allowing read & management access to user endpoints
      userManagement: [uiPermissionsById.read.value]
    }
  },
  [permissionSetIds.SuperUser]: {
    name: permissionSetIds.SuperUser,
    result: {
      ...rolesById[staticRolesByName.admin].uiPermissions
    }
  },
  [permissionSetIds.ManageUsers]: {
    name: permissionSetIds.ManageUsers,
    result: {
      userManagement: [uiPermissionsById.manage.value]
    }
  },
  [permissionSetIds.ReadAuditLogs]: {
    name: permissionSetIds.ReadAuditLogs,
    result: {
      auditlog: [uiPermissionsById.read.value]
    }
  },
  [permissionSetIds.ReadReleases]: {
    name: permissionSetIds.ReadReleases,
    result: {
      releases: { [ALL_RELEASES]: [uiPermissionsById.read.value] }
    }
  },
  [permissionSetIds.ReadTenants]: {
    name: permissionSetIds.ReadTenants,
    result: {
      tenantManagement: [uiPermissionsById.read.value]
    }
  },
  [permissionSetIds.ManageTenants]: {
    name: permissionSetIds.ManageTenants,
    result: {
      tenantManagement: [uiPermissionsById.manage.value]
    }
  },
  [permissionSetIds.ReadUsers]: {
    name: permissionSetIds.ReadUsers,
    result: {
      userManagement: [uiPermissionsById.read.value]
    }
  },
  [permissionSetIds.UploadArtifacts]: {
    name: permissionSetIds.UploadArtifacts,
    result: {
      releases: { [ALL_RELEASES]: [uiPermissionsById.upload.value] }
    }
  },
  [permissionSetIds.ManageReleases]: {
    name: permissionSetIds.ManageReleases,
    result: {
      releases: { [ALL_RELEASES]: [uiPermissionsById.manage.value] }
    }
  },
  [permissionSetIds.ConfigureDevices]: {
    name: permissionSetIds.ConfigureDevices,
    result: {
      deployments: [uiPermissionsById.read.value, uiPermissionsById.deploy.value],
      groups: { [ALL_DEVICES]: [uiPermissionsById.read.value, uiPermissionsById.configure.value] }
    }
  },
  [permissionSetIds.ConnectToDevices]: {
    name: permissionSetIds.ConnectToDevices,
    result: {
      groups: { [ALL_DEVICES]: [uiPermissionsById.read.value, uiPermissionsById.connect.value] }
    }
  },
  [permissionSetIds.DeployToDevices]: {
    name: permissionSetIds.DeployToDevices,
    result: {
      deployments: [uiPermissionsById.deploy.value, uiPermissionsById.manage.value, uiPermissionsById.read.value],
      groups: { [ALL_DEVICES]: [uiPermissionsById.read.value, uiPermissionsById.deploy.value] }
    }
  },
  [permissionSetIds.ManageDevices]: {
    name: permissionSetIds.ManageDevices,
    result: {
      groups: { [ALL_DEVICES]: [uiPermissionsById.read.value, uiPermissionsById.manage.value] }
    }
  },
  [permissionSetIds.ReadDevices]: {
    name: permissionSetIds.ReadDevices,
    result: {
      groups: { [ALL_DEVICES]: [uiPermissionsById.read.value] }
    }
  }
};

export const rolesByName = {
  ...staticRolesByName,
  deploymentCreation: { action: 'CREATE_DEPLOYMENT', object: { type: 'DEVICE_GROUP', value: undefined } },
  groupAccess: { action: 'VIEW_DEVICE', object: { type: 'DEVICE_GROUP', value: undefined } },
  userManagement: { action: 'http', object: { type: 'any', value: `${useradmApiUrlv1}/.*` } }
} as const;
