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
import type { ReactNode } from 'react';
import type { UseFormProps } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import { mockState as appMockState } from '@northern.tech/store/appSlice/mocks';
import { mockState as deploymentsMockState } from '@northern.tech/store/deploymentsSlice/mocks';
import { mockState as devicesMockState } from '@northern.tech/store/devicesSlice/mocks';
import { mockState as monitorMockState } from '@northern.tech/store/monitorSlice/mocks';
import { mockState as onboardingMockState } from '@northern.tech/store/onboardingSlice/mocks';
import { mockState as organizationMockState } from '@northern.tech/store/organizationSlice/mocks';
import { mockState as releasesMockState } from '@northern.tech/store/releasesSlice/mocks';
import { getConfiguredStore } from '@northern.tech/store/store';
import { mockState as usersMockState } from '@northern.tech/store/usersSlice/mocks';
import { token as mockToken } from '@northern.tech/testing/mockData';
import { render } from '@northern.tech/testing/setupTests';

type PreloadedState = NonNullable<Parameters<typeof getConfiguredStore>[0]>['preloadedState'];
type MockState = Required<NonNullable<PreloadedState>>;

// the slice mocks are hand written fixtures that deliberately deviate from the slice types in places (e.g. `app.searchState.sort`), yet they are
// meant to stand in for a fully populated store state - so we treat them as such to keep tests & stories consuming them type safe
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

interface CustomRenderOptions {
  [key: string]: unknown;
  preloadedState?: PreloadedState;
  store?: ReturnType<typeof getConfiguredStore>;
}

const customRender = (ui: ReactNode, options: CustomRenderOptions = {}) => {
  const {
    preloadedState = { ...defaultState, users: { ...defaultState.users, currentSession: { token: mockToken, expiresAt: undefined } } },
    store = getConfiguredStore({ preloadedState }),
    ...remainder
  } = options;
  return { ...render(ui, { ...remainder, preloadedState, store }), store };
};

export const formRenderWrapper = (ui: ReactNode, formConfig?: UseFormProps) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm(formConfig);
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return customRender(<Wrapper>{ui}</Wrapper>);
};

export * from '@northern.tech/testing/setupTests';

export { customRender as render };
