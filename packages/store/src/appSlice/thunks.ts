// Copyright 2019 Northern.tech AS
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
import GeneralApi from '@northern.tech/store/api/general-api';
import { getOfflineThresholdSettings } from '@northern.tech/store/selectors';
import { createAppAsyncThunk } from '@northern.tech/store/store';
import { searchDevices } from '@northern.tech/store/thunks';
import { getComparisonCompatibleVersion } from '@northern.tech/store/utils';
import { deepCompare, extractErrorMessage } from '@northern.tech/utils/helpers';
import { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

import { ReleaseData, ReleaseVersion, SaasVersion, SearchState, TagData, VersionRelease, actions, sliceName } from '.';
import { getFeatures, getSearchState } from './selectors';

const cookies = new Cookies();

/*
  General
*/
export const setFirstLoginAfterSignup = createAppAsyncThunk<void, boolean>(`${sliceName}/setFirstLoginAfterSignup`, (firstLoginAfterSignup, { dispatch }) => {
  cookies.set('firstLoginAfterSignup', !!firstLoginAfterSignup, { maxAge: 60, path: '/', domain: '.mender.io', sameSite: false });
  dispatch(actions.setFirstLoginAfterSignup(!!firstLoginAfterSignup));
});

const dateFunctionMap = {
  getDays: 'getDate',
  setDays: 'setDate'
};
export const setOfflineThreshold = createAppAsyncThunk<Promise<PayloadAction<any>>, void>(`${sliceName}/setOfflineThreshold`, (_, { dispatch, getState }) => {
  const { interval, intervalUnit } = getOfflineThresholdSettings(getState());
  const today = new Date();
  const intervalName = `${intervalUnit.charAt(0).toUpperCase()}${intervalUnit.substring(1)}`;
  const setter = dateFunctionMap[`set${intervalName}`] ?? `set${intervalName}`;
  const getter = dateFunctionMap[`get${intervalName}`] ?? `get${intervalName}`;
  today[setter](today[getter]() - interval);
  let value: string;
  try {
    value = today.toISOString();
  } catch {
    return Promise.resolve(dispatch(actions.setSnackbar('There was an error saving the offline threshold, please check your settings.')));
  }
  return Promise.resolve(dispatch(actions.setOfflineThreshold(value)));
});

const versionRegex = new RegExp(/\d+\.\d+/);

const getLatestRelease = (obj: { [version: string]: VersionRelease }): ReleaseVersion => {
  const getRelease = ver => {
    const latestKey = Object.keys(ver)
      .filter(key => versionRegex.test(key))
      .sort()
      .reverse()[0];
    return ver[latestKey];
  };
  return getRelease(getRelease(obj));
};

const repoKeyMap = {
  integration: 'Integration',
  mender: 'Mender-Client',
  'mender-artifact': 'Mender-Artifact'
} as const;

const deductSaasState = (latestRelease: ReleaseVersion, guiTags: TagData, saasReleases: SaasVersion[]): string => {
  const latestGuiTag = guiTags.length ? guiTags[0].name : '';
  const latestSaasRelease = latestGuiTag.startsWith('saas-v') ? { date: latestGuiTag.split('-v')[1].replaceAll('.', '-'), tag: latestGuiTag } : saasReleases[0];
  return latestSaasRelease.date > latestRelease.release_date ? latestSaasRelease.tag : latestRelease.release;
};

export const getLatestReleaseInfo = createAppAsyncThunk(`${sliceName}/getLatestReleaseInfo`, (_, { dispatch, getState }) => {
  if (!getFeatures(getState()).isHosted) {
    return;
  }
  return Promise.all([GeneralApi.get<ReleaseData>('/versions.json'), GeneralApi.get<TagData>('/tags.json')])
    .then(([{ data }, { data: guiTags }]) => {
      if (!guiTags.length) {
        return;
      }
      const { releases, saas } = data;
      const latestRelease = getLatestRelease(releases);
      const { latestRepos, latestVersions } = latestRelease.repos.reduce(
        (accu, item) => {
          if (repoKeyMap[item.name]) {
            accu.latestVersions[repoKeyMap[item.name]] = getComparisonCompatibleVersion(item.version);
          }
          accu.latestRepos[item.name] = getComparisonCompatibleVersion(item.version);
          return accu;
        },
        { latestVersions: { ...getState().app.versionInformation }, latestRepos: {} }
      );
      const info = deductSaasState(latestRelease, guiTags, saas);
      dispatch(
        actions.setVersionInformation({
          ...latestVersions,
          backend: info,
          GUI: info,
          latestRelease: {
            releaseDate: latestRelease.release_date,
            repos: latestRepos
          }
        })
      );
    })
    .catch(err => {
      console.log('init error:', extractErrorMessage(err));
    });
});

export const setSearchState = createAppAsyncThunk<Promise<PayloadAction> | void, Partial<SearchState>>(
  `${sliceName}/setSearchState`,
  (searchState, { dispatch, getState }) => {
    const currentState = getSearchState(getState());
    let nextState = {
      ...currentState,
      ...searchState,
      sort: {
        ...currentState.sort,
        ...searchState.sort
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isSearching: currentSearching, deviceIds: currentDevices, searchTotal: currentTotal, ...currentRequestState } = currentState;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isSearching: nextSearching, deviceIds: nextDevices, searchTotal: nextTotal, ...nextRequestState } = nextState;
    //TODO: remove once deepCompare is typed
    // @ts-ignore
    if (nextRequestState.searchTerm && !deepCompare(currentRequestState, nextRequestState)) {
      nextState.isSearching = true;
      dispatch(actions.setSearchState(nextState));
      //TODO: remove once deviceSlice is typed
      // @ts-ignore
      return dispatch(searchDevices(nextState))
        .unwrap()
        .then(results => {
          const searchResult = results[results.length - 1];
          return dispatch(actions.setSearchState({ ...searchResult, isSearching: false }));
        })
        .catch(() => dispatch(actions.setSearchState({ isSearching: false, searchTotal: 0 })));
    }
  }
);
