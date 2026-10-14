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
import { Add as AddIcon } from '@mui/icons-material';
import { Alert, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { SettingsItem } from './SettingsItem';
import { SettingsSection } from './SettingsSection';

const meta: Meta<typeof SettingsSection> = {
  component: SettingsSection,
  title: 'common-ui/SettingsSection'
};

export default meta;

type Story = StoryObj<typeof SettingsSection>;

export const Primary: Story = {
  name: 'SettingsSection',
  args: {
    title: 'My organization',
    children: (
      <>
        <SettingsItem title="Organization name" secondary="Northern.tech" />
        <SettingsItem title="Current plan" description="The plan your organization is currently subscribed to." secondary="Mender Professional" />
      </>
    )
  }
};

export const WithFullWidthContent: Story = {
  name: 'With Actions & Full Width Content',
  args: {
    title: 'User management',
    actions: (
      <Button variant="contained" startIcon={<AddIcon />}>
        Add new user
      </Button>
    ),
    children: <Alert severity="warning">Please verify your email address before adding new users.</Alert>,
    fullWidthContent: (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Authentication</TableCell>
            <TableCell>Roles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>user@example.com</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
};
