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
import { defaultState } from '@/testUtils';
import { describe, expect, it } from 'vitest';

import reducer, { actions, initialState } from '.';

const testUser = {
  created_ts: '',
  email: 'test@example.com',
  id: '123',
  roles: ['RBAC_ROLE_PERMIT_ALL'],
  tfasecret: '',
  updated_ts: ''
};

describe('user reducer', () => {
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

  it('should handle REMOVED_ROLE', async () => {
    expect(reducer(undefined, { type: actions.removedRole.type, payload: defaultState.users.rolesById.test.name }).rolesById.test).toBeFalsy();
    expect(
      reducer(
        { ...initialState, rolesById: { ...defaultState.users.rolesById } },
        { type: actions.removedRole.type, payload: defaultState.users.rolesById.test.name }
      ).rolesById.test
    ).toBeFalsy();
  });
});
