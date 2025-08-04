// Copyright 2020 Northern.tech AS
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
import {
  ALL_DEVICES,
  ALL_RELEASES,
  defaultPermissionSets,
  emptyRole,
  emptyUiPermissions,
  maxSessionAge,
  rolesById,
  scopedPermissionAreas,
  uiPermissionsById
} from '@northern.tech/utils/constants';

export const undefineds = /undefined|\[object Object\]/;
export const menderEnvironment = {
  features: {
    hasMultitenancy: true
  },
  integrationVersion: 'saas-123.34',
  menderVersion: 'next',
  metaMenderVersion: 'saas-123.34',
  services: {
    deploymentsVersion: '1.2.3',
    deviceauthVersion: null,
    inventoryVersion: null
  }
};
export const TEST_SESSION_DATETIME = '2019-01-13T13:00:00.000Z';
const testDate = new Date(TEST_SESSION_DATETIME);
export const mockDate = new Date(testDate.setMilliseconds(testDate.getMilliseconds() + maxSessionAge));

export const defaultPassword = 'mysecretpassword!123';
export const defaultCreationDate = '2019-01-13T06:25:00.000Z';
export const defaultMacAddress = 'dc:a6:32:12:ad:bf';

export const testSsoId = 'sso_id';

const permissionSetObjectTypes = {
  any: 'Any',
  artifacts: 'Artifacts',
  empty: '',
  groups: 'Device groups',
  releases: 'Releases',
  tenantManagement: 'Tenant management',
  userManagement: 'User management'
};

const commonEndpoints = {
  artifacts: '^/api/management/v1/deployments/artifacts',
  artifactDetails: '^/api/management/v1/deployments/artifacts/[^/]+',
  deviceManagement: '^/api/management/(v[1-9])/(devauth|inventory)/'
};

export const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjZTNkMGY4Yy1hZWRlLTQwMzAtYjM5MS03ZDUwMjBlYjg3M2UiLCJzdWIiOiJhMzBhNzgwYi1iODQzLTUzNDQtODBlMy0wZmQ5NWE0ZjZmYzMiLCJleHAiOjE2MDY4MTUzNjksImlhdCI6MTYwNjIxMDU2OSwibWVuZGVyLnRlbmFudCI6IjVmODVjMTdiY2U2MmI3ZmE3ZjVmNzA0MCIsIm1lbmRlci51c2VyIjp0cnVlLCJpc3MiOiJNZW5kZXIgVXNlcnMiLCJzY3AiOiJtZW5kZXIuKiIsIm1lbmRlci5wbGFuIjoicHJvZmVzc2lvbmFsIiwibmJmIjoxNjA2MjEwNTY5fQ.qVgYdCzLTf8OdK9uUctqqaY_HWkIiwpekuGvuGQAXCEgOv4bRNDlZRN_ZRSbxQoARG3pquhScbQrjBV9tcF4irTUPlTn3yrsXNO17DpcbTVeKRkb88RDtIKiRw3orVZ_GlIb-ckTQ5dS-Nqlyyf3Fmrhca-gwt6m_xv2UrmJK6eYYTMfggdRRWb-4u7mEkBI_pHPMTQrT8kJ2BeX-vHgazH9AoH0k85LHtFZQXD7pXHlDZRnLxJXukncwMGDmF17374gavYAIyDIzcC8sEBMDnVXgpikeA1sauzirqix6mAVs6XmxdQO7aF0wfXO1_PTYUA3Nk1oQfMYNlEI3U9uLRJRZIq2L8fmrrBryhstKd4y0KlBbGAQrx8NtRkgajjd1ljMfPBUEZrb7uSerVjneiO-aIBO76CuH0zdklphIjpGJeogkBhe8pAYNggp1XsZHgpZfl7IE5faKaDkMGnutaea--Czor6bhqUNCuY4tR0cpQJbNwy6LS9o1CFy4Log';

export const accessTokens = [
  { id: 'some-id-1', expiration_date: '2022-06-02T11:11:21.725Z', name: 'some-name-1' },
  { id: 'some-id-2', expiration_date: '2022-06-02T11:11:21.725Z', last_used: '2022-06-02T11:05:21.725Z', name: 'some-name-2' }
];

export const webhookEvents = [
  {
    id: '1',
    type: 'device-status-changed',
    data: { id: '1', status: 'accepted' },
    time: '2020-09-01T12:00:00.000Z',
    delivery_statuses: [{ integration_id: '1', success: true, status_code: 200 }]
  },
  {
    id: '2',
    type: 'device-status-changed',
    data: { id: '3', status: 'accepted' },
    time: '2020-09-01T12:00:05.000Z',
    delivery_statuses: [{ integration_id: '1', success: true, status_code: 200 }]
  }
];
export const tenants = [
  {
    id: '671a0f1dd58c813118fe8622',
    parent_tenant_id: '6718de64b42e08dea2a2065d',
    name: 'child2',
    tenant_token: 'mQDYRCr-tGbDuJhPp7fArbfTA5htVTWE9G204AzhDUM',
    status: 'active',
    additional_info: {
      marketing: false,
      campaign: ''
    },
    plan: 'enterprise',
    trial: false,
    trial_expiration: null,
    service_provider: false,
    created_at: '2024-10-24T09:10:53.281Z',
    cancelled_at: null,
    children_tenants: null,
    max_child_tenants: 0,
    device_count: 0,
    device_limit: 100,
    binary_delta: true
  }
];

export const adminUserCapabilities = {
  canAuditlog: true,
  canConfigure: true,
  canDeploy: true,
  canManageDevices: true,
  canManageReleases: true,
  canManageUsers: true,
  canReadDeployments: true,
  canReadDevices: true,
  canReadReleases: true,
  canReadUsers: true,
  canTroubleshoot: true,
  canUploadReleases: true,
  canWriteDevices: true
};

export const userId = 'a30a780b-b843-5344-80e3-0fd95a4f6fc3';

const deviceTypes = { qemu: 'qemux86-64' };

export const releasesList = Array.from({ length: 5000 }, (x, i) => ({
  artifacts: [
    {
      id: 'art1',
      description: 'test description',
      device_types_compatible: [deviceTypes.qemu],
      modified: '2020-09-10T12:16:22.667Z',
      updates: [{ type_info: 'testtype' }],
      artifact_depends: {
        device_type: [deviceTypes.qemu]
      },
      artifact_provides: {
        artifact_name: 'myapp',
        'data-partition.myapp.version': 'v2020.10',
        list_of_fancy: [deviceTypes.qemu, 'x172']
      },
      clears_artifact_provides: ['data-partition.myapp.*']
    }
  ],
  device_types_compatible: [deviceTypes.qemu],
  metaData: {},
  name: `release-${i + 1}`,
  modified: i
}));

export const permissionSets = [
  {
    ...defaultPermissionSets.Basic,
    object: permissionSetObjectTypes.empty,
    description: 'Set containing basic permissions.',
    permissions: [
      { action: 'http', object: { type: 'any', value: '^/api/management/v1/useradm/settings$' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/v1/useradm/users/me$' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/1.0/auth/verify$' } },
      { action: 'http', object: { type: 'PUT', value: '^/api/management/v1/useradm/2faverify$' } },
      { action: 'http', object: { type: 'POST', value: '^/api/management/v1/useradm/users/me/2fa/(enable|disable)$' } },
      { action: 'http', object: { type: 'GET', value: '^/api/management/(v[1-9])/useradm/roles' } },
      { action: 'http', object: { type: 'GET', value: '^/api/management/(v[1-9])/tenantadm/user/tenant' } }
    ]
  },
  {
    ...defaultPermissionSets.ManageReleases,
    action: uiPermissionsById.manage.title,
    object: permissionSetObjectTypes.releases,
    description: 'Set of permissions which allows user to manage releases',
    permissions: [
      { action: 'http', object: { type: 'GET', value: commonEndpoints.artifacts } },
      { action: 'http', object: { type: 'GET', value: commonEndpoints.artifactDetails } },
      { action: 'http', object: { type: 'PUT', value: commonEndpoints.artifactDetails } },
      { action: 'http', object: { type: 'DELETE', value: commonEndpoints.artifactDetails } },
      { action: 'http', object: { type: 'GET', value: '^/api/management/v1/deployments/artifacts/[^/]+/download' } }
    ]
  },
  {
    ...defaultPermissionSets.ReadUsers,
    action: uiPermissionsById.read.title,
    object: permissionSetObjectTypes.userManagement,
    description: 'Set of permissions which allows user to view other users',
    permissions: [{ action: 'http', object: { type: 'GET', value: '^/api/management/(v[1-9])/useradm/' } }]
  },
  {
    ...defaultPermissionSets.ManageUsers,
    action: uiPermissionsById.manage.title,
    object: permissionSetObjectTypes.userManagement,
    description: 'Set of permissions which allows user manage other user accounts',
    permissions: [{ action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/useradm/' } }]
  },
  {
    ...defaultPermissionSets.ReadTenants,
    action: uiPermissionsById.read.title,
    object: permissionSetObjectTypes.tenantManagement,
    description: 'Set of permissions which allows user to list other tenants and their config',
    permissions: [
      { action: 'http', object: { type: 'GET', value: '^/api/management/(v[1-9])/tenantadm/' } },
      { action: 'http', object: { type: 'POST', value: '^/api/management/(v[1-9])/tenantadm/' } }
    ]
  },
  {
    ...defaultPermissionSets.ManageTenants,
    action: uiPermissionsById.manage.title,
    object: permissionSetObjectTypes.tenantManagement,
    description: 'Set of permissions which allows user to manage other tenants and their config',
    permissions: [
      { action: 'http', object: { type: 'GET', value: '^/api/management/(v[1-9])/tenantadm/' } },
      { action: 'http', object: { type: 'POST', value: '^/api/management/(v[1-9])/tenantadm/' } },
      { action: 'http', object: { type: 'PUT', value: '^/api/management/(v[1-9])/tenantadm/' } }
    ]
  },
  {
    ...defaultPermissionSets.ReadAuditLogs,
    action: uiPermissionsById.read.title,
    object: 'System Audit Log',
    description: 'Set of permissions which allows user to view system audit log',
    permissions: [{ action: 'http', object: { type: 'GET', value: '^/api/management/(v[1-9]|0.1.0)/auditlogs/logs' } }]
  },
  {
    ...defaultPermissionSets.DeployToDevices,
    action: 'Deploy',
    object: permissionSetObjectTypes.groups,
    description: 'Set of permissions which allows user to deploy to devices',
    permissions: [{ action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/(deployments|deviceconfig)/' } }],
    supported_scope_types: [scopedPermissionAreas.groups.scopeType]
  },
  {
    ...defaultPermissionSets.ConfigureDevices,
    action: 'Configure',
    object: permissionSetObjectTypes.groups,
    description: 'Set of permissions which allows user to manage configuration of the devices',
    permissions: [{ action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/deviceconfig/' } }],
    supported_scope_types: [scopedPermissionAreas.groups.scopeType]
  },
  {
    ...defaultPermissionSets.ConnectToDevices,
    action: 'Connect',
    object: permissionSetObjectTypes.groups,
    description: 'Set of permissions which allows user to use remote terminal and file transfer',
    permissions: [
      { action: 'http', object: { type: 'GET', value: '^/api/management/(v[1-9]|0.1.0)/deviceconnect/devices/[^/]+/connect$' } },
      { action: 'http', object: { type: 'GET', value: '^/api/management/(v[1-9]|0.1.0)/deviceconnect/devices/[^/]+/download\\?path=[^\u0026]+$' } },
      { action: 'http', object: { type: 'PUT', value: '^/api/management/(v[1-9]|0.1.0)/deviceconnect/devices/[^/]+/upload$' } }
    ],
    supported_scope_types: [scopedPermissionAreas.groups.scopeType]
  },
  {
    ...defaultPermissionSets.SuperUser,
    action: 'Any',
    object: permissionSetObjectTypes.any,
    description: 'Set of permissions which allows user to do anything',
    permissions: [{ action: 'any', object: { type: 'any', value: 'any' } }]
  },
  {
    ...defaultPermissionSets.UploadArtifacts,
    action: 'Upload',
    object: permissionSetObjectTypes.artifacts,
    description: 'Set of permissions which allows user to upload artifacts',
    permissions: [
      { action: 'http', object: { type: 'POST', value: commonEndpoints.artifacts } },
      { action: 'http', object: { type: 'POST', value: '^/api/management/v1/deployments/artifacts/generate' } }
    ]
  },
  {
    ...defaultPermissionSets.ReadDevices,
    action: uiPermissionsById.read.title,
    object: permissionSetObjectTypes.groups,
    description: 'Set of permissions which allows user to view devices',
    permissions: [
      { action: 'http', object: { type: 'POST', value: '^/api/management/v2/inventory/filters/search' } },
      { action: 'http', object: { type: 'POST', value: '^/api/management/v1/reporting/devices/search' } },
      { action: 'http', object: { type: 'GET', value: '^/api/management/(v[1-9])/(deployments|devauth|inventory|deviceconfig|devicemonitor)/' } },
      { action: 'http', object: { type: 'GET', value: '^/api/management/(v[1-9]|0.1.0)/deviceconnect/devices/[^/]+$' } }
    ],
    supported_scope_types: [scopedPermissionAreas.groups.scopeType]
  },
  {
    ...defaultPermissionSets.ManageDevices,
    action: uiPermissionsById.manage.title,
    object: permissionSetObjectTypes.groups,
    description: 'Set of permissions which allows user to manage devices',
    permissions: [
      { action: 'http', object: { type: 'POST', value: commonEndpoints.deviceManagement } },
      { action: 'http', object: { type: 'PUT', value: commonEndpoints.deviceManagement } },
      { action: 'http', object: { type: 'DELETE', value: commonEndpoints.deviceManagement } }
    ],
    supported_scope_types: [scopedPermissionAreas.groups.scopeType]
  },
  {
    ...defaultPermissionSets.ReadReleases,
    action: uiPermissionsById.read.title,
    object: permissionSetObjectTypes.releases,
    description: 'Set of permissions which allows user to view releases',
    permissions: [
      { action: 'http', object: { type: 'GET', value: commonEndpoints.artifacts } },
      { action: 'http', object: { type: 'GET', value: commonEndpoints.artifactDetails } },
      { action: 'http', object: { type: 'GET', value: '^/api/management/v1/deployments/artifacts/[^/]+/download' } }
    ]
  },
  {
    name: 'almostAdmin',
    object: permissionSetObjectTypes.empty,
    description: 'Set containing all the permissions.',
    permissions: [
      { action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/auditlogs/.*' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/deployments/.*' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/deployments/config/.*' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/deployments/deployments/.*' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/deployments/deployments/releases/.*' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/devauth/.*' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/deviceconfig/.*' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/deviceconnect/.*' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/deviceconnect/devices' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/inventory/.*' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/iot-manager/.*' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/monitor/.*' } },
      { action: 'http', object: { type: 'any', value: '^/api/management/(v[1-9])/useradm/.*' } }
    ]
  }
];

export const rbacRoles = [
  {
    name: 'dyn',
    description: '',
    permissions: [
      { action: 'CREATE_DEPLOYMENT', object: { type: 'DEVICE_GROUP', value: 'dyn' } },
      { action: 'VIEW_DEVICE', object: { type: 'DEVICE_GROUP', value: 'dyn' } }
    ]
  },
  { name: 'asdasd', description: '123', permissions: [{ action: 'http', object: { type: 'any', value: '/api/management/v1/useradm/.*' } }] },
  {
    name: '141sasd',
    description: '1313adg',
    permission_sets_with_scope: [
      { ...defaultPermissionSets.ReadDevices, scope: { type: scopedPermissionAreas.groups.scopeType, value: ['bestgroup'] } },
      { ...defaultPermissionSets.ConnectToDevices, scope: { type: scopedPermissionAreas.groups.scopeType, value: ['bestgroup'] } },
      { ...defaultPermissionSets.ManageUsers }
    ]
  },
  {
    name: 'kljlkk',
    description: 'lkl',
    permission_sets_with_scope: [{ ...defaultPermissionSets.ConnectToDevices, scope: { type: scopedPermissionAreas.groups.scopeType, value: ['bestgroup'] } }]
  },
  {
    name: 'yyyyy',
    description: 'asd',
    permission_sets_with_scope: [
      { ...defaultPermissionSets.ManageDevices, scope: { type: scopedPermissionAreas.groups.scopeType, value: ['dockerclient'] } },
      { ...defaultPermissionSets.ManageReleases }
    ]
  },
  {
    name: 'RBAC_ROLE_DEPLOYMENTS_MANAGER',
    description: 'Intended for users responsible for managing deployments, this role can create and abort deployments',
    permission_sets_with_scope: [{ ...defaultPermissionSets.DeployToDevices }]
  },
  {
    name: 'RBAC_ROLE_REMOTE_TERMINAL',
    description: `Intended for tech support accounts, this role can access the devices' Remote Terminal.`,
    permission_sets_with_scope: [{ ...defaultPermissionSets.ConnectToDevices }]
  },
  { name: 'RBAC_ROLE_PERMIT_ALL', description: '', permission_sets_with_scope: [{ ...defaultPermissionSets.SuperUser }] },
  {
    name: 'RBAC_ROLE_OBSERVER',
    description:
      'Intended for team leaders or limited tech support accounts, this role can see all Devices, Artifacts and Deployment reports but not make any changes.',
    permission_sets_with_scope: [{ ...defaultPermissionSets.ReadReleases }, { ...defaultPermissionSets.ReadDevices }]
  },
  {
    name: 'RBAC_ROLE_CI',
    description:
      'Intended for automation accounts building software (e.g. CI/CD systems), this role can only manage Artifacts, including upload new Artifacts and delete Artifacts. It does not have access to Devices or Deployments.',
    permission_sets_with_scope: [
      { ...defaultPermissionSets.ReadReleases },
      { ...defaultPermissionSets.ManageReleases },
      { ...defaultPermissionSets.UploadArtifacts }
    ]
  },
  {
    name: 'almostAdmin',
    description: 'almost admin rights',
    permissions: permissionSets.find(item => item.name === 'almostAdmin')?.permissions
  },
  {
    name: 'almostAdminNew',
    description: 'almost admin rights',
    permission_sets_with_scope: Object.values(defaultPermissionSets)
  }
];

const expectedParsedRoles = {
  '141sasd': {
    editable: true,
    isCustom: undefined,
    uiPermissions: {
      ...emptyUiPermissions,
      groups: { bestgroup: [uiPermissionsById.read.value, uiPermissionsById.connect.value] },
      userManagement: [uiPermissionsById.manage.value]
    }
  },
  asdasd: {
    editable: false,
    isCustom: true,
    uiPermissions: { ...emptyUiPermissions, userManagement: [uiPermissionsById.read.value, uiPermissionsById.manage.value] }
  },
  dyn: {
    editable: false,
    isCustom: true,
    uiPermissions: {
      ...emptyUiPermissions,
      deployments: [uiPermissionsById.deploy.value],
      groups: { dyn: [uiPermissionsById.read.value, uiPermissionsById.deploy.value] }
    }
  },
  kljlkk: {
    editable: true,
    isCustom: false,
    uiPermissions: { ...emptyUiPermissions, groups: { bestgroup: [uiPermissionsById.read.value, uiPermissionsById.connect.value] } }
  },
  yyyyy: {
    editable: true,
    isCustom: undefined,
    uiPermissions: {
      ...emptyUiPermissions,
      groups: { dockerclient: [uiPermissionsById.read.value, uiPermissionsById.manage.value] },
      releases: { [ALL_RELEASES]: [uiPermissionsById.manage.value] }
    }
  },
  almostAdmin: {
    editable: false,
    isCustom: true,
    uiPermissions: {
      ...emptyUiPermissions,
      auditlog: [uiPermissionsById.read.value],
      deployments: [uiPermissionsById.manage.value, uiPermissionsById.deploy.value, uiPermissionsById.read.value],
      groups: {
        [ALL_DEVICES]: [
          uiPermissionsById.read.value,
          // we can't assign deployment permissions to devices here, since the old path based rbac controls don't allow the scoped permissions
          // uiPermissionsById.deploy.value,
          uiPermissionsById.manage.value,
          uiPermissionsById.connect.value,
          uiPermissionsById.configure.value
        ]
      },
      releases: {
        [ALL_RELEASES]: [uiPermissionsById.read.value, uiPermissionsById.upload.value, uiPermissionsById.manage.value]
      },
      userManagement: [uiPermissionsById.read.value, uiPermissionsById.manage.value]
    }
  },
  almostAdminNew: {
    editable: true,
    isCustom: undefined,
    uiPermissions: {
      ...emptyUiPermissions,
      auditlog: [uiPermissionsById.read.value],
      deployments: [uiPermissionsById.read.value, uiPermissionsById.deploy.value, uiPermissionsById.manage.value],
      groups: {
        [ALL_DEVICES]: [
          uiPermissionsById.read.value,
          uiPermissionsById.manage.value,
          uiPermissionsById.deploy.value,
          uiPermissionsById.connect.value,
          uiPermissionsById.configure.value
        ]
      },
      releases: {
        [ALL_RELEASES]: [uiPermissionsById.manage.value, uiPermissionsById.upload.value, uiPermissionsById.read.value]
      },
      tenantManagement: [uiPermissionsById.read.value, uiPermissionsById.manage.value],
      userManagement: [uiPermissionsById.read.value, uiPermissionsById.manage.value]
    }
  }
};

const defaultRolesById = {
  ...rolesById,
  test: {
    ...emptyRole,
    name: 'test',
    description: 'test description',
    editable: true,
    uiPermissions: {
      ...emptyUiPermissions,
      groups: { testGroup: [uiPermissionsById.read.value] },
      releases: { bar: [uiPermissionsById.read.value] }
    }
  }
};

export const receivedRoles = rbacRoles.reduce(
  (accu, role) => {
    const { name, description, ...roleRemainder } = role;
    if (name.startsWith('RBAC')) {
      accu[name] = {
        ...defaultRolesById[name],
        ...roleRemainder,
        editable: false,
        isCustom: false,
        description: defaultRolesById[name].description ? defaultRolesById[name].description : description
      };
    } else {
      const result = expectedParsedRoles[name] ?? {};
      accu[name] = {
        ...emptyRole,
        ...role,
        ...result,
        name
      };
    }
    return accu;
  },
  { ...defaultRolesById }
);

export const receivedPermissionSets = permissionSets.reduce((accu, set) => {
  const result = defaultPermissionSets[set.name]?.result ?? {};
  accu[set.name] = {
    ...set,
    result: {
      ...emptyUiPermissions,
      ...result
    }
  };
  return accu;
}, {});
