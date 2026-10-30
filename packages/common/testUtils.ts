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
import type { ReactElement } from 'react';

import { defaultState } from '@northern.tech/store/mockState';
import { getConfiguredStore } from '@northern.tech/store/store';
import { token as mockToken } from '@northern.tech/testing/mockData';
import { render } from '@northern.tech/testing/setupTests';

type PreloadedState = NonNullable<Parameters<typeof getConfiguredStore>[0]>['preloadedState'];

interface CustomRenderOptions {
  [key: string]: unknown;
  preloadedState?: PreloadedState;
  store?: ReturnType<typeof getConfiguredStore>;
}

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const {
    preloadedState = { ...defaultState, users: { ...defaultState.users, currentSession: { token: mockToken, expiresAt: undefined } } },
    store = getConfiguredStore({ preloadedState }),
    ...remainder
  } = options;
  return { ...render(ui, { preloadedState, store, ...remainder }), store };
};

export * from '@northern.tech/testing/setupTests';

export { customRender as render, defaultState };
