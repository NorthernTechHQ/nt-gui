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
import { describe, expect, it } from 'vitest';

import reducer, { actions, initialState } from '.';
import { defaultState } from '../../../../tests/mockData';

const testUser = {
  created_ts: '',
  email: 'test@example.com',
  id: '123',
  roles: ['RBAC_ROLE_PERMIT_ALL'],
  tfasecret: '',
  updated_ts: ''
};

const newDescription = 'new description';

describe('user reducer', () => {
  it('should return the initial state', async () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle RECEIVED_QR_CODE', async () => {
    expect(reducer(undefined, { type: actions.receivedQrCode.type, payload: '123' }).qrCode).toEqual('123');
    expect(reducer(initialState, { type: actions.receivedQrCode.type, payload: '123' }).qrCode).toEqual('123');
  });

  it('should handle SUCCESSFULLY_LOGGED_IN', async () => {
    expect(reducer(undefined, { type: actions.successfullyLoggedIn.type, payload: '123' }).currentSession).toEqual('123');
    expect(reducer(initialState, { type: actions.successfullyLoggedIn.type, payload: '123' }).currentSession).toEqual('123');
  });

  it('should handle RECEIVED_USER_LIST', async () => {
    expect(reducer(undefined, { type: actions.receivedUserList.type, payload: { '123': testUser } }).byId).toEqual({ '123': testUser });
    expect(reducer({ ...initialState, byId: { '123': testUser } }, { type: actions.receivedUserList.type, payload: { '456': testUser } }).byId).toEqual({
      '456': testUser
    });
  });

  it('should handle RECEIVED_ACTIVATION_CODE', async () => {
    expect(reducer(undefined, { type: actions.receivedActivationCode.type, payload: 'code' }).activationCode).toEqual('code');
    expect(reducer({ ...initialState }, { type: actions.receivedActivationCode.type, payload: 'code' }).activationCode).toEqual('code');
  });

  it('should handle RECEIVED_USER', async () => {
    expect(reducer(undefined, { type: actions.receivedUser.type, payload: testUser }).byId).toEqual({ '123': testUser });
    expect(reducer({ ...initialState, byId: { '123': testUser } }, { type: actions.receivedUser.type, payload: testUser }).byId).toEqual({ '123': testUser });
  });

  it('should handle REMOVED_USER', async () => {
    expect(reducer(undefined, { type: actions.removedUser.type, payload: '123' }).byId).toEqual({});
    expect(reducer({ ...initialState, byId: { '123': testUser, '456': testUser } }, { type: actions.removedUser.type, payload: '123' }).byId).toEqual({
      '456': testUser
    });
  });

  it('should handle UPDATED_USER', async () => {
    expect(reducer(undefined, { type: actions.updatedUser.type, payload: testUser }).byId).toEqual({ '123': testUser });

    expect(
      reducer({ ...initialState, byId: { '123': testUser } }, { type: actions.updatedUser.type, payload: { ...testUser, email: 'test@mender.io' } }).byId['123']
        .email
    ).toEqual('test@mender.io');
  });
  it('should handle RECEIVED_ROLES', async () => {
    const roles = reducer(undefined, { type: actions.receivedRoles.type, payload: { ...defaultState.users.rolesById } }).rolesById;
    Object.entries(defaultState.users.rolesById).forEach(([key, role]) => expect(roles[key]).toEqual(role));
    expect(
      reducer(
        { ...initialState, rolesById: { ...defaultState.users.rolesById, thingsRole: { ...defaultState.users.rolesById.test, name: 'test 2' } } },
        { type: actions.receivedRoles.type, payload: { ...defaultState.users.rolesById } }
      ).rolesById.thingsRole
    ).toBeFalsy();
  });
  it('should handle REMOVED_ROLE', async () => {
    expect(reducer(undefined, { type: actions.removedRole.type, payload: defaultState.users.rolesById.test.name }).rolesById.test).toBeFalsy();
    expect(
      reducer(
        { ...initialState, rolesById: { ...defaultState.users.rolesById } },
        { type: actions.removedRole.type, payload: defaultState.users.rolesById.test.name }
      ).rolesById.test
    ).toBeFalsy();
  });
  it('should handle CREATED_ROLE', async () => {
    expect(
      reducer(undefined, { type: actions.createdRole.type, payload: { name: 'newRole', description: newDescription, groups: ['123'] } }).rolesById.newRole
        .description
    ).toEqual(newDescription);
    expect(
      reducer({ ...initialState }, { type: actions.createdRole.type, payload: { name: 'newRole', description: newDescription, groups: ['123'] } }).rolesById
        .newRole.description
    ).toEqual(newDescription);
  });
  it('should handle UPDATED_ROLE', async () => {
    expect(
      reducer(undefined, { type: actions.createdRole.type, payload: { name: 'RBAC_ROLE_CI', description: newDescription } }).rolesById.RBAC_ROLE_CI.name
    ).toEqual('RBAC_ROLE_CI');
    expect(
      reducer({ ...initialState }, { type: actions.createdRole.type, payload: { name: 'RBAC_ROLE_CI', description: newDescription } }).rolesById.RBAC_ROLE_CI
        .name
    ).toEqual('RBAC_ROLE_CI');
  });
  it('should handle SET_CUSTOM_COLUMNS', async () => {
    expect(reducer(undefined, { type: actions.setCustomColumns.type, payload: 'test' }).customColumns).toEqual('test');
    expect(reducer({ ...initialState }, { type: actions.setCustomColumns.type, payload: 'test' }).customColumns).toEqual('test');
  });
  it('should handle SET_GLOBAL_SETTINGS', async () => {
    expect(reducer(undefined, { type: actions.setGlobalSettings.type, payload: { newSetting: 'test' } }).globalSettings).toEqual({
      ...initialState.globalSettings,
      newSetting: 'test'
    });
    expect(reducer({ ...initialState }, { type: actions.setGlobalSettings.type, payload: { newSetting: 'test' } }).globalSettings).toEqual({
      ...initialState.globalSettings,
      newSetting: 'test'
    });
  });
  it('should handle SET_SHOW_CONNECT_DEVICE', async () => {
    expect(reducer(undefined, { type: actions.setShowConnectingDialog.type, payload: false }).showConnectDeviceDialog).toEqual(false);
    expect(reducer({ ...initialState }, { type: actions.setShowConnectingDialog.type, payload: true }).showConnectDeviceDialog).toEqual(true);
  });
});
