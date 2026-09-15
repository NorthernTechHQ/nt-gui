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

import { defaultState as preloadedState } from '@/testUtils';
import type { Device } from '@northern.tech/store/devicesSlice';
import { getConfiguredStore } from '@northern.tech/store/store';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { DeviceNameInput } from './DeviceNameInput';

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

const meta: Meta<typeof DeviceNameInput> = {
  title: 'common-ui/DeviceNameInput',
  component: DeviceNameInput,
  decorators: [
    Story => {
      const store = getConfiguredStore({ preloadedState });
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    }
  ]
};

export default meta;

type Story = StoryObj<typeof DeviceNameInput>;

export const Primary: Story = {
  render: props => <DeviceNameInput {...props} />,
  name: 'DeviceNameInput',
  args: {
    device,
    isHovered: true
  }
};

export const NotHovered: Story = {
  name: 'Not Hovered',
  args: {
    ...Primary.args,
    isHovered: false
  }
};

export const WithoutName: Story = {
  name: 'Without Name',
  args: {
    ...Primary.args,
    device: { ...device, tags: {} }
  }
};
