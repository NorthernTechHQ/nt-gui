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

import type { OrganizationSliceType } from '.';
import { EXTERNAL_PROVIDER, productOrder } from '../constants';

export type OrganizationState = { organization: OrganizationSliceType };

export const getOrganization = (state: OrganizationState) => state.organization.organization;
export const getProducts = (state: OrganizationState) => state.organization.products;
export const getExternalIntegrations = (state: OrganizationState) => state.organization.externalDeviceIntegrations;
export const getAuditlogState = (state: OrganizationState) => state.organization.auditlog.selectionState;
export const getAuditLog = (state: OrganizationState) => state.organization.auditlog.events;
export const getAuditLogSelectionState = (state: OrganizationState) => state.organization.auditlog.selectionState;
export const getBillingProfile = (state: OrganizationState) => state.organization.organization.billing_profile;
export const getSubscription = (state: OrganizationState) => state.organization.organization.subscription;
export const getCard = (state: OrganizationState) => state.organization.card;
export const getSsoConfig = ({ organization: { ssoConfigs = [] } }: OrganizationState) => ssoConfigs[0];
export const getTenantsList = (state: OrganizationState) => state.organization.tenantList;
export const getWebhookEvents = (state: OrganizationState) => state.organization.webhooks.events;
export const getWebhookEventsTotal = (state: OrganizationState) => state.organization.webhooks.eventsTotal;

export const getDeviceTwinIntegrations = createSelector([getExternalIntegrations], integrations =>
  integrations.filter(integration => integration.id && EXTERNAL_PROVIDER[integration.provider]?.deviceTwin)
);
export const getIsServiceProvider = (state: OrganizationState) => state.organization.organization.service_provider;

export const getWebhooks = createSelector([getExternalIntegrations], integrations =>
  integrations.filter(integration => integration.id && integration.provider === EXTERNAL_PROVIDER.webhook.provider)
);
export const getWebhookEventInfo = createSelector([getWebhooks, getWebhookEvents, getWebhookEventsTotal], (webhooks, events, eventsTotal) =>
  webhooks.length ? { events, eventsTotal } : { events: [], eventsTotal: 0 }
);

export const getAuditLogEntry = createSelector([getAuditLog, getAuditLogSelectionState], (events, { selectedId }) => {
  if (!selectedId) {
    return;
  }
  const [eventAction, eventTime] = atob(selectedId).split('|');
  return events.find(item => item.action === eventAction && item.time === eventTime);
});

const toTierName = (key: string) => key.replace(/max_|_?devices/g, '') || 'standard';
const processDeviceLimits = (deviceLimits: Tenant['device_limits'], skipFilter = false) => {
  const result: { disabled: string[]; limits: Record<string, object> } = { limits: {}, disabled: [] };
  if (!deviceLimits) return result;
  const tiersByName = Object.fromEntries(Object.entries(deviceLimits).map(([key, limit]) => [toTierName(key), { key, limit }]));
  return productOrder.reduce((accu, tierName) => {
    const entry = tiersByName[tierName];
    if (!entry) return accu;
    const { key, limit } = entry;
    if (limit.value === 0) {
      accu.disabled.push(tierName);
      if (!skipFilter) return accu;
    }
    accu.limits[tierName] = {
      id: tierName,
      backendId: key,
      limit: limit.value,
      current: limit.current_value,
      name: tierName,
      quotaLeft: Math.max(limit.value - limit.current_value, 0),
      limitReached: limit.value !== -1 && limit.value <= limit.current_value
    };
    return accu;
  }, result);
};
const getDeviceLimitsInfo = createSelector([getOrganization], ({ device_limits }) => processDeviceLimits(device_limits));
export const getDisabledTiers = createSelector([getDeviceLimitsInfo], ({ disabled }) => disabled);
export const getSpLimits = createSelector([getDeviceLimitsInfo], ({ limits }) => limits);
export const getTenantListWithLimits = createSelector([getTenantsList], tenantList => ({
  ...tenantList,
  tenants: tenantList.tenants.map(tenant => ({
    ...tenant,
    device_limits: processDeviceLimits(tenant.device_limits, true).limits
  }))
}));
