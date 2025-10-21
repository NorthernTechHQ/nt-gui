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
import type {
  ArtifactV1 as BackendArtifactV1,
  ArtifactV2 as BackendArtifactV2,
  ReleaseV1 as BackendReleaseV1,
  ReleaseV2 as BackendReleaseV2,
  Update as BackendUpdate
} from '@northern.tech/types/MenderTypes';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { DEVICE_LIST_DEFAULTS, SORTING_OPTIONS } from '../constants';
import type { SortOptions } from '../constants';

type Update = Omit<BackendUpdate, 'meta_data'>;
export type Artifact = Omit<BackendArtifactV1, 'updates'> &
  Omit<BackendArtifactV2, 'updates'> & { installCount?: number; updates?: Array<Update>; url?: string };
export type Release = BackendReleaseV1 & BackendReleaseV2 & { artifacts: Artifact[]; device_types_compatible: string[]; name: string };

export const sliceName = 'releases';

// TODO: restore this once delta job related types are restored in specs
// type EnhancedJobDetailsItem = DeltaJobDetailsItem & DeltaJobsListItem;

export type ReleasesList = {
  isLoading?: boolean;
  page: number;
  perPage: number;
  releaseIds: string[];
  searchedIds: string[];
  searchOnly?: boolean;
  searchTerm: string;
  searchTotal: number;
  selectedTags: string[];
  selection: number[];
  sort?: SortOptions;
  tab?: 'releases' | 'delta';
  total: number;
  type: string;
};

export type ReleaseSliceType = {
  artifacts: never[];
  byId: Record<string, Release>;
  deltaJobs: Record<string, any>;
  deltaJobsList: {
    jobIds: string[];
    page: number;
    perPage: number;
    sort?: SortOptions;
    total: 0;
  };
  releasesList: ReleasesList;
  selectedJob: string | null;
  selectedRelease: string | null;
  tags: string[];
  updateTypes: string[];
};

export const initialState: ReleaseSliceType = {
  /*
   * Return list of saved artifacts objects
   */
  /*
   * return list of artifacts where duplicate names are collated with device compatibility lists combined
   */
  // artifacts: AppStore.getCollatedArtifacts(AppStore.getArtifactsRepo()),
  artifacts: [],
  /*
   * Return list of saved release objects
   */
  byId: {
    /*
    [releaseName]: {
      artifacts: [
        {
          id: '',
          name: '',
          description: '',
          device_types_compatible: [],
          ...
          updates: [{
            files: [
              { size: 123, name: '' }
            ],
            type_info: { type: '' }
          }],
          url: '' // optional
        }
      ],
      modified: ''
      device_types_compatible,
      name: '',
      tags: ['something'],
      notes: ''
    }
    */
  },
  deltaJobs: {
    /*
      [jobId]: {
        id: '',
        ...
      }
      */
  },
  deltaJobsList: {
    ...DEVICE_LIST_DEFAULTS,
    jobIds: [],
    total: 0,
    sort: {
      direction: SORTING_OPTIONS.desc,
      key: 'started'
    }
  },
  releasesList: {
    ...DEVICE_LIST_DEFAULTS,
    searchedIds: [],
    releaseIds: [],
    selection: [],
    sort: {
      direction: SORTING_OPTIONS.desc,
      key: 'modified'
    },
    isLoading: undefined,
    searchTerm: '',
    searchTotal: 0,
    selectedTags: [],
    total: 0,
    type: ''
  },
  tags: [],
  updateTypes: [],
  selectedJob: null,
  /*
   * Return single release with corresponding Artifacts
   */
  selectedRelease: null
};

export const releaseSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    receiveRelease: (state, action: PayloadAction<Release>) => {
      const { name } = action.payload;
      state.byId[name] = action.payload;
    },
    receiveReleases: (state, action: PayloadAction<Record<string, Release>>) => {
      state.byId = action.payload;
    },
    receiveReleaseTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    receiveReleaseTypes: (state, action: PayloadAction<string[]>) => {
      state.updateTypes = action.payload;
    },
    removeRelease: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.payload]: toBeRemoved, ...byId } = state.byId;
      state.byId = byId;
      state.selectedRelease = action.payload === state.selectedRelease ? null : state.selectedRelease;
    },
    selectedRelease: (state, action: PayloadAction<string | null>) => {
      state.selectedRelease = action.payload;
    },
    setReleaseListState: (state, action) => {
      state.releasesList = action.payload;
    },
    receivedDeltaJobs: (state, action) => {
      const { jobs, total } = action.payload;
      state.deltaJobs = jobs.reduce(
        (accu, job) => {
          accu[job.id] = {
            ...accu[job.id],
            ...job
          };
          return accu;
        },
        { ...state.deltaJobs }
      );
      state.deltaJobsList.jobIds = jobs.map(job => job.id);
      state.deltaJobsList.total = total;
    },
    receivedDeltaJobDetails: (state, action) => {
      const job = action.payload;
      state.deltaJobs[job.id] = {
        ...state.deltaJobs[job.id],
        ...job
      };
    },
    setDeltaJobsListState: (state, action) => {
      state.deltaJobsList = { ...state.deltaJobsList, ...action.payload };
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    }
  }
});

export const actions = releaseSlice.actions;
export default releaseSlice.reducer;
