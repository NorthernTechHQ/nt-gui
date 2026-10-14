// Copyright 2026 Northern.tech AS
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
import { mockState as appMockState } from './appSlice/mocks';
import { mockState as deploymentsMockState } from './deploymentsSlice/mocks';
import { mockState as devicesMockState } from './devicesSlice/mocks';
import { mockState as monitorMockState } from './monitorSlice/mocks';
import { mockState as onboardingMockState } from './onboardingSlice/mocks';
import { mockState as organizationMockState } from './organizationSlice/mocks';
import { mockState as releasesMockState } from './releasesSlice/mocks';
import type { getConfiguredStore } from './store';
import { mockState as usersMockState } from './usersSlice/mocks';

type PreloadedState = NonNullable<Parameters<typeof getConfiguredStore>[0]>['preloadedState'];
type MockState = Required<NonNullable<PreloadedState>>;

export const defaultState = {
  app: { ...appMockState },
  deployments: { ...deploymentsMockState },
  devices: { ...devicesMockState },
  monitor: { ...monitorMockState },
  onboarding: { ...onboardingMockState },
  organization: { ...organizationMockState },
  releases: { ...releasesMockState },
  users: { ...usersMockState }
} as unknown as MockState;
