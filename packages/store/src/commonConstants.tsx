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
// @ts-nocheck
import { mdiAws as AWS, mdiMicrosoftAzure as Azure } from '@mdi/js';
import type { Integration } from '@northern.tech/types/MenderTypes';
import { TIMEOUTS, countries } from '@northern.tech/utils/constants';
import type { CountryType } from '@northern.tech/utils/constants';

import type { DEVICE_FILTERING_OPTIONS } from './constants';
import { ATTRIBUTE_SCOPES } from './constants';

export const timeUnits = {
  days: 'days',
  minutes: 'minutes',
  hours: 'hours'
};

export const UNGROUPED_GROUP = { id: '*|=ungrouped=|*', name: 'Unassigned' };

export const DEVICE_LIST_MAXIMUM_LENGTH = 50;

export type FilterOperator = keyof typeof DEVICE_FILTERING_OPTIONS;

export { TIMEOUTS, countries };
export type { CountryType };

export const DEVICE_ONLINE_CUTOFF = { interval: 1, intervalName: timeUnits.days };

export interface IdAttribute {
  attribute: string;
  scope: string;
}
export const defaultIdAttribute: Readonly<IdAttribute> = Object.freeze({ attribute: 'id', scope: ATTRIBUTE_SCOPES.identity });

export const ORCHESTRATOR_MANIFEST_ATTRIBUTE_PREFIX = 'mender-orchestrator-manifest.';

// displayed labels for attribute scopes that diverge from the internal scope values: the system scope shows as
// `default`, while orchestrator manifest attributes (inventory scope) show as `system`
export const ATTRIBUTE_SCOPE_LABELS = {
  default: 'default',
  system: 'system'
} as const;

export const productOrder = ['micro', 'standard', 'system'];

export const credentialTypes = {
  aws: 'aws',
  http: 'http',
  sas: 'sas',
  x509: 'x509'
};
export const EXTERNAL_PROVIDER = {
  'iot-core': {
    credentialsType: credentialTypes.aws,
    icon: AWS,
    title: 'AWS IoT Core',
    twinTitle: 'Device Shadow',
    provider: 'iot-core',
    enabled: true,
    deviceTwin: true,
    configHint: <>For help finding your AWS IoT Core connection string, check the AWS IoT documentation.</>
  },
  'iot-hub': {
    credentialsType: credentialTypes.sas,
    icon: Azure,
    title: 'Azure IoT Hub',
    twinTitle: 'Device Twin',
    provider: 'iot-hub',
    enabled: true,
    deviceTwin: true,
    configHint: (
      <span>
        For help finding your Azure IoT Hub connection string, look under &apos;Shared access policies&apos; in the Microsoft Azure UI as described{' '}
        {
          <a
            href="https://devblogs.microsoft.com/iotdev/understand-different-connection-strings-in-azure-iot-hub/#iothubconn"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        }
        .
      </span>
    )
  },
  webhook: {
    credentialsType: credentialTypes.http,
    deviceTwin: false,
    twinTitle: '',
    // disable the webhook provider here, since it is treated different than other integrations, with a custom configuration & management view, etc.
    enabled: false,
    provider: 'webhook'
  }
} as const;

export interface Webhook extends Integration {
  provider: 'webhook';
}

export const emptyWebhook: Webhook = {
  description: '',
  provider: 'webhook',
  credentials: {
    type: EXTERNAL_PROVIDER.webhook.credentialsType,
    [EXTERNAL_PROVIDER.webhook.credentialsType]: {
      secret: '',
      url: ''
    }
  }
};

export const MAX_PAGE_SIZE = 500;
