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
// @ts-nocheck
import { defaultState } from '@/testUtils';
import { describe, expect, it } from 'vitest';

import { getFilterAttributes } from './commonSelectors';

describe('getFilterAttributes selector', () => {
  const state = {
    ...defaultState,
    devices: {
      ...defaultState.devices,
      filteringAttributes: {
        identityAttributes: ['mac'],
        inventoryAttributes: ['artifact_name', 'mender-orchestrator-manifest.component_type'],
        systemAttributes: ['group'],
        tagAttributes: []
      }
    },
    users: {
      ...defaultState.users,
      globalSettings: {
        ...defaultState.users.globalSettings,
        previousFilters: [{ key: 'mender-orchestrator-manifest.version', operator: '$eq', scope: 'inventory', value: 'v1' }]
      }
    }
  };
  it('labels system scope attributes as default', () => {
    const attributes = getFilterAttributes(state);
    const systemScoped = attributes.filter(({ scope }) => scope === 'system');
    expect(systemScoped.map(({ key }) => key)).toEqual(expect.arrayContaining(['check_in_time', 'updated_ts', 'created_ts', 'group']));
    systemScoped.forEach(attribute => expect(attribute.category).toEqual('default'));
  });
  it('groups orchestrator manifest attributes as system, with the prefix stripped from the shown value', () => {
    const attributes = getFilterAttributes(state);
    const manifestAttribute = attributes.find(({ key }) => key === 'mender-orchestrator-manifest.component_type');
    expect(manifestAttribute).toMatchObject({ category: 'system', scope: 'inventory', value: 'component_type' });
  });
  it('keeps plain inventory attributes untouched', () => {
    const attributes = getFilterAttributes(state);
    const inventoryAttribute = attributes.find(({ key }) => key === 'artifact_name');
    expect(inventoryAttribute).toMatchObject({ category: 'inventory', scope: 'inventory', value: 'artifact_name' });
  });
  it('strips the prefix from recently used entries while keeping the full key', () => {
    const attributes = getFilterAttributes(state);
    const recentlyUsed = attributes.find(({ category }) => category === 'recently used');
    expect(recentlyUsed).toMatchObject({ key: 'mender-orchestrator-manifest.version', value: 'version', scope: 'inventory' });
  });
});
