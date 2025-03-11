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
import React from 'react';

import { act, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defaultState, undefineds } from '../../../../../tests/mockData';
import { render } from '../../../../../tests/setupTests';
import TerminalSession from './TerminalSession';

describe('TerminalSession Component', () => {
  let socketSpyFactory;
  let socketSpy;
  const oldMatchMedia = window.matchMedia;

  beforeEach(() => {
    socketSpyFactory = vi.spyOn(window, 'WebSocket');
    socketSpyFactory.mockImplementation(() => {
      socketSpy = {
        close: () => {},
        send: () => {}
      };
      return socketSpy;
    });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    });
  });

  afterEach(() => {
    socketSpyFactory.mockReset();
    window.matchMedia = oldMatchMedia;
  });
  it('renders correctly', async () => {
    const DeviceActions = await import('@northern.tech/store/devicesSlice/thunks');
    const sessionSpy = vi.spyOn(DeviceActions, 'getSessionDetails');
    const ui = <TerminalSession item={defaultState.organization.auditlog.events[2]} />;
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
      vi.runAllTimers();
      vi.runAllTicks();
    });
    expect(await screen.findByText('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW')).toBeInTheDocument();
    expect(sessionSpy).toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByText(/Device type/i)).toBeVisible());

    const view = baseElement.firstChild.firstChild;
    expect(view).toMatchSnapshot();
    expect(view).toEqual(expect.not.stringMatching(undefineds));
  });
});
