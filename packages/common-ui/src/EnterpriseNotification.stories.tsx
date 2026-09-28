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
import { BrowserRouter } from 'react-router';

import { defaultState as preloadedState } from '@/testUtils';
import { BENEFITS } from '@northern.tech/store/constants';
import { getConfiguredStore } from '@northern.tech/store/store';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { DefaultUpgradeNotification, EnterpriseNotification } from './EnterpriseNotification';

const meta: Meta<typeof EnterpriseNotification> = {
  title: 'common-ui/EnterpriseNotification',
  component: EnterpriseNotification,
  decorators: [
    Story => {
      const store = getConfiguredStore({ preloadedState });
      return (
        <Provider store={store}>
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </Provider>
      );
    }
  ],
  argTypes: {
    id: {
      control: { type: 'select' },
      options: Object.values(BENEFITS).map(({ id }) => id)
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium']
    }
  }
};

export default meta;

type Story = StoryObj<typeof EnterpriseNotification>;

export const Primary: Story = {
  render: props => <EnterpriseNotification {...props} />,
  name: 'EnterpriseNotification',
  args: {
    className: '',
    id: BENEFITS.default.id,
    size: 'medium'
  }
};

export const Small: Story = {
  render: props => <EnterpriseNotification {...props} />,
  name: 'Small',
  args: {
    className: '',
    id: BENEFITS.phasedDeployments.id,
    size: 'small'
  }
};

export const AddonRequirement: Story = {
  render: props => <EnterpriseNotification {...props} />,
  name: 'Add-on requirement',
  args: {
    className: '',
    id: BENEFITS.deviceConfiguration.id,
    size: 'medium'
  }
};

type UpgradeNotificationStory = StoryObj<typeof DefaultUpgradeNotification>;

export const UpgradeNotification: UpgradeNotificationStory = {
  render: props => <DefaultUpgradeNotification {...props} />,
  name: 'DefaultUpgradeNotification',
  args: {
    className: ''
  }
};
