// Copyright 2025 Northern.tech AS
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
import { DEVICE_LIST_DEFAULTS, SORTING_OPTIONS } from '../constants';
import { initialState } from './index';

const deviceTypes = { qemu: 'qemux86-64' };

export const mockState = {
  ...initialState,
  byId: {
    r1: {
      name: 'r1',
      artifacts: [
        {
          id: 'art1',
          description: 'test description',
          device_types_compatible: [deviceTypes.qemu],
          modified: '2020-09-10T12:16:22.667Z',
          updates: [{ type_info: { type: 'testtype' } }],
          artifact_depends: {
            device_type: [deviceTypes.qemu]
          },
          artifact_provides: {
            artifact_name: 'myapp',
            'data-partition.myapp.version': 'v2020.10',
            list_of_fancy: [deviceTypes.qemu, 'x172']
          },
          clears_artifact_provides: ['data-partition.myapp.*']
        }
      ],
      device_types_compatible: [deviceTypes.qemu],
      modified: '2020-09-10T12:16:22.667Z',
      metaData: {}
    }
  },
  releasesList: {
    ...DEVICE_LIST_DEFAULTS,
    searchedIds: [],
    isLoading: false,
    releaseIds: ['r1'],
    selection: [],
    sort: {
      direction: SORTING_OPTIONS.desc,
      key: 'name'
    },
    searchTerm: '',
    searchTotal: 0,
    total: 1
  },
  manifestsById: {
    m1000: {
      name: 'm1000',
      modified: '2020-01-01T00:16:39.000Z',
      artifact: {
        id: 'art-m1000',
        name: 'm1000',
        description: 'test manifest description',
        device_types_compatible: [deviceTypes.qemu],
        modified: '2020-01-01T00:16:39.000Z'
      },
      manifest: {
        name: 'm1000',
        system_types_compatible: [deviceTypes.qemu],
        component_types: {
          'component-a': {
            artifact_name: 'art-m1000-component',
            update_strategy: { order: 10 }
          }
        }
      },
      tags: [],
      notes: ''
    }
  },
  manifestsList: {
    ...DEVICE_LIST_DEFAULTS,
    manifestIds: ['m1'],
    selection: [],
    sort: {
      direction: SORTING_OPTIONS.asc,
      key: 'name'
    },
    isLoading: false,
    searchTerm: '',
    searchTotal: 0,
    total: 1
  }
};
