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

const testRelease = {
  artifacts: [
    {
      id: '123',
      name: 'test',
      description: '-',
      device_types_compatible: ['test'],
      updates: [{ files: [{ size: 123, name: '' }], type_info: { type: 'rootfs-image' } }],
      url: '',
      modified: '2016-03-11T13:03:17.063493443Z'
    }
  ],
  device_types_compatible: ['test'],
  name: 'test'
};
describe('release reducer', () => {
  it('should return the initial state', async () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });
  it('should handle RECEIVE_RELEASE', async () => {
    expect(reducer(undefined, { type: actions.receiveRelease.type, payload: { ...testRelease, name: 'test2' } }).byId.test2).toEqual({
      ...testRelease,
      name: 'test2'
    });
    expect(reducer(initialState, { type: actions.receiveRelease.type, payload: { ...testRelease, name: 'test2' } }).byId.test2).toEqual({
      ...testRelease,
      name: 'test2'
    });
  });
  it('should handle RECEIVE_RELEASES', async () => {
    expect(reducer(undefined, { type: actions.receiveReleases.type, payload: { test: testRelease, test2: { ...testRelease, name: 'test2' } } }).byId).toEqual({
      test: testRelease,
      test2: { ...testRelease, name: 'test2' }
    });
    expect(
      reducer(initialState, { type: actions.receiveReleases.type, payload: { test: testRelease, test2: { ...testRelease, name: 'test2' } } }).byId
    ).toEqual({
      test: testRelease,
      test2: { ...testRelease, name: 'test2' }
    });
  });
  it('should handle RELEASE_REMOVED', async () => {
    expect(reducer(undefined, { type: actions.removeRelease.type, payload: 'test' }).byId).toEqual({});
    expect(reducer({ ...initialState, byId: { test: testRelease } }, { type: actions.removeRelease.type, payload: 'test' }).byId).toEqual({});
    expect(
      reducer({ ...initialState, byId: { test: testRelease }, selectedRelease: 'test' }, { type: actions.removeRelease.type, payload: 'test' }).selectedRelease
    ).toEqual(null);
    expect(
      reducer(
        { ...initialState, byId: { test: testRelease, test2: testRelease }, selectedRelease: 'test2' },
        { type: actions.removeRelease.type, payload: 'test' }
      ).selectedRelease
    ).toEqual('test2');
  });
  it('should handle SELECTED_RELEASE', async () => {
    expect(reducer(undefined, { type: actions.selectedRelease.type, payload: 'test' }).selectedRelease).toEqual('test');
    expect(reducer(initialState, { type: actions.selectedRelease.type, payload: 'test' }).selectedRelease).toEqual('test');
  });
  it('should handle SET_RELEASES_LIST_STATE', async () => {
    expect(reducer(undefined, { type: actions.setReleaseListState.type, payload: { something: 'special' } }).releasesList).toEqual({
      something: 'special'
    });
    expect(reducer(initialState, { type: actions.setReleaseListState.type, payload: { something: 'special' } }).releasesList).toEqual({
      something: 'special'
    });
  });
});
