// Copyright 2023 Northern.tech AS
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
import { createSelector } from '@reduxjs/toolkit';

import type { AppSliceType } from '.';

export type AppState = { app: AppSliceType };

export const getDocsVersion = (state: AppState) => state.app.docsVersion;
export const getFeatures = (state: AppState) => state.app.features;
export const getVersionInformation = (state: AppState) => state.app.versionInformation;
export const getSearchState = (state: AppState) => state.app.searchState;
export const getUploads = (state: AppState) => state.app.uploadsById;
export const getSnackbar = (state: AppState) => state.app.snackbar;
export const getHostAddress = (state: AppState) => state.app.hostAddress;
export const getHostedAnnouncement = (state: AppState) => state.app.hostedAnnouncement;
export const getRecaptchaKey = (state: AppState) => state.app.recaptchaSiteKey;
export const getStripeKey = (state: AppState) => state.app.stripeAPIKey;
export const getTrackerCode = (state: AppState) => state.app.trackerCode;
export const getSentryConfig = (state: AppState) => state.app.sentry;
export const getCommit = (state: AppState) => state.app.commit;
export const getIsFirstLogin = (state: AppState) => state.app.firstLoginAfterSignup;
export const getFeedbackProbability = (state: AppState) => state.app.feedbackProbability;
export const getAppInitDone = (state: AppState) => state.app.appInitDone;

export const getIsUploading = createSelector([getUploads], uploadsById => !!Object.keys(uploadsById).length);
export const getSearchedDevices = createSelector([getSearchState], ({ deviceIds }) => deviceIds);

export const getIsPreview = createSelector([getVersionInformation], ({ version }) => version === 'next');
