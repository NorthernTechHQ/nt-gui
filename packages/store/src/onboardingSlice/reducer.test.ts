// Copyright 2020 Northern.tech AS
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
import { describe, expect, it } from 'vitest';

import reducer, { actions, initialState } from '.';

describe('organization reducer', () => {
  it('should return the initial state', async () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });
  it('should handle setOnboardingState', async () => {
    expect(reducer(undefined, { type: actions.setOnboardingState.type, payload: { foo: 'bar', showTips: true } }).showTips).toEqual(true);
    expect(reducer(initialState, { type: actions.setOnboardingState.type, payload: { foo: false } }).showTips).toEqual(null);
  });
  it('should handle SET_SHOW_ONBOARDING_HELP', async () => {
    expect(reducer(undefined, { type: actions.setShowOnboardingHelp.type, payload: true }).showTips).toEqual(true);
    expect(reducer(initialState, { type: actions.setShowOnboardingHelp.type, payload: false }).showTips).toEqual(false);
  });
  it('should handle SET_SHOW_ONBOARDING_HELP_DIALOG', async () => {
    expect(reducer(undefined, { type: actions.setShowDismissOnboardingTipsDialog.type, payload: true }).showTipsDialog).toEqual(true);
    expect(reducer(initialState, { type: actions.setShowDismissOnboardingTipsDialog.type, payload: false }).showTipsDialog).toEqual(false);
  });
  it('should handle SET_ONBOARDING_COMPLETE', async () => {
    expect(reducer(undefined, { type: actions.setOnboardingComplete.type, payload: true }).complete).toEqual(true);
    expect(reducer(initialState, { type: actions.setOnboardingComplete.type, payload: false }).complete).toEqual(false);
  });
  it('should handle SET_ONBOARDING_PROGRESS', async () => {
    expect(reducer(undefined, { type: actions.setOnboardingProgress.type, payload: 'test' }).progress).toEqual('test');
    expect(reducer(initialState, { type: actions.setOnboardingProgress.type, payload: 'test' }).progress).toEqual('test');
  });
  it('should handle SET_ONBOARDING_DEVICE_TYPE', async () => {
    expect(reducer(undefined, { type: actions.setOnboardingDeviceType.type, payload: 'bbb' }).deviceType).toEqual('bbb');
    expect(reducer(initialState, { type: actions.setOnboardingDeviceType.type, payload: 'rpi4' }).deviceType).toEqual('rpi4');
  });
  it('should handle SET_ONBOARDING_APPROACH', async () => {
    expect(reducer(undefined, { type: actions.setOnboardingApproach.type, payload: 'physical' }).approach).toEqual('physical');
    expect(reducer(initialState, { type: actions.setOnboardingApproach.type, payload: 'virtual' }).approach).toEqual('virtual');
  });
});
