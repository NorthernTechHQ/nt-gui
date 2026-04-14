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
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import { extractErrorMessage, preformatWithRequestID } from '@northern.tech/utils/helpers';
import type { Middleware, Reducer, UnknownAction } from '@reduxjs/toolkit';
import { combineReducers, configureStore, createAsyncThunk, isRejected } from '@reduxjs/toolkit';
import { createReduxEnhancer } from '@sentry/react';

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
import userSlice, { actions as userActions } from './usersSlice';

const { setSnackbar, uploadProgress } = actions;

// exclude 'pendings-redirect' since this is expected to persist refreshes - the rest should be better to be redone
const keys = ['sessionDeploymentChecker', settingsKeys.initialized];
const resetEnvironment = (): void => keys.forEach(key => window.sessionStorage.removeItem(key));

resetEnvironment();

export type { ErrorWithResponse } from './utils';

export type MenderEnvironment = {
  [key: string]: unknown;
  demoArtifactPort?: string | number;
  disableOnboarding?: string;
  features: Record<string, string>;
  integrationVersion: string;
  menderArtifactVersion: string;
  metaMenderVersion: string;
  sentry?: { isReduxEnabled?: string | boolean };
};

declare global {
  interface Window {
    mender_environment?: MenderEnvironment;
  }
}

export const commonErrorFallback = 'Please check your connection.';
export const commonErrorHandler = (
  err: { message?: string; response?: { data?: unknown } },
  errorContext: string,
  dispatch: AppDispatch,
  fallback?: string,
  mightBeAuthRelated = false
): Promise<never> => {
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

type RootReducerState = ReturnType<typeof rootReducer>;

const sessionReducerImpl: Reducer<RootReducerState | undefined, UnknownAction> = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return rootReducer(state, action);
};
// Export for testing; cast to RootReducerState since undefined always falls through to initial slice states
export const sessionReducer = sessionReducerImpl as Reducer<RootReducerState>;

const rejectionLoggerMiddleware: Middleware = () => next => action => {
  if (isRejected(action)) {
    console.error('Rejection in action:', action);
    if (action.error) {
      console.error(action.error.stack);
    }
  }
  return next(action);
};

const tracingActionIgnoreList = [userActions.successfullyLoggedIn.type, 'users/loginUser/pending', 'users/loginUser/fulfilled', 'users/loginUser/rejected'];

const sentryReduxEnhancer = createReduxEnhancer({
  actionTransformer: (action: UnknownAction) => {
    if (tracingActionIgnoreList.includes(action.type as string)) {
      return null;
    }
    return action;
  },
  // Transform the state to remove sensitive information
  stateTransformer: (state: RootState) => {
    const transformedState = {
      ...state,
      users: { ...state.users, currentSession: null },
      organization: {
        ...state.organization,
        organization: {
          ...state.organization.organization,
          tenant_token: null
        }
      }
    };
    return transformedState;
  }
});

export const getConfiguredStore = (options: { [key: string]: unknown; preloadedState?: Partial<RootReducerState> } = {}) => {
  const { preloadedState, ...config } = options;
  return configureStore({
    ...config,
    preloadedState: preloadedState as RootReducerState,
    enhancers: getDefaultEnhancers => {
      // rely on the plain injected env object, as we're initializing the store only here
      if (window.mender_environment?.sentry?.isReduxEnabled) {
        return getDefaultEnhancers().concat(sentryReduxEnhancer);
      }
      return getDefaultEnhancers();
    },
    reducer: sessionReducer,
    // @ts-expect-error - GetDefaultMiddleware type mismatch between @reduxjs/toolkit and @sentry/react
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: {
          ignoredPaths: ['app.uploadsById']
        },
        serializableCheck: {
          ignoredActions: [organizationActions.receiveExternalDeviceIntegrations.type, uploadProgress.type],
          ignoredActionPaths: ['uploads', /payload\..*$/, 'meta.arg.file', 'meta.arg.integration.configHint'],
          ignoredPaths: ['app.uploadsById', 'organization.externalDeviceIntegrations']
        }
      }).concat(rejectionLoggerMiddleware)
  });
};
export const store = getConfiguredStore({
  preloadedState: {}
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: RootState;
}>();
