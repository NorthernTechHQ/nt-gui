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
import { getSessionInfo } from '@northern.tech/store/auth';
import { emptyRole } from '@northern.tech/store/commonConstants';
import { setOfflineThreshold } from '@northern.tech/store/thunks';
import { act } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import Cookies from 'universal-cookie';
import type { Mock } from 'vitest';
import { describe, expect, it, vi } from 'vitest';

import { actions } from '.';
import { accessTokens, defaultPassword, defaultState, receivedPermissionSets, receivedRoles, testSsoId, userId } from '../../../../tests/mockData';
import { actions as appActions } from '../appSlice';
import { getSamlStartUrl } from '../organizationSlice/constants';
import { USER_LOGOUT, uiPermissionsById } from './constants';
import {
  addUserToCurrentTenant,
  createRole,
  createUser,
  disableUser2fa,
  editRole,
  editUser,
  enableUser2fa,
  generateToken,
  get2FAQRCode,
  getGlobalSettings,
  getPermissionSets,
  getRoles,
  getTokens,
  getUser,
  getUserList,
  getUserSettings,
  initializeSelf,
  loginUser,
  logoutUser,
  passwordResetComplete,
  passwordResetStart,
  removeRole,
  removeUser,
  revokeToken,
  saveGlobalSettings,
  saveUserSettings,
  setAllTooltipsReadState,
  setHideAnnouncement,
  setTooltipReadState,
  switchUserOrganization,
  updateUserColumnSettings,
  verify2FA,
  verifyEmailComplete,
  verifyEmailStart
} from './thunks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const defaultRole = { ...emptyRole, name: 'test', description: 'test description' };
const settings = { test: true };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { attributes, ...expectedDevice } = defaultState.devices.byId.a1;

export const offlineThreshold = [
  { type: setOfflineThreshold.pending.type },
  { type: appActions.setOfflineThreshold.type, payload: '2019-01-12T13:00:00.900Z' },
  { type: setOfflineThreshold.fulfilled.type }
];
vi.mock('universal-cookie', () => {
  const mockCookie = {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn()
  };
  return { default: vi.fn(() => mockCookie) };
});
const cookies = new Cookies();
const tooltipIds = ['foo', 'bar'];

describe('user actions', () => {
  it('should allow retrieving 2fa qr codes', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: get2FAQRCode.pending.type },
      { type: actions.receivedQrCode.type, payload: btoa('test') },
      { type: get2FAQRCode.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(get2FAQRCode());
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });

  const commonUserRetrievalActions = [
    { type: setHideAnnouncement.pending.type },
    { type: updateUserColumnSettings.pending.type },
    { type: actions.setCustomColumns.type, payload: [] },
    { type: setHideAnnouncement.fulfilled.type },
    { type: updateUserColumnSettings.fulfilled.type },
    { type: getUser.fulfilled.type }
  ];

  it('should verify 2fa codes during 2fa setup', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: verify2FA.pending.type },
      { type: getUser.pending.type },
      { type: actions.receivedUser.type, payload: defaultState.users.byId[userId] },
      ...commonUserRetrievalActions,
      { type: verify2FA.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(verify2FA({ token2fa: '123456' }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow enabling 2fa during 2fa setup', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: enableUser2fa.pending.type },
      { type: getUser.pending.type },
      { type: actions.receivedUser.type, payload: defaultState.users.byId.a1 },
      ...commonUserRetrievalActions,
      { type: enableUser2fa.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(enableUser2fa(defaultState.users.byId.a1.id));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow disabling 2fa during 2fa setup', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: disableUser2fa.pending.type },
      { type: getUser.pending.type },
      { type: actions.receivedQrCode.type, payload: null },
      { type: actions.receivedUser.type, payload: defaultState.users.byId.a1 },
      ...commonUserRetrievalActions,
      { type: disableUser2fa.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(disableUser2fa(defaultState.users.byId.a1.id));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow beginning email verification', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: verifyEmailStart.pending.type },
      { type: getUser.pending.type },
      { type: actions.receivedUser.type, payload: defaultState.users.byId[userId] },
      ...commonUserRetrievalActions,
      { type: verifyEmailStart.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(verifyEmailStart());
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow completing email verification', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: verifyEmailComplete.pending.type },
      { type: getUser.pending.type },
      { type: actions.receivedUser.type, payload: defaultState.users.byId[userId] },
      ...commonUserRetrievalActions,
      { type: verifyEmailComplete.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(verifyEmailComplete('superSecret'));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
    await expect(store.dispatch(verifyEmailComplete('ohNo')).unwrap()).rejects.toBeTruthy();
  });
  it('should allow logging in', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: loginUser.pending.type },
      { type: getUser.pending.type },
      { type: actions.receivedUser.type, payload: defaultState.users.byId[userId] },
      ...commonUserRetrievalActions,
      { type: actions.successfullyLoggedIn.type, payload: getSessionInfo() },
      { type: loginUser.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(loginUser({ email: 'test@example.com', password: defaultPassword }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should redirect on SSO login', async () => {
    const store = mockStore({ ...defaultState });
    const replaceSpy = vi.spyOn(window.location, 'replace');
    await store.dispatch(loginUser({ email: 'test@example.com' }));
    await act(async () => {
      vi.runOnlyPendingTimers();
      vi.runAllTicks();
    });
    expect(replaceSpy).toHaveBeenCalledWith(getSamlStartUrl(testSsoId));
  });
  it('should prevent logging in with a limited user', async () => {
    vi.clearAllMocks();
    (window.localStorage.getItem as Mock).mockReturnValueOnce(JSON.stringify({ token: 'limitedToken' }));
    const expectedActions = [
      { type: loginUser.pending.type },
      { type: getUser.pending.type },
      { type: getUser.rejected.type },
      { type: appActions.setSnackbar.type, payload: 'forbidden by role-based access control' },
      // {
      //   type: appActions.setSnackbar.type,
      //   payload: 'There was a problem logging in. Please check your email and password. If you still have problems, contact an administrator.'
      // },
      { type: loginUser.rejected.type }
    ];
    const store = mockStore({ ...defaultState });
    try {
      await store.dispatch(loginUser({ email: 'test-limited@example.com', password: defaultPassword }));
    } catch (error) {
      expect(error).toMatchObject(expectedActions[5]);
    }
    await act(async () => {
      vi.runOnlyPendingTimers();
      vi.runAllTicks();
    });
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('JWT');
    (window.localStorage.getItem as Mock).mockReset();
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow logging out', async () => {
    vi.clearAllMocks();
    const expectedActions = [{ type: logoutUser.pending.type }, { type: USER_LOGOUT }, { type: logoutUser.fulfilled.type }];
    const store = mockStore({ ...defaultState });
    await store.dispatch(logoutUser());
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should not allow logging out with an active upload', async () => {
    vi.clearAllMocks();
    const store = mockStore({ ...defaultState, releases: { ...defaultState.releases, progress: 42 } });
    await store.dispatch(logoutUser()).catch(() => expect(true).toEqual(true));
  });
  it('should allow switching users', async () => {
    vi.clearAllMocks();
    const reloadSpy = vi.spyOn(window.location, 'reload');
    const store = mockStore({ ...defaultState, releases: { ...defaultState.releases, progress: 42 } });
    await store.dispatch(switchUserOrganization('a1'));
    expect(localStorage.getItem).toHaveBeenCalledWith('JWT');
    expect(localStorage.setItem).toHaveBeenCalledWith('JWT', JSON.stringify({ token: 'differentToken' }));
    expect(reloadSpy).toHaveBeenCalled();
  });
  it('should not allow switching users during uploads', async () => {
    vi.clearAllMocks();
    const store = mockStore({ ...defaultState, releases: { ...defaultState.releases, progress: 42 } });
    await store.dispatch(switchUserOrganization('a1')).catch(() => expect(true).toEqual(true));
  });
  it('should allow single user retrieval', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: getUser.pending.type },
      { type: actions.receivedUser.type, payload: defaultState.users.byId.a1 },
      ...commonUserRetrievalActions
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(getUser('a1'));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    // we can't check for the correct value here as the localstorage is (ab)used by msw to track state during req/res cycles, thus the localStorage expectation
    expect(window.localStorage.getItem).toHaveBeenCalledWith(`a1-column-widths`);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow current user initialization', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: initializeSelf.pending.type },
      { type: getUser.pending.type },
      { type: actions.receivedUser.type, payload: defaultState.users.byId[userId] },
      ...commonUserRetrievalActions,
      { type: initializeSelf.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(initializeSelf());
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow user list retrieval', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: getUserList.pending.type },
      { type: actions.receivedUserList.type, payload: defaultState.users.byId },
      { type: getUserList.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(getUserList());
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow single user creation', async () => {
    vi.clearAllMocks();
    const createdUser = { email: 'a@b.com', password: defaultPassword };
    const expectedActions = [
      { type: createUser.pending.type },
      { type: getUserList.pending.type },
      { type: appActions.setSnackbar.type, payload: 'The user was created successfully.' },
      { type: actions.receivedUserList.type, payload: defaultState.users.byId },
      { type: getUserList.fulfilled.type },
      { type: createUser.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(createUser(createdUser));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow single user edits', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: editUser.pending.type },
      { type: actions.updatedUser.type, payload: { id: 'a1', password: defaultPassword } },
      { type: appActions.setSnackbar.type, payload: 'The user has been updated.' },
      { type: editUser.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(editUser({ id: 'a1', email: defaultState.users.byId.a1.email, password: defaultPassword, current_password: 'current_password' }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should not allow current user edits without proper password', async () => {
    vi.clearAllMocks();
    const store = mockStore({ ...defaultState });
    await expect(
      store.dispatch(editUser({ id: 'a1', email: 'a@evil.com', password: 'mySecretPasswordNot', current_password: 'bad_password' })).unwrap()
    ).rejects.toMatchObject({
      message: 'Request failed with status code 401'
    });
  });
  it('should allow single user removal', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: removeUser.pending.type },
      { type: actions.removedUser.type, payload: 'a1' },
      { type: getUserList.pending.type },
      { type: appActions.setSnackbar.type, payload: 'The user was removed from the system.' },
      { type: actions.receivedUserList.type, payload: defaultState.users.byId },
      { type: getUserList.fulfilled.type },
      { type: removeUser.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(removeUser('a1'));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow single user removal', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: addUserToCurrentTenant.pending.type },
      { type: appActions.setSnackbar.type, payload: 'The user was added successfully.' },
      { type: getUserList.pending.type },
      { type: actions.receivedUserList.type, payload: defaultState.users.byId },
      { type: getUserList.fulfilled.type },
      { type: addUserToCurrentTenant.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(addUserToCurrentTenant('a1'));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });

  it('should allow role list retrieval', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: getRoles.pending.type },
      { type: getPermissionSets.pending.type },
      { type: actions.receivedPermissionSets.type, payload: receivedPermissionSets },
      { type: getPermissionSets.fulfilled.type },
      { type: actions.receivedRoles.type, payload: receivedRoles },
      { type: getRoles.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(getRoles());
    await act(async () => {
      vi.runOnlyPendingTimers();
      vi.runAllTicks();
    });
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow role creation', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: createRole.pending.type },
      { type: actions.createdRole.type, payload: defaultRole },
      { type: getRoles.pending.type },
      { type: getPermissionSets.pending.type },
      { type: appActions.setSnackbar.type, payload: 'The role was created successfully.' },
      { type: actions.receivedPermissionSets.type, payload: receivedPermissionSets },
      { type: getPermissionSets.fulfilled.type },
      { type: actions.receivedRoles.type, payload: receivedRoles },
      { type: getRoles.fulfilled.type },
      { type: createRole.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(createRole({ ...defaultRole, uiPermissions: { groups: [{ item: 'testGroup', uiPermissions: [uiPermissionsById.manage.value] }] } }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow role edits', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: editRole.pending.type },
      {
        type: actions.createdRole.type,
        payload: {
          ...defaultRole,
          name: defaultRole.name,
          uiPermissions: {
            ...defaultRole.uiPermissions,
            groups: { ...defaultRole.uiPermissions.groups, testGroup: [uiPermissionsById.manage.value] }
          }
        }
      },
      { type: getRoles.pending.type },
      { type: getPermissionSets.pending.type },
      { type: appActions.setSnackbar.type, payload: 'The role has been updated.' },
      { type: actions.receivedPermissionSets.type, payload: receivedPermissionSets },
      { type: getPermissionSets.fulfilled.type },
      { type: actions.receivedRoles.type, payload: receivedRoles },
      { type: getRoles.fulfilled.type },
      { type: editRole.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(
      editRole({ name: defaultRole.name, uiPermissions: { groups: [{ item: 'testGroup', uiPermissions: [uiPermissionsById.manage.value] }] } })
    );
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow role removal', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: removeRole.pending.type },
      { type: actions.removedRole.type, payload: 'test' },
      { type: getRoles.pending.type },
      { type: getPermissionSets.pending.type },
      { type: appActions.setSnackbar.type, payload: 'The role was deleted successfully.' },
      { type: actions.receivedPermissionSets.type, payload: receivedPermissionSets },
      { type: getPermissionSets.fulfilled.type },
      { type: actions.receivedRoles.type, payload: receivedRoles },
      { type: getRoles.fulfilled.type },
      { type: removeRole.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(removeRole('test'));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow password reset - pt. 1', async () => {
    const store = mockStore({ ...defaultState });
    await store.dispatch(passwordResetStart(defaultState.users.byId.a1.email)).then(() => expect(true).toEqual(true));
  });
  it('should allow password reset - pt. 2', async () => {
    const store = mockStore({ ...defaultState });
    await store.dispatch(passwordResetComplete({ secretHash: 'secretHash', newPassword: 'newPassword' })).then(() => expect(true).toEqual(true));
  });
  it('should allow storing global settings without deletion', async () => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id_attribute, ...retrievedSettings } = defaultState.users.globalSettings;
    const expectedActions = [
      { type: saveGlobalSettings.pending.type },
      { type: getGlobalSettings.pending.type },
      { type: actions.setGlobalSettings.type, payload: { ...retrievedSettings } },
      ...offlineThreshold,
      { type: getGlobalSettings.fulfilled.type },
      { type: actions.setGlobalSettings.type, payload: { ...defaultState.users.globalSettings, ...settings } },
      { type: saveGlobalSettings.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(saveGlobalSettings(settings));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow storing global settings without deletion and with notification', async () => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id_attribute, ...retrievedSettings } = defaultState.users.globalSettings;
    const expectedActions = [
      { type: saveGlobalSettings.pending.type },
      { type: getGlobalSettings.pending.type },
      { type: actions.setGlobalSettings.type, payload: { ...retrievedSettings } },
      ...offlineThreshold,
      { type: getGlobalSettings.fulfilled.type },
      { type: actions.setGlobalSettings.type, payload: { ...defaultState.users.globalSettings, ...settings } },
      { type: appActions.setSnackbar.type, payload: 'Settings saved successfully' },
      { type: saveGlobalSettings.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(saveGlobalSettings({ ...settings, notify: true }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow storing user scoped settings', async () => {
    vi.clearAllMocks();
    const { ...settings } = defaultState.users.userSettings;
    const expectedActions = [
      { type: saveUserSettings.pending.type },
      { type: getUserSettings.pending.type },
      { type: actions.setUserSettings.type, payload: settings },
      { type: getUserSettings.fulfilled.type },
      { type: actions.setUserSettings.type, payload: { ...settings, extra: 'this' } },
      { type: saveUserSettings.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(saveUserSettings({ extra: 'this' }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should store the visibility of the announcement shown in the header in a cookie on dismissal', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: setHideAnnouncement.pending.type },
      { type: appActions.setAnnouncement.type, payload: '' },
      { type: setHideAnnouncement.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState, app: { ...defaultState.app, hostedAnnouncement: 'something' } });
    await store.dispatch(setHideAnnouncement({ shouldHide: true }));
    const storeActions = store.getActions();
    expect(cookies.get).toHaveBeenCalledTimes(1);
    expect(cookies.set).toHaveBeenCalledTimes(1);
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should store the sizes of columns in local storage', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: updateUserColumnSettings.pending.type },
      { type: actions.setCustomColumns.type, payload: [{ attribute: { name: 'asd', scope: '' }, size: 123 }] },
      { type: updateUserColumnSettings.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState, users: { ...defaultState.users, customColumns: [{ asd: 'asd' }] } });
    await store.dispatch(updateUserColumnSettings({ columns: [{ attribute: { name: 'asd', scope: '' }, size: 123 }] }));
    const storeActions = store.getActions();
    expect(localStorage.getItem).not.toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));

    vi.clearAllMocks();
    await store.dispatch(updateUserColumnSettings({}));
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('should allow token list retrieval', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: getTokens.pending.type },
      { type: actions.updatedUser.type, payload: { id: 'a1', tokens: accessTokens } },
      { type: getTokens.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(getTokens());
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow token generation', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: generateToken.pending.type },
      { type: getTokens.pending.type },
      { type: actions.updatedUser.type, payload: { id: 'a1', tokens: accessTokens } },
      { type: getTokens.fulfilled.type },
      { type: generateToken.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    const result = await store.dispatch(generateToken({ name: 'name' })).unwrap();
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expect(result[result.length - 1]).toEqual('aNewToken');
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow token removal', async () => {
    vi.clearAllMocks();
    const expectedActions = [
      { type: revokeToken.pending.type },
      { type: getTokens.pending.type },
      { type: actions.updatedUser.type, payload: { id: 'a1', tokens: accessTokens } },
      { type: getTokens.fulfilled.type },
      { type: revokeToken.fulfilled.type }
    ];
    const store = mockStore({ ...defaultState });
    await store.dispatch(revokeToken({ id: 'some-id-1', created_ts: '2022-06-02T11:11:21.725Z', expiration_date: '2022-06-02T11:11:21.725Z', name: 'name' }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });

  it('should handle setting single tooltip read state', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: setTooltipReadState.pending.type },
      { type: actions.setTooltipState.type, payload: { id: 'foo', readState: 'read' } },
      { type: saveUserSettings.pending.type },
      { type: getUserSettings.pending.type },
      { type: actions.setUserSettings.type, payload: { ...defaultState.users.userSettings } },
      { type: getUserSettings.fulfilled.type },
      { type: actions.setUserSettings.type, payload: { ...defaultState.users.userSettings } },
      { type: saveUserSettings.fulfilled.type },
      { type: setTooltipReadState.fulfilled.type }
    ];
    await store.dispatch(setTooltipReadState({ id: 'foo', readState: 'read', persist: true }));
    const storeActions = store.getActions();
    await act(async () => {
      vi.runOnlyPendingTimers();
      vi.runAllTicks();
    });
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should handle setting tooltip read state for all tips', async () => {
    const store = mockStore({ ...defaultState });

    const expectedActions = [
      { type: setAllTooltipsReadState.pending.type },
      {
        type: actions.setTooltipsState.type,
        payload: { ...tooltipIds.reduce((accu, id) => ({ ...accu, [id]: { readState: 'testRead' } }), {}) }
      },
      { type: saveUserSettings.pending.type },
      { type: getUserSettings.pending.type },
      { type: actions.setUserSettings.type, payload: { ...defaultState.users.userSettings } },
      { type: getUserSettings.fulfilled.type },
      { type: actions.setUserSettings.type, payload: { ...defaultState.users.userSettings } },
      { type: saveUserSettings.fulfilled.type },
      { type: setAllTooltipsReadState.fulfilled.type }
    ];
    await store.dispatch(setAllTooltipsReadState({ readState: 'testRead', tooltipIds }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
});
