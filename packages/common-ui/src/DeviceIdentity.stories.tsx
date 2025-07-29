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

import { getConfiguredStore } from '@northern.tech/store/store';
import { defaultState } from '@northern.tech/testing/mockData';
import type { Meta, StoryObj } from '@storybook/react';

import { DeviceIdentityDisplay } from './DeviceIdentity';

const meta: Meta<typeof DeviceIdentityDisplay> = {
  component: DeviceIdentityDisplay
};

export default meta;

type Story = StoryObj<typeof DeviceIdentityDisplay>;

export const Primary: Story = {
  render: props => <DeviceIdentityDisplay {...props} />,
  name: 'DeviceIdentityDisplay',
  decorators: [
    Story => {
      const store = getConfiguredStore({ preloadedState: defaultState });
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    }
  ],
  args: {
    device: {
      ...defaultState.devices.byId.a1,
      attributes: {
        ...defaultState.devices.byId.a1.attributes,
        mender_is_gateway: true,
        mender_gateway_system_id: '123'
      }
    },
    isEditable: true,
    hasAdornment: false,
    style: {}
  }
};
