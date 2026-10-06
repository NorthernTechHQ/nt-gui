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
import type { Meta, StoryObj } from '@storybook/react-vite';

import { EditableNameInput } from './EditableNameInput';

const meta: Meta<typeof EditableNameInput> = {
  component: EditableNameInput,
  title: 'common-ui/EditableNameInput'
};

export default meta;

type Story = StoryObj<typeof EditableNameInput>;

export const Primary: Story = {
  render: props => <EditableNameInput {...props} />,
  name: 'EditableNameInput',
  args: {
    id: 'device-name',
    isHovered: true,
    name: 'raspberrypi-in-the-office',
    onSave: async (value: string) => console.log(`saving ${value}`),
    placeholder: 'Name this device'
  }
};

export const NotHovered: Story = {
  name: 'Without Hover',
  args: {
    ...Primary.args,
    isHovered: false
  }
};

export const Empty: Story = {
  name: 'Empty',
  args: {
    ...Primary.args,
    name: ''
  }
};
