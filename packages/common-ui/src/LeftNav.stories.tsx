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
import { BrowserRouter } from 'react-router-dom';

import { Launch, Settings as SettingsIcon } from '@mui/icons-material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { LeftNav } from './LeftNav';

const sampleSections = [
  {
    title: 'Main',
    itemClass: 'main-nav',
    items: [
      { title: 'Dashboard', path: '/dashboard', exact: true },
      { title: 'Devices', path: '/devices', exact: false },
      { title: 'Deployments', path: '/deployments', exact: false }
    ]
  },
  {
    title: 'Settings',
    itemClass: 'settings-nav',
    items: [
      { title: 'User Settings', path: '/settings/user', exact: false, icon: <SettingsIcon /> },
      { title: 'Organization', path: '/settings/org', exact: false }
    ]
  },
  {
    title: 'External Links',
    itemClass: 'external-nav',
    items: [{ title: 'Documentation', url: 'https://docs.mender.io', icon: <Launch /> }]
  }
];

const meta: Meta<typeof LeftNav> = {
  component: LeftNav,
  title: 'common-ui/LeftNav',
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof LeftNav>;

export const Primary: Story = {
  name: 'LeftNav',
  args: {
    sections: sampleSections
  }
};

export const SingleSection: Story = {
  name: 'Single Section',
  args: {
    sections: [sampleSections[0]]
  }
};
