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
import { getConfiguredStore } from '@northern.tech/store/store';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { DOCSTIPS, DocsLink, DocsTextLink, DocsTooltip, InlineLaunchIcon } from './DocsLink';

const meta: Meta<typeof DocsLink> = {
  component: DocsLink,
  title: 'common-ui/DocsLink',
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

type Story = StoryObj<typeof DocsLink>;

export const Primary: Story = {
  render: props => <DocsLink {...props} />,
  name: 'DocsLink',
  args: {
    path: 'anywhere/in/the/docs',
    title: 'more info shown here',
    style: {}
  }
};

export const WithChildren: Story = {
  render: props => (
    <DocsLink {...props}>
      read up on artifacts <InlineLaunchIcon />
    </DocsLink>
  ),
  name: 'DocsLink with children',
  args: {
    path: 'overview/artifact',
    className: ''
  }
};

type TooltipStory = StoryObj<typeof DocsTooltip>;

export const Tooltip: TooltipStory = {
  render: props => <DocsTooltip {...props} />,
  name: 'DocsTooltip',
  argTypes: {
    id: {
      control: { type: 'select' },
      options: Object.keys(DOCSTIPS)
    }
  },
  args: {
    id: DOCSTIPS.phasedDeployments.id,
    anchor: {}
  }
};

type TextLinkStory = StoryObj<typeof DocsTextLink>;

export const TextLink: TextLinkStory = {
  render: props => (
    <p>
      Delta artifacts reduce the amount of data transferred to your devices. <DocsTextLink {...props} />
    </p>
  ),
  name: 'DocsTextLink',
  argTypes: {
    id: {
      control: { type: 'select' },
      options: Object.keys(DOCSTIPS)
    }
  },
  args: {
    id: 'deltaArtifacts',
    children: 'Learn more about delta artifacts',
    typographyProps: { variant: 'body1' }
  }
};
