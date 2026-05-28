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
import { mockAbortController } from '@northern.tech/testing/setupTests';
import { deepCompare } from '@northern.tech/utils/helpers';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { describe, expect, it, vi } from 'vitest';

import { actions } from '.';
import { actions as appActions } from '../appSlice';
import { TIMEOUTS } from '../constants';
import {
  checkReleasesExistence,
  createArtifact,
  editArtifact,
  generateManifest,
  getArtifactInstallCount,
  getArtifactUrl,
  getExistingReleaseTags,
  getExistingSoftwareTags,
  getManifest,
  getManifests,
  getRelease,
  getReleases,
  getSoftware,
  getUpdateTypes,
  removeArtifact,
  removeManifest,
  removeManifests,
  removeRelease,
  selectManifest,
  selectRelease,
  setManifestsListState,
  setReleaseTags,
  setReleasesListState,
  setSingleReleaseTags,
  setSoftwareListState,
  updateManifestInfo,
  updateReleaseInfo,
  uploadArtifact,
  uploadManifest
} from './thunks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const retrievedReleaseIds = [
  'release-999',
  'release-998',
  'release-997',
  'release-996',
  'release-995',
  'release-994',
  'release-993',
  'release-992',
  'release-991',
  'release-990',
  'release-99',
  'release-989',
  'release-988',
  'release-987',
  'release-986',
  'release-985',
  'release-984',
  'release-983',
  'release-982',
  'release-981'
];
const mockFile = { name: defaultState.releases.byId.r1.name, size: 1234 } as File;
describe('release actions', () => {
  it('should retrieve a single release by name', async () => {
    const store = mockStore({ ...defaultState });
    store.clearActions();
    const expectedActions = [
      { type: getRelease.pending.type },
      { type: actions.receiveRelease.type, payload: defaultState.releases.byId.r1 },
      { type: getRelease.fulfilled.type }
    ];
    await store.dispatch(getRelease(defaultState.releases.byId.r1.name));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve a list of releases', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getReleases.pending.type },
      { type: actions.receiveReleases.type, payload: defaultState.releases.byId },
      {
        type: actions.setReleaseListState.type,
        payload: { ...defaultState.releases.releasesList, releaseIds: ['release-1'], total: 5000 }
      },
      { type: getReleases.fulfilled.type }
    ];
    await store.dispatch(getReleases({ perPage: 1, sort: { direction: 'asc', key: 'name' } }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve a search filtered list of releases', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getReleases.pending.type },
      { type: actions.receiveReleases.type, payload: defaultState.releases.byId },
      {
        type: actions.setReleaseListState.type,
        payload: {
          ...defaultState.releases.releasesList,
          releaseIds: retrievedReleaseIds,
          searchTotal: 1234
        }
      },
      { type: getReleases.fulfilled.type }
    ];
    await store.dispatch(getReleases({ searchTerm: 'something' }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve a deployment creation search filtered list of releases', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getReleases.pending.type },
      { type: actions.receiveReleases.type, payload: defaultState.releases.byId },
      {
        type: actions.setReleaseListState.type,
        payload: {
          ...defaultState.releases.releasesList,
          searchedIds: [
            'release-999',
            'release-998',
            'release-997',
            'release-996',
            'release-995',
            'release-994',
            'release-993',
            'release-992',
            'release-991',
            'release-990'
          ]
        }
      },
      { type: getReleases.fulfilled.type }
    ];
    await store.dispatch(getReleases({ perPage: 10, searchOnly: true, searchTerm: 'something' }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve the device installation base for an artifact', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getArtifactInstallCount.pending.type },
      {
        type: actions.receiveRelease.type,
        payload: {
          ...defaultState.releases.byId.r1,
          artifacts: [{ ...defaultState.releases.byId.r1.artifacts[0], installCount: 0 }]
        }
      },
      { type: getArtifactInstallCount.fulfilled.type }
    ];
    await store.dispatch(getArtifactInstallCount('art1')).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).toEqual(expectedActions.length);
      expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
    });
  });
  it('should retrieve the download url for an artifact', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getArtifactUrl.pending.type },
      {
        type: actions.receiveRelease.type,
        payload: {
          ...defaultState.releases.byId.r1,
          artifacts: [
            {
              ...defaultState.releases.byId.r1.artifacts[0],
              url: 'https://testlocation.com/artifact.mender'
            }
          ]
        }
      },
      { type: getArtifactUrl.fulfilled.type }
    ];
    await store.dispatch(getArtifactUrl('art1')).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).toEqual(expectedActions.length);
      expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
    });
  });
  it('should select a release by name', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: selectRelease.pending.type },
      { type: actions.selectedRelease.type, payload: defaultState.releases.byId.r1.name },
      { type: getRelease.pending.type },
      { type: actions.receiveRelease.type, payload: defaultState.releases.byId.r1 },
      { type: getRelease.fulfilled.type },
      { type: selectRelease.fulfilled.type }
    ];
    await store.dispatch(selectRelease(defaultState.releases.byId.r1.name));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow creating an artifact', { timeout: 2 * TIMEOUTS.fiveSeconds }, async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: appActions.setSnackbar.type, payload: 'Generating artifact' },
      {
        type: appActions.initUpload.type,
        payload: {
          id: 'mock-uuid',
          upload: { cancelSource: mockAbortController, name: 'createdRelease', size: undefined, progress: 0 }
        }
      },
      { type: appActions.uploadProgress.type, payload: { id: 'mock-uuid', progress: 100 } },
      { type: actions.selectedRelease.type, payload: 'filethings' },
      { type: appActions.setSnackbar.type, payload: { message: 'Upload successful', autoHideDuration: 5000 } },
      { type: actions.receiveRelease.type, payload: defaultState.releases.byId.r1 },
      { type: actions.setReleaseListState.type, payload: { ...defaultState.releases.releasesList, releaseIds: retrievedReleaseIds, total: 5000 } },
      { type: appActions.cleanUpUpload.type, payload: 'mock-uuid' }
    ];
    await store.dispatch(
      createArtifact({
        file: { name: 'createdRelease', some: 'thing', someList: ['test', 'more'], complex: { objectThing: 'yes' } } as unknown as File,
        meta: { name: 'filethings', description: '' }
      })
    );
    vi.runAllTimers();
    const storeActions = store.getActions();
    expectedActions.forEach(expectedAction => {
      const handledAction = storeActions.some(storeAction => Object.keys(expectedAction).every(key => deepCompare(storeAction[key], expectedAction[key])));
      expect(handledAction, JSON.stringify(expectedAction)).toBeTruthy();
    });
  });
  it('should support editing artifact information', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: editArtifact.pending.type },
      {
        type: actions.receiveRelease.type,
        payload: {
          ...defaultState.releases.byId.r1,
          artifacts: [{ ...defaultState.releases.byId.r1.artifacts[0], description: 'something new' }]
        }
      },
      {
        type: appActions.setSnackbar.type,
        payload: { action: '', autoHideDuration: 5000, message: 'Artifact details were updated successfully.' }
      },
      { type: getReleases.pending.type },
      { type: selectRelease.pending.type },
      { type: actions.selectedRelease.type, payload: defaultState.releases.byId.r1.name },
      { type: getRelease.pending.type },
      { type: actions.receiveRelease.type, payload: defaultState.releases.byId.r1 },
      { type: actions.receiveRelease.type, payload: defaultState.releases.byId.r1 },
      { type: getReleases.fulfilled.type },
      { type: getRelease.fulfilled.type },
      { type: selectRelease.fulfilled.type },
      { type: editArtifact.fulfilled.type }
    ];
    await store.dispatch(editArtifact({ id: defaultState.releases.byId.r1.artifacts[0].id, body: { description: 'something new' } }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should support uploading .mender artifact files', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: uploadArtifact.pending.type },
      { type: appActions.setSnackbar.type, payload: 'Uploading artifact' },
      {
        type: appActions.initUpload.type,
        payload: { id: 'mock-uuid', upload: { cancelSource: mockAbortController, name: defaultState.releases.byId.r1.name, size: 1234, progress: 0 } }
      },
      { type: appActions.uploadProgress.type, payload: { id: 'mock-uuid', progress: 100 } },
      { type: appActions.setSnackbar.type, payload: { autoHideDuration: 5000, message: 'Upload successful' } },
      { type: getReleases.pending.type },
      { type: actions.receiveReleases.type, payload: defaultState.releases.byId },
      { type: actions.setReleaseListState.type, payload: { ...defaultState.releases.releasesList, releaseIds: retrievedReleaseIds, total: 5000 } },
      { type: getReleases.fulfilled.type },
      { type: appActions.cleanUpUpload.type, payload: 'mock-uuid' },
      { type: uploadArtifact.fulfilled.type }
    ];
    await store.dispatch(uploadArtifact({ file: mockFile, meta: { description: 'new artifact to upload' } }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should remove an artifact by name', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: removeArtifact.pending.type },
      { type: actions.removeRelease.type, payload: defaultState.releases.byId.r1.name },
      { type: setReleasesListState.pending.type },
      { type: getReleases.pending.type },
      { type: actions.setReleaseListState.type, payload: { ...defaultState.releases.releasesList, isLoading: true, releaseIds: [], total: 0 } },
      { type: actions.receiveReleases.type, payload: defaultState.releases.byId },
      { type: actions.setReleaseListState.type, payload: { ...defaultState.releases.releasesList, releaseIds: retrievedReleaseIds, total: 5000 } },
      { type: getReleases.fulfilled.type },
      { type: setReleasesListState.pending.type },
      { type: actions.setReleaseListState.type, payload: { ...defaultState.releases.releasesList } },
      { type: setReleasesListState.fulfilled.type },
      { type: setReleasesListState.fulfilled.type },
      { type: removeArtifact.fulfilled.type }
    ];
    await store.dispatch(removeArtifact('art1'));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should remove a release by name', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: removeRelease.pending.type },
      { type: removeArtifact.pending.type },
      { type: actions.removeRelease.type, payload: defaultState.releases.byId.r1.name },
      { type: setReleasesListState.pending.type },
      { type: getReleases.pending.type },
      { type: actions.setReleaseListState.type, payload: { ...defaultState.releases.releasesList, isLoading: true, releaseIds: [], total: 0 } },
      { type: actions.receiveReleases.type, payload: defaultState.releases.byId },
      { type: actions.setReleaseListState.type, payload: { ...defaultState.releases.releasesList, releaseIds: retrievedReleaseIds, total: 5000 } },
      { type: getReleases.fulfilled.type },
      { type: setReleasesListState.pending.type },
      { type: actions.setReleaseListState.type, payload: { ...defaultState.releases.releasesList } },
      { type: setReleasesListState.fulfilled.type },
      { type: setReleasesListState.fulfilled.type },
      { type: removeArtifact.fulfilled.type },
      { type: selectRelease.pending.type },
      { type: actions.selectedRelease.type, payload: null },
      { type: selectRelease.fulfilled.type },
      { type: removeRelease.fulfilled.type }
    ];
    await store.dispatch(removeRelease(defaultState.releases.byId.r1.name));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve existing release tags', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getExistingReleaseTags.pending.type },
      { type: getExistingSoftwareTags.pending.type },
      { type: getExistingSoftwareTags.fulfilled.type },
      { type: actions.receiveReleaseTags.type, payload: ['foo', 'bar'] },
      { type: getExistingReleaseTags.fulfilled.type }
    ];
    await store.dispatch(getExistingReleaseTags());
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve existing update types', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getUpdateTypes.pending.type },
      { type: actions.receiveReleaseTypes.type, payload: ['single-file', 'not-this'] },
      { type: getUpdateTypes.fulfilled.type }
    ];
    await store.dispatch(getUpdateTypes());
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow setting new release tags', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: setReleaseTags.pending.type },
      { type: setSingleReleaseTags.pending.type },
      {
        type: actions.receiveRelease.type,
        payload: { ...defaultState.releases.byId.r1, tags: ['foo', 'bar'] }
      },
      { type: setSingleReleaseTags.fulfilled.type },
      { type: appActions.setSnackbar.type, payload: { action: '', autoHideDuration: 5000, message: 'Release tags were set successfully.' } },
      { type: setReleaseTags.fulfilled.type }
    ];
    await store.dispatch(setReleaseTags({ name: defaultState.releases.byId.r1.name, tags: ['foo', 'bar'] }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should allow extending the release info', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: updateReleaseInfo.pending.type },
      {
        type: actions.receiveRelease.type,
        payload: { ...defaultState.releases.byId.r1, notes: 'this & that' }
      },
      {
        type: appActions.setSnackbar.type,
        payload: { action: '', autoHideDuration: 5000, message: 'Release details were updated successfully.' }
      },
      { type: updateReleaseInfo.fulfilled.type }
    ];
    await store.dispatch(updateReleaseInfo({ name: defaultState.releases.byId.r1.name, info: { notes: 'this & that' } }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should clear selection when page or sort changes', async () => {
    const store = mockStore({
      ...defaultState,
      releases: { ...defaultState.releases, releasesList: { ...defaultState.releases.releasesList, selection: [0, 1, 2] } }
    });
    await store.dispatch(setReleasesListState({ page: 2 }));
    const storeActions = store.getActions();
    expect(storeActions).toContainEqual(
      expect.objectContaining({ type: actions.setReleaseListState.type, payload: expect.objectContaining({ selection: [] }) })
    );
  });
  it('should not clear selection when searchOnly is true', async () => {
    const store = mockStore({
      ...defaultState,
      releases: { ...defaultState.releases, releasesList: { ...defaultState.releases.releasesList, selection: [0, 1] } }
    });
    await store.dispatch(setReleasesListState({ page: 2, searchOnly: true }));
    const storeActions = store.getActions();
    expect(storeActions).toContainEqual(
      expect.objectContaining({ type: actions.setReleaseListState.type, payload: expect.objectContaining({ selection: [0, 1] }) })
    );
  });
});

const retrievedManifestIds = [
  'm1',
  'm10',
  'm11',
  'm12',
  'm13',
  'm14',
  'm15',
  'm16',
  'm17',
  'm18',
  'm19',
  'm2',
  'm20',
  'm3',
  'm4',
  'm5',
  'm6',
  'm7',
  'm8',
  'm9'
];

describe('manifest actions', () => {
  it('should retrieve existing software tags', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getExistingSoftwareTags.pending.type },
      { type: actions.receiveSoftwareTags.type, payload: ['foo', 'bar', 'manifest-tag-1', 'manifest-tag-2'] },
      { type: getExistingSoftwareTags.fulfilled.type }
    ];
    await store.dispatch(getExistingSoftwareTags());
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve software tags filtered by kind', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [{ type: getExistingSoftwareTags.pending.type }, { type: getExistingSoftwareTags.fulfilled.type }];
    const tags = await store.dispatch(getExistingSoftwareTags('manifest')).unwrap();
    expect(tags).toEqual(['manifest-tag-1', 'manifest-tag-2']);
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve a single manifest by name', async () => {
    const store = mockStore({ ...defaultState });
    store.clearActions();
    const expectedActions = [
      { type: getManifest.pending.type },
      { type: actions.receiveManifest.type, payload: defaultState.releases.manifestsById.m1000 },
      { type: getManifest.fulfilled.type }
    ];
    await store.dispatch(getManifest(defaultState.releases.manifestsById.m1000.name));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve a list of manifests', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getManifests.pending.type },
      { type: actions.receiveManifests.type, payload: defaultState.releases.manifestsById },
      {
        type: actions.setManifestsListState.type,
        payload: { ...defaultState.releases.manifestsList, manifestIds: ['m1000'], total: 1000 }
      },
      { type: getManifests.fulfilled.type }
    ];
    await store.dispatch(getManifests({ perPage: 1, sort: { direction: 'desc', key: 'modified' } }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve a search filtered list of manifests', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getManifests.pending.type },
      { type: actions.receiveManifests.type, payload: defaultState.releases.manifestsById },
      {
        type: actions.setManifestsListState.type,
        payload: {
          ...defaultState.releases.manifestsList,
          manifestIds: retrievedManifestIds,
          searchTotal: 1234
        }
      },
      { type: getManifests.fulfilled.type }
    ];
    await store.dispatch(getManifests({ searchTerm: 'something' }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve a tag filtered list of manifests', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getManifests.pending.type },
      { type: actions.receiveManifests.type, payload: defaultState.releases.manifestsById },
      { type: actions.setManifestsListState.type, payload: { ...defaultState.releases.manifestsList, manifestIds: retrievedManifestIds, searchTotal: 1234 } },
      { type: getManifests.fulfilled.type }
    ];
    await store.dispatch(getManifests({ selectedTags: ['some-tag'] }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should select a manifest by name', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: selectManifest.pending.type },
      { type: actions.selectedManifest.type, payload: defaultState.releases.manifestsById.m1000.name },
      { type: getManifest.pending.type },
      { type: actions.receiveManifest.type, payload: defaultState.releases.manifestsById.m1000 },
      { type: getManifest.fulfilled.type },
      { type: selectManifest.fulfilled.type }
    ];
    await store.dispatch(selectManifest(defaultState.releases.manifestsById.m1000.name));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should clear selection when manifest list page or sort changes', async () => {
    const store = mockStore({
      ...defaultState,
      releases: { ...defaultState.releases, manifestsList: { ...defaultState.releases.manifestsList, selection: [0, 1, 2] } }
    });
    await store.dispatch(setManifestsListState({ page: 2 }));
    const storeActions = store.getActions();
    expect(storeActions).toContainEqual(
      expect.objectContaining({ type: actions.setManifestsListState.type, payload: expect.objectContaining({ selection: [] }) })
    );
  });
  it('should allow updating manifest info', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: updateManifestInfo.pending.type },
      { type: actions.receiveManifest.type, payload: { ...defaultState.releases.manifestsById.m1000, notes: 'new manifest notes' } },
      { type: appActions.setSnackbar.type, payload: 'Manifest details were updated successfully.' },
      { type: updateManifestInfo.fulfilled.type }
    ];
    await store.dispatch(updateManifestInfo({ name: defaultState.releases.manifestsById.m1000.name, info: { notes: 'new manifest notes' } }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should support uploading manifest artifacts', async () => {
    const store = mockStore({ ...defaultState });
    const mockFile = { name: 'test-manifest.mender', size: 1234 } as File;
    const expectedActions = [
      { type: uploadManifest.pending.type },
      {
        type: appActions.initUpload.type,
        payload: { id: 'mock-uuid', upload: { cancelSource: mockAbortController, name: 'test-manifest.mender', size: 1234, progress: 0 } }
      },
      { type: appActions.uploadProgress.type, payload: { id: 'mock-uuid', progress: 100 } },
      { type: appActions.setSnackbar.type, payload: { autoHideDuration: 5000, message: 'Upload successful' } },
      { type: getManifests.pending.type },
      { type: appActions.cleanUpUpload.type, payload: 'mock-uuid' }
    ];
    await store.dispatch(uploadManifest({ file: mockFile, meta: { description: 'test manifest' } }));
    const storeActions = store.getActions();
    expectedActions.forEach(expectedAction => {
      const handledAction = storeActions.some(storeAction => Object.keys(expectedAction).every(key => deepCompare(storeAction[key], expectedAction[key])));
      expect(handledAction, JSON.stringify(expectedAction)).toBeTruthy();
    });
  });
  it('should support generating manifest artifacts', { timeout: 2 * TIMEOUTS.fiveSeconds }, async () => {
    const store = mockStore({ ...defaultState });
    const mockFile = { name: 'manifest.yaml', size: 567 } as File;
    const expectedActions = [
      {
        type: appActions.initUpload.type,
        payload: { id: 'mock-uuid', upload: { cancelSource: mockAbortController, name: 'manifest.yaml', size: 567, progress: 0 } }
      },
      { type: appActions.uploadProgress.type, payload: { id: 'mock-uuid', progress: 100 } },
      { type: appActions.setSnackbar.type, payload: { message: 'Upload successful', autoHideDuration: 5000 } },
      { type: getManifests.pending.type },
      { type: appActions.cleanUpUpload.type, payload: 'mock-uuid' }
    ];
    await store.dispatch(generateManifest({ file: mockFile, meta: { description: 'test', tags: ['foo'] } }));
    vi.runAllTimers();
    const storeActions = store.getActions();
    expectedActions.forEach(expectedAction => {
      const handledAction = storeActions.some(storeAction => Object.keys(expectedAction).every(key => deepCompare(storeAction[key], expectedAction[key])));
      expect(handledAction, JSON.stringify(expectedAction)).toBeTruthy();
    });
  });
  it('should remove a single manifest by name', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: removeManifest.pending.type },
      { type: removeManifests.pending.type },
      { type: actions.removeManifests.type, payload: ['m1'] },
      { type: selectManifest.pending.type },
      { type: actions.selectedManifest.type, payload: null },
      { type: selectManifest.fulfilled.type },
      { type: removeManifests.fulfilled.type },
      { type: getManifests.pending.type },
      { type: removeManifest.fulfilled.type }
    ];
    await store.dispatch(removeManifest('m1'));
    const storeActions = store.getActions();
    expectedActions.forEach(expectedAction => {
      const handledAction = storeActions.some(storeAction => Object.keys(expectedAction).every(key => deepCompare(storeAction[key], expectedAction[key])));
      expect(handledAction, JSON.stringify(expectedAction)).toBeTruthy();
    });
  });
  it('should remove multiple manifests by name', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: removeManifests.pending.type },
      { type: actions.removeManifests.type, payload: ['m1', 'm2'] },
      { type: appActions.setSnackbar.type, payload: { action: '', autoHideDuration: 5000, message: 'Manifests deleted successfully.' } },
      { type: selectManifest.pending.type },
      { type: actions.selectedManifest.type, payload: null },
      { type: selectManifest.fulfilled.type },
      { type: getManifests.pending.type },
      { type: removeManifests.fulfilled.type }
    ];
    await store.dispatch(removeManifests(['m1', 'm2']));
    const storeActions = store.getActions();
    expectedActions.forEach(expectedAction => {
      const handledAction = storeActions.some(storeAction => Object.keys(expectedAction).every(key => deepCompare(storeAction[key], expectedAction[key])));
      expect(handledAction, JSON.stringify(expectedAction)).toBeTruthy();
    });
  });
});

const retrievedSoftwareIds = [
  'release-500',
  'release-499',
  'release-498',
  'release-497',
  'release-496',
  'release-495',
  'release-494',
  'release-493',
  'release-492',
  'release-491',
  'release-490',
  'release-489',
  'release-488',
  'release-487',
  'release-486',
  'release-485',
  'release-484',
  'release-483',
  'release-482',
  'release-481'
];

describe('software actions', () => {
  it('should retrieve a list of software', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getSoftware.pending.type },
      { type: actions.receiveSoftwareItems.type, payload: defaultState.releases.softwareById },
      {
        type: actions.setSoftwareListState.type,
        payload: { ...defaultState.releases.softwareList, softwareIds: ['release-500'], total: 1000 }
      },
      { type: getSoftware.fulfilled.type }
    ];
    await store.dispatch(getSoftware({ perPage: 1, sort: { direction: 'desc', key: 'modified' } }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve a search filtered list of software', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getSoftware.pending.type },
      { type: actions.receiveSoftwareItems.type, payload: defaultState.releases.softwareById },
      {
        type: actions.setSoftwareListState.type,
        payload: {
          ...defaultState.releases.softwareList,
          softwareIds: retrievedSoftwareIds,
          searchTotal: 500
        }
      },
      { type: getSoftware.fulfilled.type }
    ];
    await store.dispatch(getSoftware({ searchTerm: 'release' }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve a tag filtered list of software', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getSoftware.pending.type },
      { type: actions.receiveSoftwareItems.type, payload: defaultState.releases.softwareById },
      {
        type: actions.setSoftwareListState.type,
        payload: {
          ...defaultState.releases.softwareList,
          softwareIds: ['release-5', 'release-4', 'release-3', 'release-2', 'release-1', 'm3', 'm2', 'm1'],
          searchTotal: 8
        }
      },
      { type: getSoftware.fulfilled.type }
    ];
    await store.dispatch(getSoftware({ selectedTags: ['some-tag'] }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve a type filtered list of software', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getSoftware.pending.type },
      { type: actions.receiveSoftwareItems.type, payload: defaultState.releases.softwareById },
      {
        type: actions.setSoftwareListState.type,
        payload: {
          ...defaultState.releases.softwareList,
          softwareIds: ['release-5', 'release-4', 'release-3', 'release-2', 'release-1', 'm2', 'm1'],
          searchTotal: 7
        }
      },
      { type: getSoftware.fulfilled.type }
    ];
    await store.dispatch(getSoftware({ type: 'single-file' }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should retrieve a kind filtered list of software', async () => {
    const store = mockStore({ ...defaultState });
    const expectedActions = [
      { type: getSoftware.pending.type },
      { type: actions.receiveSoftwareItems.type, payload: defaultState.releases.softwareById },
      {
        type: actions.setSoftwareListState.type,
        payload: { ...defaultState.releases.softwareList, softwareIds: retrievedSoftwareIds, searchTotal: 500 }
      },
      { type: getSoftware.fulfilled.type }
    ];
    await store.dispatch(getSoftware({ kind: 'release' }));
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(expectedActions.length);
    expectedActions.forEach((action, index) => expect(storeActions[index]).toMatchObject(action));
  });
  it('should update software list state and trigger fetch on change', async () => {
    const store = mockStore({ ...defaultState });
    await store.dispatch(setSoftwareListState({ page: 2 }));
    const storeActions = store.getActions();
    expect(storeActions).toContainEqual(expect.objectContaining({ type: setSoftwareListState.pending.type }));
    expect(storeActions).toContainEqual(expect.objectContaining({ type: actions.setSoftwareListState.type, payload: expect.objectContaining({ page: 2 }) }));
  });
  it('should check which releases exist', async () => {
    const store = mockStore({ ...defaultState });
    const result = await store.dispatch(checkReleasesExistence(['release-1', 'nonexistent'])).unwrap();
    expect(result).toEqual({ 'release-1': true, nonexistent: false });
  });
});
