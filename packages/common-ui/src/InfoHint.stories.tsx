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

import { BENEFITS } from '@northern.tech/store/appSlice/constants';
import { getConfiguredStore } from '@northern.tech/store/store';
import type { Meta, StoryObj } from '@storybook/react';

import { defaultState } from '../../../tests/mockData';
import { DOCSTIPS, DocsTooltip } from './DocsLink';
import EnterpriseNotification from './EnterpriseNotification';
import { InfoHint, InfoHintContainer } from './InfoHint';

const meta: Meta<typeof InfoHint> = {
  component: InfoHint,
  includeStories: ['Primary', 'Secondary']
};

export default meta;

type Story = StoryObj<typeof InfoHint>;

export const Primary: Story = {
  render: props => <InfoHint {...props} />,
  name: 'InfoHint',
  args: {
    content: 'something very helpful getting hinted at here',
    style: {}
  }
};

type StorySecondary = StoryObj<typeof InfoHintContainer>;

export const Secondary: StorySecondary = {
  render: props => (
    <InfoHintContainer {...props}>
      <EnterpriseNotification id={BENEFITS.retryDeployments.id} />
      <DocsTooltip id={DOCSTIPS.phasedDeployments.id} />
    </InfoHintContainer>
  ),
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
  name: 'InfoHintContainer',
  args: {}
};
