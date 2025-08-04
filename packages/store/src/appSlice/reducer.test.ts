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
import { SORTING_OPTIONS } from '@northern.tech/store/constants';
import { describe, expect, it } from 'vitest';

import reducer, { actions, initialState } from '.';

const snackbarMessage = 'Run the tests';
const initialSearchState = {
  deviceIds: [],
  searchTerm: '',
  searchTotal: 0,
  isSearching: false,
  sort: { direction: SORTING_OPTIONS.desc }
};

describe('app reducer', () => {
  it('should return the initial state', async () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });
  it('should handle SET_SNACKBAR', async () => {
    expect(reducer(undefined, { type: actions.setSnackbar.type, payload: { open: true, message: snackbarMessage } }).snackbar).toEqual({
      action: undefined,
      autoHideDuration: undefined,
      message: snackbarMessage,
      open: true,
      preventClickToCopy: false
    });

    expect(reducer(initialState, { type: actions.setSnackbar.type, payload: { open: true, message: snackbarMessage } }).snackbar).toEqual({
      action: undefined,
      autoHideDuration: undefined,
      message: snackbarMessage,
      open: true,
      preventClickToCopy: false
    });
  });

  it('should handle SET_FIRST_LOGIN_AFTER_SIGNUP', async () => {
    expect(reducer(undefined, { type: actions.setFirstLoginAfterSignup.type, payload: true }).firstLoginAfterSignup).toEqual(true);

    expect(reducer(initialState, { type: actions.setFirstLoginAfterSignup.type, payload: false }).firstLoginAfterSignup).toEqual(false);
  });
  it('should handle SET_ANNOUNCEMENT', async () => {
    expect(reducer(undefined, { type: actions.setAnnouncement.type, payload: 'something' }).hostedAnnouncement).toEqual('something');
    expect(reducer(initialState, { type: actions.setAnnouncement.type, payload: undefined }).hostedAnnouncement).toEqual(undefined);
  });
  it('should handle SET_SEARCH_STATE', async () => {
    expect(reducer(undefined, { type: actions.setSearchState.type, payload: { aWhole: 'newState' } }).searchState).toEqual({
      ...initialSearchState,
      aWhole: 'newState'
    });
    expect(reducer(initialState, { type: actions.setSearchState.type, payload: undefined }).searchState).toEqual({ ...initialSearchState });
  });
  it('should handle SET_OFFLINE_THRESHOLD', async () => {
    expect(reducer(undefined, { type: actions.setOfflineThreshold.type, payload: 'something' }).offlineThreshold).toEqual('something');
    expect(reducer(initialState, { type: actions.setOfflineThreshold.type, payload: undefined }).offlineThreshold).toEqual(undefined);
  });

  const versionInformation = {
    Integration: '',
    'Mender-Artifact': '',
    'Mender-Client': '',
    'Meta-Mender': ''
  };
  it('should handle SET_VERSION_INFORMATION', async () => {
    expect(reducer(undefined, { type: actions.setVersionInformation.type, payload: { something: 'something' } }).versionInformation).toEqual({
      ...versionInformation,
      something: 'something'
    });
    expect(reducer(initialState, { type: actions.setVersionInformation.type, payload: undefined }).versionInformation).toEqual(versionInformation);
    expect(reducer(undefined, { type: actions.setVersionInformation.type, payload: { docsVersion: 'something' } }).versionInformation.docsVersion).toEqual(
      'something'
    );
    expect(reducer(initialState, { type: actions.setVersionInformation.type, payload: { docsVersion: undefined } }).versionInformation.docsVersion).toEqual(
      undefined
    );
  });

  it('should handle UPLOAD_PROGRESS', async () => {
    const { uploadsById } = reducer(undefined, { type: actions.uploadProgress.type, payload: { id: 1, progress: 40 } });
    expect(uploadsById['1']).toEqual({ progress: 40 });

    const { uploadsById: uploading2 } = reducer(initialState, { type: actions.uploadProgress.type, payload: { id: 'foo', progress: 40 } });
    expect(uploading2.foo).toEqual({ progress: 40 });
  });
});
