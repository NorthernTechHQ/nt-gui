// Copyright 2022 Northern.tech AS
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
import { deepCompare, getISOStringBoundaries } from '@northern.tech/utils/helpers';

import type { FilterOperator, PaginationOptions, SortOptions } from './constants';
import {
  ALL_DEVICES,
  ATTRIBUTE_SCOPES,
  AUDIT_LOGS_TYPES,
  DEPLOYMENT_ROUTES,
  DEPLOYMENT_STATES,
  DEPLOYMENT_TYPES,
  DEVICE_FILTERING_OPTIONS,
  DEVICE_LIST_DEFAULTS,
  UNGROUPED_GROUP,
  emptyFilter
} from './constants';
import type { DeviceFilter } from './devicesSlice';

const SEPARATOR = ':';

type FieldConfig = {
  parse: ((val: string) => unknown) | undefined;
  select: (values: unknown[]) => unknown;
  target: string;
};

const defaultSelector = <T>(result: T[]): T => result[0];

const commonFields: Record<string, FieldConfig> = {
  page: { parse: Number, select: defaultSelector, target: 'page' },
  perPage: { parse: Number, select: defaultSelector, target: 'perPage' },
  id: { parse: String, select: (i: unknown[]): unknown[] => i, target: 'id' },
  issues: { parse: undefined, select: defaultSelector, target: 'selectedIssues' },
  open: { parse: Boolean, select: defaultSelector, target: 'open' }
};

type ScopeConfig = { delimiter: string; filters: DeviceFilter[] };

const scopes: Record<Scope, ScopeConfig> = {
  identity: { delimiter: 'identity', filters: [] },
  inventory: { delimiter: 'inventory', filters: [] },
  monitor: { delimiter: 'monitor', filters: [] },
  system: { delimiter: 'system', filters: [] },
  tags: { delimiter: 'tags', filters: [] }
};

export type PageState = Partial<PaginationOptions> & {
  [key: string]: unknown;
  detailsTab?: string;
  id?: string[];
  open?: boolean;
  selectedId?: string;
  selectedIssues?: string[];
  state?: string;
};

export type CommonProcessorResult = {
  pageState: PageState;
  params: URLSearchParams;
  sort: Partial<SortOptions> | undefined;
};

export const commonProcessor = (searchParams: string | URLSearchParams): CommonProcessorResult => {
  const params = new URLSearchParams(searchParams);
  const pageState = Object.entries(commonFields).reduce<PageState>((accu, [key, { parse, select, target }]) => {
    const values = params.getAll(key);
    if (!values.length) {
      return accu;
    }
    if (!parse) {
      accu[target] = values;
    } else {
      try {
        accu[target] = select(values.map(parse) as unknown[]);
      } catch (error) {
        console.log('encountered faulty url param, continue...', error);
      }
    }
    return accu;
  }, {} as PageState);
  Object.keys(commonFields).forEach(key => params.delete(key));
  const sort = params.has('sort')
    ? params.getAll('sort').reduce<Partial<SortOptions>>((sortAccu, scopedQuery) => {
        const items = scopedQuery.split(SEPARATOR).reverse();
        return (['direction', 'key', 'scope'] as const).reduce<Record<string, string>>((accu, key, index) => {
          if (items[index]) {
            accu[key] = items[index];
          }
          return accu;
        }, sortAccu);
      }, {})
    : undefined;
  params.delete('sort');
  return { pageState, params, sort };
};

type FilteringAttributes = Record<string, string[]>;
type ScopedFilters = Record<Scope, DeviceFilter[]>;

const legacyDeviceQueryParse = (
  searchParams: URLSearchParams,
  filteringAttributes: FilteringAttributes
): { filters: ScopedFilters; params: URLSearchParams } => {
  const params = new URLSearchParams(searchParams);
  const result: ScopedFilters = Object.keys(scopes).reduce((accu, scope) => ({ ...accu, [scope]: [] }), {} as ScopedFilters);
  if (params.get('group')) {
    result.inventory.push({
      ...emptyFilter,
      key: 'group',
      scope: ATTRIBUTE_SCOPES.inventory,
      operator: DEVICE_FILTERING_OPTIONS.$eq.key,
      value: params.get('group') as string
    });
    params.delete('group');
  }
  const filters = [...params.keys()].reduce<Record<Scope, DeviceFilter[]>>(
    (accu, key) =>
      params.getAll(key).reduce((innerAccu, value) => {
        const scope =
          Object.entries(filteringAttributes).reduce<string | undefined>((foundScope, [currentScope, attributes]) => {
            if (foundScope) {
              return foundScope;
            }
            return attributes.includes(key) ? currentScope.substring(0, currentScope.indexOf('Attributes')) : foundScope;
          }, undefined) ?? ATTRIBUTE_SCOPES.inventory;
        innerAccu[scope].push({ ...emptyFilter, scope, key, operator: DEVICE_FILTERING_OPTIONS.$eq.key as FilterOperator, value });
        return innerAccu;
      }, accu),
    result
  );
  [...params.keys()].forEach(key => params.delete(key));
  return { filters, params };
};

const scopedFilterParse = (searchParams: URLSearchParams): { filters: ScopedFilters; params: URLSearchParams } => {
  const params = new URLSearchParams(searchParams);
  const filters = Object.keys(scopes).reduce<ScopedFilters>(
    (accu, scope) => {
      accu[scope] = [];
      if (!params.has(scope)) {
        return accu;
      }
      accu[scope] = params.getAll(scope).map(scopedQuery => {
        const items = scopedQuery.split(SEPARATOR);
        // URLSearchParams will automatically decode any URI encoding present in the query string, thus we have to also handle queries with a SEPARATOR separately
        return { ...emptyFilter, scope, key: items[0], operator: `$${items[1]}` as FilterOperator, value: items.slice(2).join(SEPARATOR) };
      });
      return accu;
    },
    { identity: [], inventory: [], monitor: [], system: [], tags: [] }
  );
  Object.keys(scopes).forEach(scope => params.delete(scope));
  return { filters, params };
};

type ParseDeviceQueryExtraProps = {
  filteringAttributes?: FilteringAttributes;
  pageState?: PageState;
};

export type ParseDeviceQueryResult = {
  detailsTab: string | null;
  filters: DeviceFilter[];
  groupId: string | null;
  groupName: string;
  open?: boolean;
};

// filters, selectedGroup
export const parseDeviceQuery = (searchParams: URLSearchParams, extraProps: ParseDeviceQueryExtraProps = {}): ParseDeviceQueryResult => {
  let queryParams = new URLSearchParams(searchParams);
  const { filteringAttributes = {}, pageState = {} } = extraProps;
  const pageStateExtension = pageState.id?.length === 1 ? { open: true } : {};

  let scopedFilters: ScopedFilters;
  const refersOldStyleAttributes = Object.values(filteringAttributes).some(scopeValues =>
    (scopeValues as string[]).some(scopedValue => queryParams.get(scopedValue))
  );
  if ((refersOldStyleAttributes && !Object.keys(scopes).some(scope => queryParams.get(scope))) || queryParams.get('group')) {
    const { filters, params } = legacyDeviceQueryParse(queryParams, filteringAttributes);
    scopedFilters = filters;
    queryParams = params;
  } else {
    const { filters, params } = scopedFilterParse(queryParams);
    scopedFilters = filters;
    queryParams = params;
  }

  let groupName = '';
  const groupFilterIndex = scopedFilters.inventory.findIndex(filter => filter.key === 'group' && filter.operator === DEVICE_FILTERING_OPTIONS.$eq.key);
  if (groupFilterIndex > -1) {
    groupName = scopedFilters.inventory[groupFilterIndex].value as string;
    scopedFilters.inventory.splice(groupFilterIndex, 1);
  }

  const detailsTab = queryParams.has('tab') ? queryParams.get('tab') : '';
  const groupId = queryParams.has('groupId') ? queryParams.get('groupId') : '';
  return { detailsTab, filters: Object.values(scopedFilters).flat(), groupName, ...pageStateExtension, groupId };
};

type FormatSortingDefaults = { sort?: Partial<SortOptions> };

const formatSorting = (sort: Partial<SortOptions> | undefined, { sort: sortDefault }: FormatSortingDefaults): string => {
  if (!sort || deepCompare(sort, sortDefault)) {
    return '';
  }
  const sortQuery = (['scope', 'key', 'direction'] as const)
    .reduce<string[]>((accu, key) => {
      if (!sort[key]) {
        return accu;
      }
      accu.push(sort[key]);
      return accu;
    }, [])
    .join(SEPARATOR);
  return `sort=${sortQuery}`;
};

type FormatPageStateParams = {
  page?: number;
  perPage?: number;
  selectedId?: string;
  selectedIssues?: string[];
  sort?: Partial<SortOptions>;
};

export type FormatPageStateDefaults = { defaults: FormatSortingDefaults };

export const formatPageState = ({ selectedId, selectedIssues, page, perPage, sort }: FormatPageStateParams, { defaults }: FormatPageStateDefaults): string =>
  Object.entries({ page, perPage, id: selectedId, issues: selectedIssues, open: selectedId ? true : undefined })
    .reduce<string[]>(
      (accu, [key, value]) => {
        if (Array.isArray(value)) {
          accu.push(...value.map(item => `${key}=${encodeURIComponent(item)}`));
        } else if ((DEVICE_LIST_DEFAULTS[key] != value || !Object.hasOwn(DEVICE_LIST_DEFAULTS, key)) && value) {
          accu.push(`${key}=${encodeURIComponent(value as string | number)}`);
        }
        return accu;
      },
      [formatSorting(sort, defaults)]
    )
    .filter(i => i)
    .join('&');

const stripFilterOperator = (operator: string): string => operator.replaceAll('$', '');

const formatFilters = (filters: DeviceFilter[]): string[] => {
  const result = filters
    // group all filters by their scope to get a more organized result
    .reduce<Record<Scope, Set<string>>>(
      (accu, filter) => {
        const { scope = ATTRIBUTE_SCOPES.inventory, operator = '$eq' } = filter;
        accu[scope].add(
          `${scopes[scope].delimiter}=${filter.key}${SEPARATOR}${stripFilterOperator(operator)}${SEPARATOR}${encodeURIComponent(filter.value as string)}`
        );
        return accu;
      },
      Object.keys(scopes).reduce((accu, item) => ({ ...accu, [item]: new Set<string>() }), {} as Record<Scope, Set<string>>)
    );
  // boil it all down to a single line containing all filters
  return Object.values(result)
    .map(filterSet => [...filterSet])
    .flat();
};

type FormatDeviceSearchParams = {
  filters: DeviceFilter[];
  groupId?: string;
  pageState: PageState;
  selectedGroup?: string;
};

export const formatDeviceSearch = ({ pageState, filters, selectedGroup, groupId }: FormatDeviceSearchParams): string => {
  let activeFilters = [...filters];
  if (selectedGroup && selectedGroup !== ALL_DEVICES) {
    const isUngroupedGroup = selectedGroup === UNGROUPED_GROUP.id;
    activeFilters = isUngroupedGroup
      ? activeFilters.filter(
          filter => !(filter.key === 'group' && filter.scope === ATTRIBUTE_SCOPES.system && filter.operator === DEVICE_FILTERING_OPTIONS.$nin.key)
        )
      : activeFilters;
    const groupName = isUngroupedGroup ? UNGROUPED_GROUP.name : selectedGroup;
    activeFilters.push({ scope: ATTRIBUTE_SCOPES.inventory, key: 'group', operator: DEVICE_FILTERING_OPTIONS.$eq.key as FilterOperator, value: groupName });
  }
  const formattedFilters = formatFilters(activeFilters).filter(i => i);
  if (pageState.detailsTab && pageState.selectedId) {
    formattedFilters.push(`tab=${pageState.detailsTab}`);
  }
  if (groupId) {
    formattedFilters.push(`groupId=${groupId}`);
  }
  return formattedFilters.join('&');
};

export const generateDevicePath = ({ pageState }: { pageState: PageState }): string => {
  const { state: selectedState } = pageState;
  const path = ['/devices'];
  if (selectedState !== '') {
    path.push(selectedState as string);
  }
  return path.join('/');
};

type FormatDatesParams = {
  endDate?: string;
  params: URLSearchParams;
  startDate?: string;
  today?: string;
  tonight?: string;
};

const formatDates = ({ endDate, params, startDate, today, tonight }: FormatDatesParams): URLSearchParams => {
  if (endDate && endDate !== tonight) {
    params.set('endDate', endDate.split('T')[0]);
  }
  if (startDate && startDate !== today) {
    params.set('startDate', startDate.split('T')[0]);
  }
  return params;
};

const paramReducer = (accu: URLSearchParams, [key, value]: [string, string | undefined]): URLSearchParams => {
  if (value) {
    accu.set(key, value);
  }
  return accu;
};

type AuditlogsPageState = {
  detail?: string;
  endDate?: string;
  startDate?: string;
  type?: { value?: string } | string;
  user?: { id?: string } | string;
};

type AuditlogsExtras = { today: string; tonight: string };

export const formatAuditlogs = ({ pageState }: { pageState: AuditlogsPageState }, { today, tonight }: AuditlogsExtras): string => {
  const { detail, endDate, startDate, type, user } = pageState;
  let params = new URLSearchParams();
  let userId = user as string | undefined;
  if (typeof user === 'object' && user?.id) {
    userId = user.id;
  }
  params = Object.entries({ objectId: detail, userId }).reduce(paramReducer, params);
  if (type) {
    params.set('objectType', typeof type === 'object' ? (type.value ?? '') : type);
  }
  params = formatDates({ endDate, params, startDate, today, tonight });
  return params.toString();
};

export const parseDateParams = (params: URLSearchParams, today: string, tonight: string): { endDate: string; startDate: string } => {
  let endDate = tonight;
  const endDateParam = params.get('endDate');
  if (endDateParam) {
    endDate = getISOStringBoundaries(new Date(endDateParam)).end;
  }
  let startDate = today;
  const startDateParam = params.get('startDate');
  if (startDateParam) {
    startDate = getISOStringBoundaries(new Date(startDateParam)).start;
  }
  return { endDate, startDate };
};

type AuditLogType = (typeof AUDIT_LOGS_TYPES)[number] | undefined;

export type ParseAuditlogsResult = {
  detail: string | null;
  endDate: string;
  startDate: string;
  type: AuditLogType;
  user: string | null;
};

export const parseAuditlogsQuery = (params: URLSearchParams, { today, tonight }: AuditlogsExtras): ParseAuditlogsResult => {
  const type = AUDIT_LOGS_TYPES.find(typeObject => typeObject.value === params.get('objectType'));
  const { endDate, startDate } = parseDateParams(params, today, tonight);
  return {
    detail: params.get('objectId'),
    endDate,
    startDate,
    type,
    user: params.get('userId')
  };
};

type DeploymentsBasePageState = Record<string, Partial<PaginationOptions>>;

type DeploymentDefaults = { defaults: DeploymentsBasePageState & { sort?: Partial<SortOptions> } };

const formatActiveDeployments = (pageState: DeploymentsBasePageState, { defaults }: DeploymentDefaults): string =>
  [DEPLOYMENT_STATES.inprogress, DEPLOYMENT_STATES.pending]
    .reduce<string[]>((accu, state) => {
      const { page, perPage } = pageState[state] ?? {};
      const stateDefaults = defaults[state] ?? {};
      const items = Object.entries({ page, perPage })
        .reverse()
        .reduce((keyAccu: (number | undefined)[], [key, value]) => {
          if ((value && value !== stateDefaults[key as keyof typeof stateDefaults]) || keyAccu.length) {
            keyAccu.unshift(value || stateDefaults[key as keyof typeof stateDefaults]);
          }
          return keyAccu;
        }, []);
      if (items.length) {
        accu.push(`${state}=${items.join(SEPARATOR)}`);
      }
      return accu;
    }, [])
    .filter(i => i)
    .join('&');

type DeploymentObject = {
  devices?: Array<{ id: string }>;
  release?: { name: string };
};

type FormatDeploymentsPageState = DeploymentsBasePageState & {
  [key: string]: { endDate?: string; search?: string; startDate?: string; type?: string } | Partial<PaginationOptions> | unknown;
  general: { showCreationDialog?: boolean; state: string };
};

type FormatDeploymentsParams = {
  deploymentObject: DeploymentObject;
  pageState: FormatDeploymentsPageState;
};

type FormatDeploymentsExtras = {
  defaults: DeploymentDefaults['defaults'];
  today: string;
  tonight: string;
};

export const formatDeployments = ({ deploymentObject, pageState }: FormatDeploymentsParams, { defaults, today, tonight }: FormatDeploymentsExtras): string => {
  const { state: selectedState, showCreationDialog } = pageState.general;
  let params = new URLSearchParams();
  if (showCreationDialog) {
    params.set('open', 'true');
    if (deploymentObject.release) {
      params.set('release', deploymentObject.release.name);
    }
    if (deploymentObject.devices?.length) {
      deploymentObject.devices.forEach(({ id }) => params.append('deviceId', id));
    }
  }
  let pageStateQuery: string;
  if (selectedState === DEPLOYMENT_ROUTES.finished.key) {
    const finishedState = pageState[selectedState] as { endDate?: string; search?: string; startDate?: string; type?: string };
    const { endDate, search, startDate, type } = finishedState;
    params = formatDates({ endDate, params, startDate, today, tonight });
    params = Object.entries({ search, type }).reduce(paramReducer, params);
    pageStateQuery = formatPageState(pageState[selectedState] as FormatPageStateParams, { defaults: { sort: defaults.sort } });
  } else if (selectedState === DEPLOYMENT_ROUTES.scheduled.key) {
    pageStateQuery = formatPageState(pageState[selectedState] as FormatPageStateParams, { defaults: { sort: defaults.sort } });
  } else {
    pageStateQuery = formatActiveDeployments(pageState, { defaults });
  }
  return [pageStateQuery, params.toString()].filter(i => i).join('&');
};

const deploymentsPath = 'deployments/';
const parseDeploymentsPath = (path: string): string => {
  const parts = path.split(deploymentsPath);
  if (parts.length > 1 && Object.keys(DEPLOYMENT_ROUTES).includes(parts[1])) {
    return parts[1];
  }
  return '';
};

const parseActiveDeployments = (params: URLSearchParams): PageState =>
  [DEPLOYMENT_STATES.inprogress, DEPLOYMENT_STATES.pending].reduce<PageState>((accu, state) => {
    if (!params.has(state)) {
      return accu;
    }
    const items = (params.get(state) as string).split(SEPARATOR);
    accu[state] = Object.keys(DEVICE_LIST_DEFAULTS).reduce<Partial<PaginationOptions>>(
      (stateAccu, key, index) => (items[index] ? { ...stateAccu, [key]: Number(items[index]) } : stateAccu),
      {}
    );
    return accu;
  }, {});

type DeploymentFieldConfig<T> = {
  attribute: string;
  parse: (val: string) => T;
  select: (values: T[]) => T | T[];
};

const deploymentFields: Record<string, DeploymentFieldConfig<unknown>> = {
  deviceId: { attribute: 'devices', parse: (id: string) => ({ id }), select: <T>(i: T[]): T[] => i },
  release: { attribute: 'release', parse: String, select: defaultSelector }
};

type ParseDeploymentsExtraProps = {
  location: { pathname: string };
  pageState: PageState;
  tonight: string;
};

export type ParseDeploymentsQueryResult = {
  [key: string]: unknown;
  deploymentObject: Record<string, unknown>;
  general: {
    showCreationDialog: boolean;
    showReportDialog: boolean;
    state: string;
  };
};

export const parseDeploymentsQuery = (params: URLSearchParams, { pageState, location, tonight }: ParseDeploymentsExtraProps): ParseDeploymentsQueryResult => {
  // for deployments we get a startDate implicitly from a list of retrieved deployments if none is set, thus we're not defaulting to today
  const { endDate, startDate } = parseDateParams(params, '', tonight);
  const deploymentObject = Object.entries(deploymentFields).reduce<Record<string, unknown>>(
    (accu, [key, { attribute, parse, select }]) => (params.has(key) ? { ...accu, [attribute]: select(params.getAll(key).map(parse) as unknown[]) } : accu),
    {}
  );
  const { state: selectedState, id, open, ...remainingPageState } = pageState;
  const tab = parseDeploymentsPath(location.pathname);
  const deploymentsTab = tab || selectedState || DEPLOYMENT_ROUTES.active.key;

  let state: ParseDeploymentsQueryResult = {
    deploymentObject,
    general: {
      showCreationDialog: Boolean(open && !id),
      showReportDialog: Boolean(open && id),
      state: deploymentsTab
    }
  };
  if (deploymentsTab === DEPLOYMENT_ROUTES.finished.key) {
    const typeParam = params.get('type');
    const type = typeParam ? (DEPLOYMENT_TYPES as Record<string, string>)[typeParam] || '' : '';
    const search = params.get('search') || '';
    state[deploymentsTab] = { ...remainingPageState, endDate, search, startDate, type };
  } else if (deploymentsTab === DEPLOYMENT_ROUTES.scheduled.key) {
    state[deploymentsTab] = { ...remainingPageState };
  } else {
    state = {
      ...state,
      ...parseActiveDeployments(params)
    };
  }
  return state;
};

type GenerateDeploymentsPathParams = { pageState: PageState & { general: { state?: string } } };

export const generateDeploymentsPath = ({ pageState }: GenerateDeploymentsPathParams): string => {
  const { state: selectedState = DEPLOYMENT_ROUTES.active.key } = pageState.general;
  return `/deployments/${selectedState}`;
};

export interface FormatReleasesParams {
  pageState: {
    id?: string;
    searchTerm?: string;
    selectedTags?: string[];
    tab?: string;
    type?: string;
  };
}
const releasesRoot = '/software';
export const formatReleases = ({ pageState: { id, searchTerm, selectedTags = [], tab, type } }: FormatReleasesParams): string =>
  Object.entries({ name: searchTerm, tab, type, id })
    .reduce(
      (accu, [key, value]) => (value ? [...accu, `${key}=${value}`] : accu),
      selectedTags.map(tag => `tag=${tag}`)
    )
    .join('&');

type GenerateReleasesPathParams = { pageState: { selectedRelease?: string } };

export const generateReleasesPath = ({ pageState: { selectedRelease } }: GenerateReleasesPathParams): string =>
  `${releasesRoot}${selectedRelease ? `/${encodeURIComponent(selectedRelease)}` : ''}`;

type ParseReleasesExtraProps = {
  location: { pathname: string };
  pageState?: PageState;
};

export type ParseReleasesQueryResult = {
  searchTerm: string | null;
  selectedJob?: string;
  selectedRelease: string;
  tab?: string | null;
  tags: string[];
  type: string | null;
};

export const parseReleasesQuery = (queryParams: URLSearchParams, extraProps: ParseReleasesExtraProps): ParseReleasesQueryResult => {
  const name = queryParams.has('name') ? queryParams.get('name') : '';
  const tab = queryParams.has('tab') ? queryParams.get('tab') : undefined;
  const tags = queryParams.has('tag') ? queryParams.getAll('tag') : [];
  const type = queryParams.has('type') ? queryParams.get('type') : '';
  let selectedRelease = decodeURIComponent(extraProps.location.pathname.substring(releasesRoot.length + 1));
  let selectedJob;
  if (extraProps.pageState?.id?.length && tab === 'delta') {
    selectedJob = extraProps.pageState.id[0];
  } else if (!selectedRelease && extraProps.pageState?.id?.length) {
    selectedRelease = extraProps.pageState.id[0];
  }
  return { searchTerm: name, selectedJob, selectedRelease, tab, tags, type };
};

const tenantsRoot = '/tenants';

export const generateTenantPath = ({ pageState: { selectedTenant } }: { pageState: { selectedTenant?: string } }): string => {
  if (selectedTenant) {
    return `${tenantsRoot}/${encodeURIComponent(selectedTenant)}`;
  } else {
    return tenantsRoot;
  }
};

export const generateTenantPathById = (id: string | undefined): string => (id ? `${tenantsRoot}/${encodeURIComponent(id)}` : tenantsRoot);

type ParseTenantsExtraProps = {
  location: { pathname: string };
  pageState: PageState;
};

export type ParseTenantsQueryResult = {
  name: string | null;
  selectedTenant: string;
};

export const parseTenantsQuery = (queryParams: URLSearchParams, extraProps: ParseTenantsExtraProps): ParseTenantsQueryResult => {
  const name = queryParams.has('name') ? queryParams.get('name') : '';
  let selectedTenant = extraProps.location.pathname.substring(tenantsRoot.length + 1);
  if (!selectedTenant && extraProps.pageState.id?.length) {
    selectedTenant = extraProps.pageState.id[0];
  }
  return { name, selectedTenant };
};

export const formatTenants = (): string => '';
