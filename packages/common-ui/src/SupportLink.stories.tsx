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
import type { Meta, StoryObj } from '@storybook/react-vite';

import { SupportLink } from './SupportLink';

const meta: Meta<typeof SupportLink> = {
  component: SupportLink,
  title: 'common-ui/SupportLink',
  argTypes: {
    variant: {
      options: ['email', 'ourTeam', 'support', 'salesTeam', 'custom'],
      mapping: {
        email: 'email',
        ourTeam: 'ourTeam',
        support: 'support',
        salesTeam: 'salesTeam',
        custom: 'get help'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof SupportLink>;

export const Primary: Story = {
  name: 'SupportLink',
  args: {
    variant: 'support',
    className: ''
  }
};
