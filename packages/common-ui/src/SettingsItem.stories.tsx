// Copyright 2026 Northern.tech AS
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
import { Button } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from './Alert';
import { SettingsItem, ToggleSettingsItem } from './SettingsItem';

const meta: Meta<typeof SettingsItem> = {
  component: SettingsItem,
  title: 'common-ui/SettingsItem'
};

export default meta;

type Story = StoryObj<typeof SettingsItem>;

export const Primary: Story = {
  name: 'SettingsItem',
  args: {
    title: 'Current plan',
    description: 'The plan your organization is currently subscribed to.',
    secondary: 'Mender Professional - billed yearly'
  }
};

export const WithSideBarContent: Story = {
  name: 'With Sidebar Content',
  args: {
    ...Primary.args,
    sideBarContent: (
      <Button variant="text" onClick={() => console.log('upgrading')}>
        Upgrade
      </Button>
    )
  }
};

export const WithNotification: Story = {
  name: 'With Notification',
  args: {
    ...Primary.args,
    notification: <Alert severity="warning">Your trial expires in 3 days.</Alert>
  }
};

export const Toggleable: Story = {
  name: 'ToggleSettingsItem',
  render: args => <ToggleSettingsItem {...args} checked onClick={() => console.log('toggling the setting')} />,
  args: {
    title: 'Two Factor Authentication',
    description: 'Require a second authentication factor for all users of this organization.',
    secondary: 'Enabled for 4 of 12 users'
  }
};
