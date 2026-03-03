// Copyright 2023 Northern.tech AS
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
import type { Tenant } from '@northern.tech/types/MenderTypes';
import { createSelector } from '@reduxjs/toolkit';

import { EXTERNAL_PROVIDER } from '../constants';
import type { RootState } from '../store';

export const getOrganization = (state: RootState) => state.organization.organization;
export const getProducts = (state: RootState) => state.organization.products;
export const getExternalIntegrations = (state: RootState) => state.organization.externalDeviceIntegrations;
export const getAuditlogState = (state: RootState) => state.organization.auditlog.selectionState;
export const getAuditLog = (state: RootState) => state.organization.auditlog.events;
export const getAuditLogSelectionState = (state: RootState) => state.organization.auditlog.selectionState;
export const getBillingProfile = (state: RootState) => state.organization.organization.billing_profile;
export const getSubscription = (state: RootState) => state.organization.organization.subscription;
export const getCard = (state: RootState) => state.organization.card;
export const getSsoConfig = ({ organization: { ssoConfigs = [] } }: RootState) => ssoConfigs[0];
export const getTenantsList = (state: RootState) => state.organization.tenantList;
export const getWebhookEvents = (state: RootState) => state.organization.webhooks.events;
export const getWebhookEventTotal = (state: RootState) => state.organization.webhooks.eventsTotal;

export const getDeviceTwinIntegrations = createSelector([getExternalIntegrations], integrations =>
  integrations.filter(integration => integration.id && EXTERNAL_PROVIDER[integration.provider]?.deviceTwin)
);
export const getIsServiceProvider = (state: RootState) => state.organization.organization.service_provider;

export const getWebhooks = createSelector([getExternalIntegrations], integrations =>
  integrations.filter(integration => integration.id && integration.provider === EXTERNAL_PROVIDER.webhook.provider)
);
export const getWebhookEventInfo = createSelector([getWebhooks, getWebhookEvents, getWebhookEventTotal], (webhooks, events, eventTotal) =>
  webhooks.length ? { events, eventTotal } : { events: [], eventTotal: 0 }
);

export const getAuditLogEntry = createSelector([getAuditLog, getAuditLogSelectionState], (events, { selectedId }) => {
  if (!selectedId) {
    return;
  }
  const [eventAction, eventTime] = atob(selectedId).split('|');
  return events.find(item => item.action === eventAction && item.time === eventTime);
});

const productOrder = ['micro', 'standard', 'system'];

export const toDeviceLimitEntry = ([key, limit]) => {
  const cleanName = key.replace(/max_|_?devices/g, '') || 'standard';
  return [
    cleanName,
    {
      id: cleanName,
      backendId: key,
      limit: limit.value,
      current: limit.current_value,
      name: cleanName,
      quotaLeft: Math.max(limit.value - limit.current_value, 0),
      limitReached: limit.value !== -1 && limit.value <= limit.current_value
    }
  ];
};

const formatLimits = (deviceLimits: Tenant['device_limits'], skipFilter = false) => {
  if (!deviceLimits) return {};
  const formattedLimits = Object.fromEntries(
    Object.entries(deviceLimits)
      .filter(([, limit]) => skipFilter || limit.value !== 0)
      .map(toDeviceLimitEntry)
  );
  const presentOrder = productOrder.filter(key => key in formattedLimits);
  return Object.fromEntries(presentOrder.map(key => [key, formattedLimits[key]]));
};
const disabledTiers = (deviceLimits: Tenant['device_limits']) =>
  Object.entries(deviceLimits ?? {})
    .filter(([, { value }]) => value === 0)
    .map(entry => toDeviceLimitEntry(entry)[0]);

export const getDisabledTiers = createSelector([getOrganization], ({ device_limits }) => disabledTiers(device_limits));
export const getSpLimits = createSelector([getOrganization], ({ device_limits }) => formatLimits(device_limits));
export const getTenantListWithLimits = createSelector([getTenantsList], tenantList => ({
  ...tenantList,
  tenants: tenantList.tenants.map(tenant => ({
    ...tenant,
    device_limits: formatLimits(tenant.device_limits, true)
  }))
}));
