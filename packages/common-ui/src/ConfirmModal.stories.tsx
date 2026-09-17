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

import { ConfirmModal } from './ConfirmModal';

const meta: Meta<typeof ConfirmModal> = {
  title: 'common-ui/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    maxWidth: {
      control: { type: 'radio' },
      options: ['xs', 'sm', 'md', 'lg']
    }
  }
};

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

export const Primary: Story = {
  render: props => <ConfirmModal {...props} />,
  name: 'ConfirmModal',
  args: {
    className: '',
    close: () => console.log('close'),
    confirmButtonText: 'Confirm',
    description: 'Removing the device will also remove all data associated with it.',
    header: 'Remove device?',
    maxWidth: 'md',
    onConfirm: () => console.log('confirmed'),
    open: true,
    toType: 'my-device-name'
  }
};

export const WithoutTypeConfirmation: Story = {
  name: 'Without Type Confirmation',
  args: {
    ...Primary.args,
    description: 'The deployment will be aborted and all pending devices will be skipped.',
    header: 'Abort deployment?',
    toType: undefined
  }
};

export const NonDestructive: Story = {
  name: 'Non Destructive',
  args: {
    ...Primary.args,
    confirmButtonText: 'Save changes',
    description: 'The updated settings will be applied to all devices in this group.',
    header: 'Apply settings?',
    isDanger: false,
    maxWidth: 'sm',
    toType: undefined
  }
};

export const WithRichDescription: Story = {
  name: 'With Rich Description',
  args: {
    ...Primary.args,
    description: (
      <div className="flexbox column">
        <b>This action cannot be undone</b>
        <span>All artifacts belonging to this release will be removed as well.</span>
      </div>
    ),
    header: 'Delete release?',
    toType: 'release-1.0.0'
  }
};
