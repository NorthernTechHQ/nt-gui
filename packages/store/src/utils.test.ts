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
import type { Scope } from '@northern.tech/types/MenderTypes';
import { ProductName } from '@northern.tech/types/MenderTypes';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Deployment } from './deploymentsSlice';
import type { DeviceFilter } from './devicesSlice';
import {
  convertDeviceListStateToFilters,
  getAttributeScopeLabel,
  groupDeploymentDevicesStats,
  groupDeploymentStats,
  mapDeviceAttributes,
  mapFiltersToTerms,
  normalizeDateTimeFilterValue,
  parseSubscriptionPreview,
  stripOrchestratorManifestPrefix
} from './utils';

describe('mapDeviceAttributes function', () => {
  const defaultAttributes = {
    inventory: { device_type: [], artifact_name: '' },
    identity: {},
    monitor: {},
    system: {},
    tags: {}
  };
  it('works with empty attributes', async () => {
    expect(mapDeviceAttributes()).toEqual(defaultAttributes);
    expect(mapDeviceAttributes([])).toEqual(defaultAttributes);
  });
  it('handles unscoped attributes', async () => {
    const testAttributesObject1 = { name: 'this1', value: 'that1' };
    expect(mapDeviceAttributes([testAttributesObject1])).toEqual({
      ...defaultAttributes,
      inventory: {
        ...defaultAttributes.inventory,
        this1: 'that1'
      }
    });
    const testAttributesObject2 = { name: 'this2', value: 'that2' };
    expect(mapDeviceAttributes([testAttributesObject1, testAttributesObject2])).toEqual({
      ...defaultAttributes,
      inventory: {
        ...defaultAttributes.inventory,
        this1: 'that1',
        this2: 'that2'
      }
    });
    expect(mapDeviceAttributes([testAttributesObject1, testAttributesObject2, testAttributesObject2])).toEqual({
      ...defaultAttributes,
      inventory: {
        ...defaultAttributes.inventory,
        this1: 'that1',
        this2: 'that2'
      }
    });
  });
  it('handles scoped attributes', async () => {
    const testAttributesObject1 = { name: 'this1', value: 'that1', scope: 'inventory' as Scope };
    expect(mapDeviceAttributes([testAttributesObject1])).toEqual({
      ...defaultAttributes,
      inventory: {
        ...defaultAttributes.inventory,
        this1: 'that1'
      }
    });
    const testAttributesObject2 = { name: 'this2', value: 'that2', scope: 'identity' as Scope };
    expect(mapDeviceAttributes([testAttributesObject1, testAttributesObject2])).toEqual({
      ...defaultAttributes,
      identity: {
        ...defaultAttributes.identity,
        this2: 'that2'
      },
      inventory: {
        ...defaultAttributes.inventory,
        this1: 'that1'
      }
    });
    expect(mapDeviceAttributes([testAttributesObject1, testAttributesObject2, testAttributesObject2])).toEqual({
      ...defaultAttributes,
      identity: {
        ...defaultAttributes.identity,
        this2: 'that2'
      },
      inventory: {
        ...defaultAttributes.inventory,
        this1: 'that1'
      }
    });
  });
});

describe('deployment stats grouping functions', () => {
  it('groups correctly based on deployment stats', async () => {
    const deployment: Partial<Deployment> = {
      statistics: {
        status: {
          aborted: 2,
          'already-installed': 1,
          decommissioned: 1,
          downloading: 3,
          failure: 1,
          installing: 1,
          noartifact: 1,
          pending: 2,
          rebooting: 1,
          success: 1,
          artifact_too_big: 0,
          pause_before_installing: 0,
          pause_before_rebooting: 0,
          pause_before_committing: 0,
          incompatible_tier: 0
        }
      }
    };
    expect(groupDeploymentStats(deployment)).toEqual({ inprogress: 5, paused: 0, pending: 2, successes: 3, failures: 4 });
  });
  it('groups correctly based on deployment devices states', async () => {
    const deployment: Pick<Deployment, 'devices'> = {
      devices: {
        a: { id: 'a', log: false, status: 'aborted' },
        b: { id: 'b', log: false, status: 'already-installed' },
        c: { id: 'c', log: false, status: 'decommissioned' },
        d: { id: 'd', log: false, status: 'downloading' },
        e: { id: 'e', log: false, status: 'failure' },
        f: { id: 'f', log: false, status: 'installing' },
        g: { id: 'g', log: false, status: 'noartifact' },
        h: { id: 'h', log: false, status: 'pending' },
        i: { id: 'i', log: false, status: 'rebooting' },
        j: { id: 'j', log: false, status: 'success' }
      }
    };
    expect(groupDeploymentDevicesStats(deployment)).toEqual({ inprogress: 3, paused: 0, pending: 1, successes: 3, failures: 3 });
  });
});

const stripePreview = {
  id: 'upcoming_in_1Sn4EAFlFfXikjZVtG4Rqrwe',
  period_start: '2026-01-07T21:25:13Z',
  period_end: '2026-01-07T21:25:13Z',
  total: 7400,
  currency: 'usd',
  lines: [
    {
      description: '100 mcu × Mender Micro Basic (Tier 1 at $0.00 / month)',
      amount: 0,
      currency: 'usd',
      quantity: 100,
      product: ProductName.MENDER_MICRO,
      proration: false
    },
    {
      description: 'Mender Micro Basic (Tier 1 at $32.00 / month)',
      amount: 3200,
      currency: 'usd',
      quantity: 0,
      product: ProductName.MENDER_MICRO,
      proration: false
    },
    {
      description: '50 device × Mender Basic (Tier 1 at $0.00 / month)',
      amount: 0,
      currency: 'usd',
      quantity: 50,
      product: ProductName.MENDER_STANDARD,
      proration: false
    },
    {
      description: 'Mender Basic (Tier 1 at $32.00 / month)',
      amount: 3200,
      currency: 'usd',
      quantity: 0,
      product: ProductName.MENDER_STANDARD,
      proration: false
    },
    {
      description: '50 device × Mender Configure (Tier 1 at $0.00 / month)',
      amount: 0,
      currency: 'usd',
      quantity: 50,
      product: ProductName.MENDER_STANDARD,
      addon: 'configure',
      proration: false
    },
    {
      description: 'Mender Configure (Tier 1 at $10.00 / month)',
      amount: 1000,
      currency: 'usd',
      quantity: 0,
      product: ProductName.MENDER_STANDARD,
      addon: 'configure',
      proration: false
    },
    {
      description: '50 device × Mender Troubleshoot (Tier 1 at $0.00 / month)',
      amount: 0,
      currency: 'usd',
      quantity: 50,
      product: ProductName.MENDER_STANDARD,
      addon: 'troubleshoot',
      proration: false
    },
    {
      description: 'Mender Troubleshoot (Tier 1 at $20.00 / month)',
      amount: 2000,
      currency: 'usd',
      quantity: 0,
      product: ProductName.MENDER_STANDARD,
      addon: 'troubleshoot',
      proration: false
    }
  ]
};
describe('subscription utils', () => {
  it('stripe subscription preview', async () => {
    const result = parseSubscriptionPreview(stripePreview.lines);
    expect(result.standard.amount).toEqual(3200);
    expect(result.micro.amount).toEqual(3200);
    expect(result.standard.addons.configure).toEqual(1000);
    expect(result.standard.addons.troubleshoot).toEqual(2000);
  });
});
describe('stripOrchestratorManifestPrefix function', () => {
  it('strips the orchestrator manifest prefix', () => {
    expect(stripOrchestratorManifestPrefix('mender-orchestrator-manifest.component_type')).toEqual('component_type');
  });
  it('leaves other keys untouched', () => {
    expect(stripOrchestratorManifestPrefix('component_type')).toEqual('component_type');
    expect(stripOrchestratorManifestPrefix('rootfs-image.version')).toEqual('rootfs-image.version');
  });
});
describe('getAttributeScopeLabel function', () => {
  it('labels system scope attributes as default', () => {
    expect(getAttributeScopeLabel({ key: 'created_ts', scope: 'system' })).toEqual('default');
  });
  it('labels orchestrator manifest inventory attributes as system', () => {
    expect(getAttributeScopeLabel({ key: 'mender-orchestrator-manifest.component_type', scope: 'inventory' })).toEqual('system');
  });
  it('keeps other scopes as they are', () => {
    expect(getAttributeScopeLabel({ key: 'artifact_name', scope: 'inventory' })).toEqual('inventory');
    expect(getAttributeScopeLabel({ key: 'mac', scope: 'identity' })).toEqual('identity');
    expect(getAttributeScopeLabel({ key: 'mender-orchestrator-manifest.component_type', scope: 'tags' })).toEqual('tags');
  });
});
describe('convertDeviceListStateToFilters function', () => {
  const offlineThreshold = '2026-10-06T12:00:00.000Z';
  const checkInFilter: DeviceFilter = { key: 'check_in_time', operator: '$lte', scope: 'system', value: '2026-01-01T00:00:00.000Z' };
  it('keeps user defined filters on attributes also used by issue filters', () => {
    const { applicableFilters, filterTerms } = convertDeviceListStateToFilters({ filters: [checkInFilter], offlineThreshold });
    expect(applicableFilters).toEqual([checkInFilter]);
    expect(filterTerms).toEqual([{ attribute: 'check_in_time', scope: 'system', type: '$lte', value: '2026-01-01T00:00:00.000Z' }]);
  });
  it('keeps user defined filters alongside a selected issue on the same attribute', () => {
    const { applicableFilters, filterTerms } = convertDeviceListStateToFilters({ filters: [checkInFilter], offlineThreshold, selectedIssues: ['offline'] });
    expect(applicableFilters).toEqual([checkInFilter]);
    expect(filterTerms).toEqual([
      { attribute: 'check_in_time', scope: 'system', type: '$lte', value: '2026-01-01T00:00:00.000Z' },
      { attribute: 'check_in_time', scope: 'system', type: '$ltne', value: offlineThreshold }
    ]);
  });
  it('drops filters duplicating a selected issue filter', () => {
    const offlineFilter: DeviceFilter = { key: 'check_in_time', operator: '$ltne', scope: 'system', value: offlineThreshold };
    const alertFilter: DeviceFilter = { key: 'alerts', operator: '$eq', scope: 'monitor', value: 'true' };
    const { applicableFilters, filterTerms } = convertDeviceListStateToFilters({
      filters: [offlineFilter, alertFilter],
      offlineThreshold,
      selectedIssues: ['offline', 'monitoring']
    });
    expect(applicableFilters).toEqual([]);
    expect(filterTerms).toEqual([
      { attribute: 'check_in_time', scope: 'system', type: '$ltne', value: offlineThreshold },
      { attribute: 'alerts', scope: 'monitor', type: '$eq', value: 'true' }
    ]);
  });
});

describe('datetime filter values', () => {
  let timezoneSpy;
  beforeEach(() => {
    // simulate central european time, with daylight saving time from April to September for simplicity
    timezoneSpy = vi.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(function (this: Date) {
      return this.getMonth() >= 3 && this.getMonth() < 9 ? -120 : -60;
    });
  });
  afterEach(() => {
    timezoneSpy.mockRestore();
  });

  it.each([
    ['2025-01', '2025-01+01:00'],
    ['2025-07', '2025-07+02:00'],
    ['2025-01-15', '2025-01-15+01:00'],
    ['2025-07-15', '2025-07-15+02:00'],
    [' 2025-01-15 ', '2025-01-15+01:00'],
    ['2025-01-15T10', '2025-01-15T10+01:00'],
    ['2025-01-15 10:30', '2025-01-15T10:30+01:00'],
    ['2025-01-15T10:30:15', '2025-01-15T10:30:15+01:00'],
    ['2025-07-15T10:30:15.250', '2025-07-15T10:30:15.250+02:00'],
    ['2025-07-15 10:30:15', '2025-07-15T10:30:15+02:00'],
    ['2025-01-15T10:30-05:00', '2025-01-15T10:30-05:00'],
    ['2025-01Z', '2025-01Z'],
    ['2025-01-15-05:00', '2025-01-15-05:00'],
    ['2025-01-15 10:30z', '2025-01-15T10:30Z'],
    ['2026-10-06T12:00:00.000Z', '2026-10-06T12:00:00.000Z']
  ])('interprets %s as %s', (value, expected) => {
    expect(normalizeDateTimeFilterValue(value)).toEqual(expected);
  });

  it.each([
    '',
    'yesterday',
    '2025',
    '2025-1-5',
    '2025-13',
    '2025-02-30',
    '2025-01-15T24:00',
    '2025-01-15T10:60',
    '2025-01-15+1',
    '2025-01-15T10:30:15.25',
    '2025-01-15T10:30:15.123456'
  ])('rejects %s', value => {
    expect(normalizeDateTimeFilterValue(value)).toBeUndefined();
  });

  it('converts datetime filter values in search terms', () => {
    const terms = mapFiltersToTerms([
      { key: 'check_in_time', operator: '$gte', scope: 'system', value: '2025-01-15' },
      { key: 'created_ts', operator: '$in', scope: 'system', value: '2025-01, 2025-07-15 08:00, soon' },
      { key: 'updated_ts', operator: '$nexists', scope: 'system', value: '' },
      { key: 'check_in_time', operator: '$regex', scope: 'system', value: '2025-01' },
      { key: 'build_date', operator: '$eq', scope: 'inventory', value: '2025-01-15' }
    ]);
    expect(terms).toEqual([
      { attribute: 'check_in_time', scope: 'system', type: '$gte', value: '2025-01-15+01:00' },
      { attribute: 'created_ts', scope: 'system', type: '$in', value: ['2025-01+01:00', '2025-07-15T08:00+02:00', 'soon'] },
      { attribute: 'updated_ts', scope: 'system', type: '$exists', value: false },
      { attribute: 'check_in_time', scope: 'system', type: '$regex', value: '2025-01+01:00' },
      { attribute: 'build_date', scope: 'inventory', type: '$eq', value: '2025-01-15' }
    ]);
  });

  it('keeps the value types of processed operators for non datetime attributes', () => {
    const terms = mapFiltersToTerms([
      { key: 'name', operator: '$in', scope: 'tags', value: 'a, b' },
      { key: 'name', operator: '$nin', scope: 'tags', value: 'c' },
      { key: 'mac', operator: '$exists', scope: 'identity', value: '' },
      { key: 'mac', operator: '$nexists', scope: 'identity', value: '' },
      { key: 'cpu_count', operator: '$eq', scope: 'inventory', value: 4 }
    ] as DeviceFilter[]);
    expect(terms).toEqual([
      { attribute: 'name', scope: 'tags', type: '$in', value: ['a', 'b'] },
      { attribute: 'name', scope: 'tags', type: '$nin', value: ['c'] },
      { attribute: 'mac', scope: 'identity', type: '$exists', value: true },
      { attribute: 'mac', scope: 'identity', type: '$exists', value: false },
      { attribute: 'cpu_count', scope: 'inventory', type: '$eq', value: '4' }
    ]);
  });
});
