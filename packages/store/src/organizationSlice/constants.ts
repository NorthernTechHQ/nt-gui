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
import { EXTERNAL_PROVIDER, apiUrl, useradmApiUrl } from '@northern.tech/store/constants';

import { Integration } from '../api/types/Integration';

export const auditLogsApiUrl = `${apiUrl.v1}/auditlogs`;
export const tenantadmApiUrlv1 = `${apiUrl.v1}/tenantadm`;
export const tenantadmApiUrlv2 = `${apiUrl.v2}/tenantadm`;
export const ssoIdpApiUrlv1 = `${apiUrl.v1}/useradm/sso/idp/metadata`;

export const XML_METADATA_FORMAT = 'xml';
export const JSON_METADATA_FORMAT = 'json';

export const getSamlStartUrl = id => `${window.location.origin}${useradmApiUrl}/auth/sso/${id}/login`;
export const getOidcStartUrl = id => `${window.location.origin}${useradmApiUrl}/oidc/${id}/start`;

export const SSO_TYPES = {
  saml: {
    id: 'saml',
    type: 'saml',
    title: 'SAML',
    metadataFormat: XML_METADATA_FORMAT,
    editorLanguage: XML_METADATA_FORMAT,
    contentType: 'application/samlmetadata+xml',
    getStartUrl: getSamlStartUrl,
    configDetails: [
      { key: 'entityID', label: 'Entity ID', getValue: id => `${window.location.origin}${useradmApiUrl}/sso/sp/metadata/${id}` },
      { key: 'acs', label: 'ACS URL', getValue: id => `${window.location.origin}${useradmApiUrl}/auth/sso/${id}/acs` },
      { key: 'startURL', label: 'Start URL', getValue: getSamlStartUrl }
    ]
  },
  oidc: {
    id: 'oidc',
    type: 'oidc',
    title: 'OpenID Connect',
    metadataFormat: JSON_METADATA_FORMAT,
    editorLanguage: JSON_METADATA_FORMAT,
    contentType: 'application/json',
    getStartUrl: getOidcStartUrl,
    configDetails: [{ key: 'startURL', label: 'Start Url', getValue: getOidcStartUrl }]
  }
} as const;

export type ContentType = (typeof SSO_TYPES)[keyof typeof SSO_TYPES]['contentType'];

export const auditlogTypes = {
  artifact: { title: 'Artifact', queryParameter: 'object_type', value: 'artifact' },
  deployment: { title: 'Deployment', queryParameter: 'object_deployment_name', value: 'deployment' },
  device: { title: 'Device', queryParameter: 'object_id', value: 'device' },
  user_access_token: { title: 'Personal Access Token', queryParameter: 'user_access_token', value: 'user_access_token' },
  user: { title: 'User', queryParameter: 'object_id', value: 'user' },
  tenant: { title: 'Tenant', queryParameter: 'object_id', value: 'tenant' }
};

export const AUDIT_LOGS_TYPES = [auditlogTypes.artifact, auditlogTypes.deployment, auditlogTypes.device, auditlogTypes.user_access_token, auditlogTypes.user];
export const SP_AUDIT_LOGS_TYPES = [auditlogTypes.user, auditlogTypes.tenant];

export interface Webhook extends Integration {
  provider: Integration.provider.WEBHOOK;
}

export const emptyWebhook: Webhook = {
  description: '',
  provider: Integration.provider.WEBHOOK,
  credentials: {
    type: EXTERNAL_PROVIDER.webhook.credentialsType,
    [EXTERNAL_PROVIDER.webhook.credentialsType]: {
      secret: '',
      url: ''
    }
  }
};
export const TENANT_LIST_DEFAULT = {
  page: 1,
  perPage: 20
};
