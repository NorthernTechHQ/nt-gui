// Copyright 2024 Northern.tech AS
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
import type { AttributeFilterPredicate, AttributeV2, DeviceWithImage, FilterV2, InvoiceLineItem, Scope } from '@northern.tech/types/MenderTypes';
import { duplicateFilter, yes } from '@northern.tech/utils/helpers';
import type { AxiosError } from 'axios';

import type { DeviceIssueOptionKey, FilterOperator, Role } from './constants';
import {
  ATTRIBUTE_SCOPES,
  DARK_MODE,
  DEPLOYMENT_STATES,
  DEVICE_FILTERING_OPTIONS,
  DEVICE_ISSUE_OPTIONS,
  DEVICE_LIST_MAXIMUM_LENGTH,
  defaultStats,
  deploymentDisplayStates,
  deploymentStatesToSubstates,
  deploymentStatesToSubstatesWithSkipped,
  emptyFilter,
  emptyUiPermissions,
  softwareIndicator
} from './constants';
import type { Deployment } from './deploymentsSlice';
import type { DeviceFilter, DeviceGroup, InventoryAttributes } from './devicesSlice';
import type { PricePreview } from './organizationSlice/types';

type FilterProcessorValue = string | string[] | number | boolean; // this aligns with a API compatible `FilterPredicate.value`
type FilterProcessor = (val: string) => FilterProcessorValue;

// for some reason these functions can not be stored in the deviceConstants...
const filterProcessors: Record<string, FilterProcessor> = {
  [DEVICE_FILTERING_OPTIONS.$gt.key]: (val: string) => Number(val) || val,
  [DEVICE_FILTERING_OPTIONS.$gte.key]: (val: string) => Number(val) || val,
  [DEVICE_FILTERING_OPTIONS.$lt.key]: (val: string) => Number(val) || val,
  [DEVICE_FILTERING_OPTIONS.$lte.key]: (val: string) => Number(val) || val,
  [DEVICE_FILTERING_OPTIONS.$ltne.key]: (val: string) => Number(val) || val,
  [DEVICE_FILTERING_OPTIONS.$in.key]: (val: string) => ('' + val).split(',').map(i => i.trim()),
  [DEVICE_FILTERING_OPTIONS.$nin.key]: (val: string) => ('' + val).split(',').map(i => i.trim()),
  [DEVICE_FILTERING_OPTIONS.$exists.key]: yes,
  [DEVICE_FILTERING_OPTIONS.$nexists.key]: () => false
};

type FilterAlias = { alias: FilterOperator; value: boolean };
const filterAliases: Record<string, FilterAlias> = {
  $nexists: { alias: DEVICE_FILTERING_OPTIONS.$exists.key, value: false }
};

export type FilterTerm = {
  attribute: string;
  scope: Scope;
  type: FilterOperator;
  value: FilterProcessorValue;
};

export const mapFiltersToTerms = (filters: DeviceFilter[]): FilterTerm[] =>
  filters.map(filter => ({
    scope: filter.scope,
    attribute: filter.key,
    type: filterAliases[filter.operator]?.alias || filter.operator,
    value: Object.hasOwn(filterProcessors, filter.operator) ? filterProcessors[filter.operator](filter.value as string) : filter.value
  }));
export const mapTermsToFilters = (terms: FilterTerm[]): DeviceFilter[] =>
  terms.map(term => {
    const aliasedFilter = Object.entries(filterAliases).find(
      aliasDefinition => aliasDefinition[1].alias === term.type && aliasDefinition[1].value === term.value
    );
    const operator = (aliasedFilter ? aliasedFilter[0] : term.type) as FilterOperator;
    return { scope: term.scope as Scope, key: term.attribute, operator, value: term.value } as DeviceFilter;
  });

type IssueFilterState = { offlineThreshold?: string };

type IssueFilterRule = {
  key: string;
  operator: FilterOperator;
  scope: Scope;
  value: string | string[] | ((state: IssueFilterState) => string);
};

const convertIssueOptionsToFilters = (issuesSelection: DeviceIssueOptionKey[], filtersState: IssueFilterState = {}): DeviceFilter[] =>
  issuesSelection.map(item => {
    const filterRule = DEVICE_ISSUE_OPTIONS[item].filterRule as IssueFilterRule;
    const value = typeof filterRule.value === 'function' ? filterRule.value(filtersState) : filterRule.value;
    return { key: filterRule.key, operator: filterRule.operator, scope: filterRule.scope, value } as DeviceFilter;
  });

export const convertDeviceListStateToFilters = ({
  filters = [],
  group,
  groups = { byId: {} },
  offlineThreshold,
  selectedIssues = [],
  status
}: {
  filters?: DeviceFilter[];
  group?: string;
  groups?: { byId: Record<string, DeviceGroup> };
  offlineThreshold?: string;
  selectedIssues?: DeviceIssueOptionKey[];
  status?: string;
}) => {
  let applicableFilters = [...filters];
  if (typeof group === 'string' && !(groups.byId[group]?.filters || applicableFilters).length) {
    applicableFilters.push({ key: 'group', value: group, operator: DEVICE_FILTERING_OPTIONS.$eq.key, scope: 'system' });
  }
  const nonMonitorFilters = applicableFilters.filter(
    filter =>
      !Object.values(DEVICE_ISSUE_OPTIONS).some(({ filterRule }) => {
        const { key = '', scope = '' } = filterRule as IssueFilterRule;
        return filter.scope !== 'inventory' && scope === filter.scope && key === filter.key;
      })
  );
  const deviceIssueFilters = convertIssueOptionsToFilters(selectedIssues, { offlineThreshold });
  applicableFilters = [...nonMonitorFilters, ...deviceIssueFilters];
  const effectiveFilters = status
    ? [...applicableFilters, { key: 'status', value: status, operator: DEVICE_FILTERING_OPTIONS.$eq.key, scope: ATTRIBUTE_SCOPES.identity }]
    : applicableFilters;
  return { applicableFilters: nonMonitorFilters, filterTerms: mapFiltersToTerms(effectiveFilters) };
};

const filterCompare = (filter: DeviceFilter, item: DeviceFilter): boolean =>
  Object.keys(emptyFilter).every(key => item[key as keyof DeviceFilter]?.toString() === filter[key as keyof DeviceFilter]?.toString());

export const filtersFilter = (item: DeviceFilter, index: number, array: DeviceFilter[]): boolean => {
  const firstIndex = array.findIndex(filter => filterCompare(filter, item));
  return firstIndex === index;
};

export const stripUndefined = <T extends Record<string, unknown>>(obj: T): Partial<T> =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>;

export const listItemMapper = <T extends object>(
  byId: Record<string, T>,
  ids: string[],
  { cutOffSize = DEVICE_LIST_MAXIMUM_LENGTH, defaultObject = {} as Partial<T> }: { cutOffSize?: number; defaultObject?: Partial<T> }
): T[] =>
  ids.slice(0, cutOffSize).reduce<T[]>((accu, id) => {
    if (id && byId[id]) {
      accu.push({ ...defaultObject, ...byId[id] });
    }
    return accu;
  }, []);

type UiPermissions = typeof emptyUiPermissions;
type PermissionValue = string[] | Record<string, string[]>; // this would ideally be `PermissionValue = string[] | Record<string, PermissionValue>`

export const mergePermissions = (existingPermissions: UiPermissions = { ...emptyUiPermissions }, addedPermissions: UiPermissions): UiPermissions =>
  Object.entries(existingPermissions).reduce<UiPermissions>(
    (accu, [key, value]) => {
      let values;
      if (!accu[key]) {
        accu[key] = value;
        return accu;
      }
      if (Array.isArray(value)) {
        values = [...value, ...(accu[key] as string[])].filter(duplicateFilter);
      } else {
        values = mergePermissions(accu[key], { ...value } as unknown as UiPermissions) as unknown as PermissionValue;
      }
      accu[key] = values;
      return accu;
    },
    { ...addedPermissions }
  );

export const mapUserRolesToUiPermissions = (userRoles: string[], roles: Record<string, Role>): UiPermissions =>
  userRoles.reduce(
    (accu, roleId) => {
      if (!(roleId && roles[roleId])) {
        return accu;
      }
      return mergePermissions(accu, roles[roleId].uiPermissions);
    },
    { ...emptyUiPermissions }
  );

export const progress = ({ loaded, total }: { loaded: number; total?: number }): number => {
  if (!total) return 0;
  let uploadProgress = (loaded / total) * 100;
  return (uploadProgress = uploadProgress < 50 ? Math.ceil(uploadProgress) : Math.round(uploadProgress));
};

export type ErrorWithResponse = AxiosError<{ error?: { message?: string } | string }> & { error?: string };

export const extractErrorMessage = (err: ErrorWithResponse, fallback = ''): string =>
  (typeof err.response?.data?.error === 'object' ? err.response?.data?.error?.message : err.response?.data?.error) || err.error || err.message || fallback;

export const ensureVersionString = (software: string, fallback: string): string =>
  software.length && software !== 'artifact_name' ? (software.endsWith(softwareIndicator) ? software : `${software}${softwareIndicator}`) : fallback;

export const getComparisonCompatibleVersion = (version: string): string => (isNaN(parseInt(version.charAt(0))) && version !== 'next' ? 'master' : version);

export const stringToBoolean = (content: string | number | undefined): boolean => {
  if (!content) {
    return false;
  }
  const string = content + '';
  switch (string.trim().toLowerCase()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return Boolean(string);
  }
};

export type DeploymentStats = {
  failures: number;
  inprogress: number;
  paused: number;
  pending: number;
  skipped?: number;
  successes: number;
};

export const groupDeploymentDevicesStats = (deployment: Pick<Deployment, 'devices'>): DeploymentStats => {
  const deviceStatCollector = (deploymentStates: string[], devices: Record<string, DeviceWithImage>): number =>
    Object.values(devices).reduce<number>((accu, device) => (deploymentStates.includes(device.status ?? '') ? accu + 1 : accu), 0);

  const inprogress = deviceStatCollector(deploymentStatesToSubstates.inprogress, deployment.devices);
  const pending = deviceStatCollector(deploymentStatesToSubstates.pending, deployment.devices);
  const successes = deviceStatCollector(deploymentStatesToSubstates.successes, deployment.devices);
  const failures = deviceStatCollector(deploymentStatesToSubstates.failures, deployment.devices);
  const paused = deviceStatCollector(deploymentStatesToSubstates.paused, deployment.devices);
  return { inprogress, paused, pending, successes, failures };
};

export const statCollector = (items: string[], statistics: Record<string, number>): number =>
  items.reduce((accu, property) => accu + Number(statistics[property] || 0), 0);

export const groupDeploymentStats = (deployment: Partial<Deployment>, withSkipped?: boolean): DeploymentStats => {
  const { statistics = {} } = deployment;
  const { status = {} } = statistics;
  const stats = { ...defaultStats, ...status };
  let result: DeploymentStats = { inprogress: 0, paused: 0, pending: 0, successes: 0, failures: 0 };
  let groupStates = deploymentStatesToSubstates;
  if (withSkipped) {
    groupStates = deploymentStatesToSubstatesWithSkipped;
    result.skipped = statCollector(groupStates.skipped!, stats);
  }
  result = {
    ...result,
    // don't include 'pending' as inprogress, as all remaining devices will be pending - we don't discriminate based on phase membership
    inprogress: statCollector(groupStates.inprogress, stats),
    pending: statCollector(groupStates.pending, stats),
    successes: statCollector(groupStates.successes, stats),
    failures: statCollector(groupStates.failures, stats),
    paused: statCollector(groupStates.paused, stats)
  };
  return result;
};

export const getDeploymentState = (deployment: Partial<Deployment>): string => {
  const { status: deploymentStatus = DEPLOYMENT_STATES.pending } = deployment;
  const { inprogress: currentProgressCount, paused } = groupDeploymentStats(deployment);

  let status = deploymentDisplayStates[deploymentStatus];
  if (deploymentStatus === DEPLOYMENT_STATES.pending && currentProgressCount === 0) {
    status = 'queued';
  } else if (paused > 0) {
    status = deploymentDisplayStates.paused;
  }
  return status;
};

type DeploymentFilter =
  | FilterV2
  | {
      terms?: Array<AttributeFilterPredicate | { key: string }>;
    };

export const generateDeploymentGroupDetails = (filter: DeploymentFilter | undefined, groupName: string): string =>
  filter && filter.terms?.length
    ? `${groupName} (${filter.terms
        .map(
          filter =>
            `${filter.attribute || filter.key} ${DEVICE_FILTERING_OPTIONS[filter.type || filter.operator || DEVICE_FILTERING_OPTIONS.$eq.key].shortform} ${filter.value}`
        )
        .join(', ')})`
    : groupName;

type DeviceAttributeMap = {
  identity: Record<string, string>;
  inventory: InventoryAttributes;
  monitor: Record<string, string>;
  system: Record<string, string>;
  tags: Record<string, string>;
};

export const mapDeviceAttributes = (attributes: AttributeV2[] = []): DeviceAttributeMap =>
  attributes.reduce<DeviceAttributeMap>(
    (accu, attribute) => {
      if (!(attribute.value && attribute.name) && attribute.scope === ATTRIBUTE_SCOPES.inventory) {
        return accu;
      }
      const scope = (attribute.scope || ATTRIBUTE_SCOPES.inventory) as keyof DeviceAttributeMap;
      (accu[scope] as Record<string, unknown>) = {
        ...accu[scope],
        [attribute.name]: attribute.value
      };
      if (attribute.name === 'device_type' && attribute.scope === ATTRIBUTE_SCOPES.inventory) {
        accu.inventory.device_type = ([] as string[]).concat(attribute.value as string | string[]);
      }
      return accu;
    },
    { inventory: { device_type: [] as string[], artifact_name: '' }, identity: {}, monitor: {}, system: {}, tags: {} }
  );

export const isDarkMode = (mode: string): boolean => mode === DARK_MODE;

type Line = InvoiceLineItem & { product: 'mender_standard' | 'mender_micro' };
export const parseSubscriptionPreview = (lines: Line[]): PricePreview['items'] =>
  lines.reduce((acc, { addon, amount, product }) => {
    const tier = product.replace('mender_', '');
    if (!acc[tier]) {
      acc[tier] = {
        amount: 0,
        addons: {}
      };
    }
    if (!addon) {
      acc[tier].amount += amount;
    } else {
      acc[tier].addons[addon] = (acc[tier].addons[addon] ?? 0) + amount;
    }
    return acc;
  }, {});

export const convertToBackendSPLimits = (
  limits: Record<string, number | string>,
  spLimits: Record<string, object>
): Record<string, { Name: string; value: number }> =>
  Object.fromEntries(
    Object.entries(limits)
      .filter(([key]) => !!spLimits[key])
      .map(([key, limit]) => {
        const backendId = (spLimits[key] as { backendId: string }).backendId;
        return [backendId, { Name: backendId, value: Number(limit) || 0 }];
      })
  );
