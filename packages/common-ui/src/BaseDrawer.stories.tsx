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
import { Alert } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { BaseDrawer } from './BaseDrawer';

const meta: Meta<typeof BaseDrawer> = {
  component: BaseDrawer,
  title: 'common-ui/BaseDrawer',
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'auto'] }
  }
};

export default meta;

type Story = StoryObj<typeof BaseDrawer>;

const content = (
  <div className="flexbox column">
    <p>Drawer content goes here - the drawer takes care of the title, the close handling and the separating divider.</p>
    <p>Everything below the divider is provided by the consuming component.</p>
  </div>
);

export const Primary: Story = {
  name: 'BaseDrawer',
  args: {
    children: content,
    open: true,
    onClose: () => console.log('closing the drawer'),
    size: 'md',
    slotProps: { header: { title: 'Device details' } }
  }
};

export const Small: Story = {
  name: 'Small',
  args: {
    ...Primary.args,
    size: 'sm',
    slotProps: { header: { title: 'A small drawer' } }
  }
};

export const WithNotification: Story = {
  name: 'With Notification',
  args: {
    ...Primary.args,
    notification: <Alert severity="warning">This device has not been seen in a while.</Alert>,
    slotProps: { header: { title: 'Device details' } }
  }
};

export const WithFullHeader: Story = {
  name: 'With Full Header',
  args: {
    ...Primary.args,
    size: 'lg',
    slotProps: {
      header: {
        title: 'Release: my-demo-app-1.0.0',
        onLinkCopy: () => console.log('copying the link to this drawer'),
        postTitle: <div className="margin-left-small muted">created 2 days ago</div>,
        preCloser: <div className="margin-right-small muted">anything can be put here</div>
      }
    }
  }
};
