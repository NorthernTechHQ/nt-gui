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
// @ts-nocheck
import { useDispatch } from 'react-redux';

import { extractErrorMessage, preformatWithRequestID } from '@northern.tech/utils/helpers';
import { combineReducers, configureStore, createAsyncThunk } from '@reduxjs/toolkit';

import actions from './actions';
import appSlice from './appSlice';
import { getToken } from './auth';
import { USER_LOGOUT, settingsKeys } from './constants';
import deploymentSlice from './deploymentsSlice';
import deviceSlice from './devicesSlice';
import monitorSlice from './monitorSlice';
import onboardingSlice from './onboardingSlice';
import organizationSlice, { actions as organizationActions } from './organizationSlice';
import releaseSlice from './releasesSlice';
import userSlice from './usersSlice';

const { setSnackbar, uploadProgress } = actions;

// exclude 'pendings-redirect' since this is expected to persist refreshes - the rest should be better to be redone
const keys = ['sessionDeploymentChecker', settingsKeys.initialized];
const resetEnvironment = () => keys.forEach(key => window.sessionStorage.removeItem(key));

resetEnvironment();

export const commonErrorFallback = 'Please check your connection.';
export const commonErrorHandler = (err, errorContext, dispatch, fallback?: string, mightBeAuthRelated = false): Promise<never> => {
  const errMsg = extractErrorMessage(err, fallback);
  if (mightBeAuthRelated || getToken()) {
    dispatch(setSnackbar({ message: preformatWithRequestID(err.response, `${errorContext} ${errMsg}`), action: 'Copy to clipboard' }));
  }
  return Promise.reject(err);
};

const rootReducer = combineReducers({
  app: appSlice,
  devices: deviceSlice,
  deployments: deploymentSlice,
  monitor: monitorSlice,
  onboarding: onboardingSlice,
  organization: organizationSlice,
  releases: releaseSlice,
  users: userSlice
});

export const sessionReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return rootReducer(state, action);
};

const rejectionLoggerMiddleware = () => next => action => {
  if (action.type.endsWith('/rejected')) {
    const { error } = action;
    console.error('Rejection in action:', action);
    console.error(error.stack);
  }
  return next(action);
};

export const getConfiguredStore = (options = {}) => {
  const { preloadedState = {}, ...config } = options;
  return configureStore({
    ...config,
    preloadedState,
    reducer: sessionReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: {
          ignoredPaths: ['app.uploadsById']
        },
        serializableCheck: {
          ignoredActions: [organizationActions.receiveExternalDeviceIntegrations.name, setSnackbar.name, uploadProgress.name],
          ignoredActionPaths: ['uploads', 'snackbar', /payload\..*$/],
          ignoredPaths: ['app.uploadsById', 'app.snackbar', 'organization.externalDeviceIntegrations']
        }
      }).concat(rejectionLoggerMiddleware)
  });
};
export const store = getConfiguredStore({
  preloadedState: {}
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: RootState;
}>();
