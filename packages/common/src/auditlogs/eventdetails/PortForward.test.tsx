// Copyright 2021 Northern.tech AS
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
import React from 'react';

// import * as DeviceActions from '@northern.tech/store/devicesSlice/thunks';
//TODO: resolve issues with the import causing vi.spy to make all functions in module undefined
import { act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { defaultState, undefineds } from '../../../../../tests/mockData';
import { render } from '../../../../../tests/setupTests';
import PortForward from './PortForward';

describe('PortForward Component', () => {
  it('renders correctly', async () => {
    // const sessionSpy = vi.spyOn(DeviceActions, 'getSessionDetails');
    const ui = <PortForward item={defaultState.organization.auditlog.events[2]} />;
    const { baseElement, rerender } = render(ui, {
      preloadedState: {
        ...defaultState,
        organization: {
          ...defaultState.organization,
          auditlog: {
            ...defaultState.organization.auditlog,
            selectionState: {
              ...defaultState.organization.auditlog.selectionState,
              selectedId: btoa(`${defaultState.organization.auditlog.events[2].action}|${defaultState.organization.auditlog.events[2].time}`)
            }
          }
        }
      }
    });
    await waitFor(() => rerender(ui));
    await act(async () => {
      vi.runOnlyPendingTimers();
      vi.runAllTicks();
    });
    // expect(sessionSpy).toHaveBeenCalled();

    const view = baseElement.firstChild.firstChild;
    expect(view).toMatchSnapshot();
    expect(view).toEqual(expect.not.stringMatching(undefineds));
  });
});
