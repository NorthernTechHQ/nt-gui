// Copyright 2025 Northern.tech AS
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
import { Provider } from 'react-redux';

import { defaultState } from '@/testUtils';
import type { Device } from '@northern.tech/store/devicesSlice';
import { getConfiguredStore } from '@northern.tech/store/store';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { DeviceIdentityDisplay as DeviceIdentity } from './DeviceIdentity';

// the store side Device type declares `status` as the `Status` object type, which no device status value can satisfy - hence the assertion instead of a plain annotation
const device = {
  id: 'a1b2c3d4-e5f6-4711-8899-aabbccddeeff',
  attributes: { artifact_name: 'release-v2.1.0', device_type: ['qemux86-64'], ipv4_wlan0: '192.168.10.141/24' },
  system: { check_in_time: '2019-01-01T09:25:00.000Z' },
  identity_data: { mac: 'dc:a6:32:12:ad:bf' },
  tags: { name: 'production gateway' },
  created_ts: '2019-01-01T06:25:00.000Z',
  updated_ts: '2019-01-01T09:25:00.000Z'
} as unknown as Device;

// the shared api mocks are hand written fixtures that deliberately deviate from the slice types in places, yet they are meant to stand in for a fully populated store state
const stateWithIdAttribute = (idAttribute?: { attribute: string; scope: string }) =>
  ({
    ...defaultState,
    users: { ...defaultState.users, globalSettings: { ...defaultState.users.globalSettings, id_attribute: idAttribute } }
  }) as unknown as NonNullable<Parameters<typeof getConfiguredStore>[0]>['preloadedState'];

const storeDecorators = (idAttribute?: { attribute: string; scope: string }): Decorator[] => [
  Story => {
    const store = getConfiguredStore({ preloadedState: stateWithIdAttribute(idAttribute) });
    return (
      <Provider store={store}>
        <Story />
      </Provider>
    );
  }
];

const meta: Meta<typeof DeviceIdentity> = {
  title: 'common-ui/DeviceIdentity',
  component: DeviceIdentity,
  decorators: storeDecorators()
};

export default meta;

type Story = StoryObj<typeof DeviceIdentity>;

export const Primary: Story = {
  render: props => <DeviceIdentity {...props} />,
  name: 'DeviceIdentity',
  args: {
    device,
    isEditable: true,
    style: {}
  }
};

export const IdentifiedByMacAddress: Story = {
  name: 'Identified By Mac Address',
  decorators: storeDecorators({ attribute: 'mac', scope: 'identity' }),
  args: {
    ...Primary.args
  }
};

export const EditableName: Story = {
  name: 'Editable Name',
  decorators: storeDecorators({ attribute: 'name', scope: 'tags' }),
  args: {
    ...Primary.args,
    isHovered: true
  }
};

export const NonEditableName: Story = {
  name: 'Non Editable Name',
  decorators: storeDecorators({ attribute: 'name', scope: 'tags' }),
  args: {
    ...Primary.args,
    isEditable: false
  }
};

export const UntaggedDevice: Story = {
  name: 'Untagged Device',
  decorators: storeDecorators({ attribute: 'name', scope: 'tags' }),
  args: {
    ...Primary.args,
    device: { ...device, tags: {} },
    isEditable: false
  }
};
