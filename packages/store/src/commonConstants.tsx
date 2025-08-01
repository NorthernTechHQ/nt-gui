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
import { Credentials } from '@northern.tech/types/MenderTypes';

import { ATTRIBUTE_SCOPES } from './constants';

export const timeUnits = {
  days: 'days',
  minutes: 'minutes',
  hours: 'hours'
};

export const UNGROUPED_GROUP = { id: '*|=ungrouped=|*', name: 'Unassigned' };

export const DEVICE_LIST_MAXIMUM_LENGTH = 50;

export type FilterOperator = keyof typeof DEVICE_FILTERING_OPTIONS;

const oneSecond = 1000;
export const TIMEOUTS = {
  debounceDefault: 700,
  debounceShort: 300,
  halfASecond: 0.5 * oneSecond,
  oneSecond,
  twoSeconds: 2 * oneSecond,
  threeSeconds: 3 * oneSecond,
  fiveSeconds: 5 * oneSecond,
  refreshDefault: 10 * oneSecond,
  refreshLong: 60 * oneSecond
};

export const DEVICE_ONLINE_CUTOFF = { interval: 1, intervalName: timeUnits.days };

export const defaultIdAttribute = Object.freeze({ attribute: 'id', scope: ATTRIBUTE_SCOPES.identity });

const credentialTypes = {
  aws: Credentials.type.AWS,
  http: Credentials.type.HTTP,
  sas: Credentials.type.SAS,
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
    credentialsType: credentialTypes.http as Credentials.type.HTTP,
    deviceTwin: false,
    twinTitle: '',
    // disable the webhook provider here, since it is treated different than other integrations, with a custom configuration & management view, etc.
    enabled: false,
    provider: 'webhook'
  }
} as const;
export const MAX_PAGE_SIZE = 500;
