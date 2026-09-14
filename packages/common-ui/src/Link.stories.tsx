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
import { MemoryRouter } from 'react-router';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from './Link';

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'common-ui/Link',
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
  argTypes: {
    underline: { control: { type: 'radio' }, options: ['always', 'hover', 'none'] }
  }
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Primary: Story = {
  name: 'Link',
  args: {
    children: 'Go to the device list',
    to: '/devices'
  }
};

export const External: Story = {
  name: 'External',
  args: {
    children: 'Mender documentation',
    external: true,
    href: 'https://docs.mender.io'
  }
};

export const ButtonLike: Story = {
  name: 'Button Like',
  args: {
    children: 'Trigger an action',
    onClick: () => console.log('link clicked')
  }
};

export const Plain: Story = {
  name: 'Plain',
  args: {
    children: 'Rendered as a span - no target to navigate to'
  }
};
