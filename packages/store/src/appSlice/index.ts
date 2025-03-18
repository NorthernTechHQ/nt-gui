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
import type { SnackbarProps } from '@mui/material';

import { SORTING_OPTIONS } from '@northern.tech/store/constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortOptions } from '../organizationSlice/types';

export const sliceName = 'app';

const getYesterday = () => {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  return today.toISOString();
};

type Repository = {
  name: string;
  version: string;
};

export type ReleaseVersion = {
  release: string;
  release_date: string;
  repos: Repository[];
};

export type VersionRelease = {
  [key: string]: ReleaseVersion | string;
  supported_until: string;
};

export type SaasVersion = {
  date: string;
  tag: string;
};

export type ReleaseData = {
  lts: string[];
  releases: {
    [version: string]: VersionRelease;
  };
  saas: SaasVersion[];
};
export type TagData = { name: string }[];

export interface SnackbarContent extends Pick<SnackbarProps, 'action' | 'autoHideDuration' | 'message' | 'open'> {
  preventClickToCopy?: boolean;
}

export interface SearchState {
  deviceIds: string[];
  isSearching: boolean;
  searchTerm: string;
  searchTotal: number;
  sort: SortOptions;
}

export interface Upload {
  cancelSource: any;
  progress: number;
  uploading: boolean;
}

type UILatestRelease = {
  releaseDate: string;
  repos: Record<string, string>;
};

type VersionInformation = {
  [key: string]: string | UILatestRelease | undefined;
  backend?: string;
  GUI?: string;
  latestRelease?: UILatestRelease;
};

type AppSliceType = {
  cancelSource: any;
  demoArtifactLink: string;
  docsVersion: string;
  features: Record<string, boolean>;
  feedbackProbability: number;
  firstLoginAfterSignup: boolean;
  hostAddress: string | null;
  hostedAnnouncement: string;
  newThreshold: string;
  offlineThreshold: string;
  recaptchaSiteKey: string;
  searchState: SearchState;
  snackbar: SnackbarContent;
  stripeAPIKey: string;
  trackerCode: string;
  uploadsById: Record<string, Upload>;
  versionInformation: VersionInformation;
  yesterday?: string;
};

export const initialState: AppSliceType = {
  cancelSource: undefined,
  demoArtifactLink: 'https://dgsbl4vditpls.cloudfront.net/mender-demo-artifact.mender',
  hostAddress: null,
  snackbar: {
    action: undefined,
    autoHideDuration: undefined,
    message: '',
    open: false,
    preventClickToCopy: false
  },
  // return boolean rather than organization details
  features: {
    hasAuditlogs: false,
    hasDeltaProgress: false,
    hasMultitenancy: false,
    hasDeviceConfig: false,
    hasDeviceConnect: false,
    hasFeedbackEnabled: false,
    hasMonitor: false,
    hasReporting: false,
    isDemoMode: false,
    isHosted: false,
    isEnterprise: false
  },
  feedbackProbability: 0.3,
  firstLoginAfterSignup: false,
  hostedAnnouncement: '',
  docsVersion: '',
  recaptchaSiteKey: '',
  searchState: {
    deviceIds: [],
    searchTerm: '',
    searchTotal: 0,
    isSearching: false,
    sort: {
      direction: SORTING_OPTIONS.desc
      // key: null,
      // scope: null
    }
  },
  stripeAPIKey: '',
  trackerCode: '',
  uploadsById: {
    // id: { uploading: false, progress: 0, cancelSource: undefined }
  },
  newThreshold: getYesterday(),
  offlineThreshold: getYesterday(),
  versionInformation: {
    Integration: '',
    'Mender-Client': '',
    'Mender-Artifact': '',
    'Meta-Mender': ''
  },
  yesterday: undefined
};

export const appSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFeatures: (state, action) => {
      state.features = {
        ...state.features,
        ...action.payload
      };
    },
    setSnackbar: (state, { payload }: PayloadAction<SnackbarContent | string>) => {
      const isString = typeof payload === 'string';

      const message = isString ? payload : payload.message;
      const autoHideDuration = isString ? undefined : payload.autoHideDuration;
      const action = isString ? undefined : payload.action;
      const preventClickToCopy = isString ? false : (payload.preventClickToCopy ?? false);

      state.snackbar = {
        message,
        autoHideDuration,
        action,
        preventClickToCopy,
        open: !!message
      };
    },
    setFirstLoginAfterSignup: (state, action) => {
      state.firstLoginAfterSignup = action.payload;
    },
    setAnnouncement: (state, action) => {
      state.hostedAnnouncement = action.payload;
    },
    setSearchState: (state, action) => {
      state.searchState = {
        ...state.searchState,
        ...action.payload
      };
    },
    setOfflineThreshold: (state, action) => {
      state.offlineThreshold = action.payload;
    },
    initUpload: (state, action) => {
      const { id, upload } = action.payload;
      state.uploadsById[id] = upload;
    },
    uploadProgress: (state, action) => {
      const { id, progress } = action.payload;
      state.uploadsById[id] = {
        ...state.uploadsById[id],
        progress
      };
    },
    cleanUpUpload: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.payload]: current, ...remainder } = state.uploadsById;
      state.uploadsById = remainder;
    },
    setVersionInformation: (state, action) => {
      state.versionInformation = {
        ...state.versionInformation,
        ...action.payload
      };
    },
    setEnvironmentData: (state, action) => ({ ...state, ...action.payload })
  }
});

export const actions = appSlice.actions;
export default appSlice.reducer;
