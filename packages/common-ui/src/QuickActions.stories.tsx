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
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon, Link as LinkIcon } from '@mui/icons-material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import type { QuickAction } from './QuickActions';
import { BaseQuickActions } from './QuickActions';

const actions: QuickAction[] = [
  {
    action: ({ selection }) => console.log('creating a deployment for', selection),
    icon: <CloudUploadIcon />,
    key: 'deploy',
    onClick: () => console.log('creating a deployment'),
    title: 'Create deployment'
  },
  {
    action: ({ selection }) => console.log('copying the link for', selection),
    icon: <LinkIcon />,
    key: 'copy',
    onClick: () => console.log('copying the link'),
    title: 'Copy link'
  },
  {
    action: ({ selection }) => console.log('deleting', selection),
    icon: <DeleteIcon />,
    key: 'delete',
    needsConfirmation: true,
    onClick: () => console.log('deleting the selection'),
    title: 'Delete'
  }
];

const meta: Meta<typeof BaseQuickActions> = {
  component: BaseQuickActions,
  title: 'common-ui/QuickActions'
};

export default meta;

type Story = StoryObj<typeof BaseQuickActions>;

export const Primary: Story = {
  name: 'QuickActions',
  args: {
    actions,
    ariaLabel: 'release-actions',
    label: '2 releases selected',
    onToggle: (open: boolean) => console.log(`quick actions ${open ? 'opened' : 'closed'}`)
  }
};

export const SingleAction: Story = {
  name: 'Single Action',
  args: {
    ...Primary.args,
    actions: [actions[0]],
    label: '1 device selected'
  }
};

export const WithOnboarding: Story = {
  name: 'With Onboarding Component',
  args: {
    ...Primary.args,
    onboardingComponent: <div className="margin-right">Onboarding tip can be anchored here</div>
  }
};
