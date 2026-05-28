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
import { deepCompare } from '@northern.tech/utils/helpers';
import Cookies from 'universal-cookie';

import type { SearchState } from '.';
import { actions, sliceName } from '.';
import { getOfflineThresholdSettings } from '../selectors';
import type { AppDispatch } from '../store';
import { createAppAsyncThunk } from '../store';
import { searchDevices } from '../thunks';
import { getSearchState } from './selectors';

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
export const setOfflineThreshold = createAppAsyncThunk(`${sliceName}/setOfflineThreshold`, async (_, { dispatch, getState }) => {
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
    dispatch(actions.setSnackbar('There was an error saving the offline threshold, please check your settings.'));
    return;
  }
  return dispatch(actions.setOfflineThreshold(value));
});

export const setSearchState = createAppAsyncThunk(`${sliceName}/setSearchState`, (searchState: Partial<SearchState>, { dispatch, getState }) => {
  const currentState = getSearchState(getState());
  const nextState = {
    ...currentState,
    ...searchState,
    sort: {
      ...currentState.sort,
      ...searchState.sort
    }
  };
  const tasks: Promise<ReturnType<AppDispatch> | unknown>[] = [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isSearching: currentSearching, deviceIds: currentDevices, searchTotal: currentTotal, ...currentRequestState } = currentState;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isSearching: nextSearching, deviceIds: nextDevices, searchTotal: nextTotal, ...nextRequestState } = nextState;
  if (nextRequestState.searchTerm && !deepCompare(currentRequestState, nextRequestState)) {
    nextState.isSearching = true;
    tasks.push(
      dispatch(searchDevices(nextState))
        .unwrap()
        .then(searchResult => dispatch(actions.setSearchState({ ...searchResult, isSearching: false })))
        .catch(() => dispatch(actions.setSearchState({ isSearching: false, searchTotal: 0 })))
    );
  }
  tasks.push(Promise.resolve(dispatch(actions.setSearchState(nextState))));
  return Promise.all(tasks);
});
