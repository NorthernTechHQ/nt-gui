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
import { useCallback, useMemo } from 'react';
import type { Location, NavigateOptions } from 'react-router-dom';
import { useLocation, useNavigate, useNavigationType, useSearchParams } from 'react-router-dom';

import type { CommonProcessorResult, FormatPageStateDefaults, PageState } from './locationutils';
import {
  commonProcessor,
  formatAuditlogs,
  formatDeployments,
  formatDeviceSearch,
  formatPageState,
  formatReleases,
  formatTenants,
  generateDeploymentsPath,
  generateDevicePath,
  generateReleasesPath,
  generateTenantPath,
  parseAuditlogsQuery,
  parseDeploymentsQuery,
  parseDeviceQuery,
  parseReleasesQuery,
  parseTenantsQuery
} from './locationutils';

type ProcessorConfig<TFormat, TLocate, TParse> = {
  format: TFormat;
  locate: TLocate;
  parse: TParse;
};

type Processors = {
  auditlogs: ProcessorConfig<typeof formatAuditlogs, () => undefined, typeof parseAuditlogsQuery>;
  common: ProcessorConfig<typeof formatPageState, () => undefined, typeof commonProcessor>;
  deployments: ProcessorConfig<typeof formatDeployments, typeof generateDeploymentsPath, typeof parseDeploymentsQuery>;
  devices: ProcessorConfig<typeof formatDeviceSearch, typeof generateDevicePath, typeof parseDeviceQuery>;
  releases: ProcessorConfig<typeof formatReleases, typeof generateReleasesPath, typeof parseReleasesQuery>;
  tenants: ProcessorConfig<typeof formatTenants, typeof generateTenantPath, typeof parseTenantsQuery>;
};

export const defaultProcessors: Processors = {
  auditlogs: {
    format: formatAuditlogs,
    locate: () => undefined,
    parse: parseAuditlogsQuery
  },
  common: {
    format: formatPageState,
    locate: () => undefined,
    parse: commonProcessor
  },
  deployments: {
    format: formatDeployments,
    locate: generateDeploymentsPath,
    parse: parseDeploymentsQuery
  },
  devices: {
    format: formatDeviceSearch,
    locate: generateDevicePath,
    parse: parseDeviceQuery
  },
  releases: {
    format: formatReleases,
    locate: generateReleasesPath,
    parse: parseReleasesQuery
  },
  tenants: {
    format: formatTenants,
    locate: generateTenantPath,
    parse: parseTenantsQuery
  }
};

type ProcessorKey = keyof Omit<Processors, 'common'>;

type LocationExtras = Record<string, unknown>;

type LocationParamsValue = PageState & CommonProcessorResult['sort'] & Record<string, unknown>;

type SetValueParams = {
  [key: string]: unknown;
  pageState: PageState;
};

type UseLocationParamsReturn = [
  value: LocationParamsValue,
  setValue: (newValue: SetValueParams, options?: NavigateOptions) => void,
  options: { shouldInitializeFromUrl: boolean }
];

export const useLocationParams = (key: ProcessorKey, extras: LocationExtras, processors: Processors = defaultProcessors): UseLocationParamsReturn => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();

  // POP (back/ forward/ initial load) -> rely on url state - otherwise on stored redux state
  const shouldInitializeFromUrl = navigationType === 'POP';

  const value = useMemo(() => {
    const { pageState, params, sort } = processors.common.parse(searchParams);
    const extendedExtras = { ...extras, pageState, location };
    return {
      ...pageState,
      sort,
      ...(processors[key].parse as (params: URLSearchParams, extras: typeof extendedExtras) => Record<string, unknown>)(params, extendedExtras)
    } as LocationParamsValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(extras), key, location.search, location.pathname, searchParams.toString()]);

  const setValue = useCallback(
    (newValue: SetValueParams, options: NavigateOptions = {}): void => {
      const locateFn = processors[key].locate as (params: { location: Location; pageState: PageState }) => string | undefined;
      const pathname = locateFn({ pageState: newValue.pageState, location });
      const formatFn = processors[key].format as (value: SetValueParams, extras: LocationExtras) => string;
      const searchQuery = [processors.common.format(newValue.pageState, extras as FormatPageStateDefaults), formatFn(newValue, extras)]
        .filter(i => i)
        .join('&');
      navigate({ pathname, replace: true, search: `?${searchQuery}`, ...options });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(extras), key]
  );

  return [value, setValue, { shouldInitializeFromUrl }];
};
