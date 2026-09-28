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
import { TextField } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { ControlledAutoComplete } from './Autocomplete';
import { Form } from './Form';

const updateTypes = ['single-file', 'directory', 'rootfs-image', 'deb', 'docker'];

const meta: Meta<typeof ControlledAutoComplete<string>> = {
  component: ControlledAutoComplete,
  title: 'common-ui/forms/Autocomplete'
};

export default meta;

type Story = StoryObj<typeof ControlledAutoComplete<string>>;

export const Primary: Story = {
  name: 'Autocomplete',
  render: args => (
    <Form defaultValues={{ updateType: null }} onSubmit={() => {}}>
      <ControlledAutoComplete {...args} />
    </Form>
  ),
  args: {
    autoHighlight: true,
    filterSelectedOptions: true,
    name: 'updateType',
    options: updateTypes,
    renderInput: params => <TextField {...params} label="Update type" placeholder="Any" style={{ width: 300 }} />
  }
};

export const FreeSolo: Story = {
  name: 'Free Solo',
  render: args => (
    <Form defaultValues={{ updateType: '' }} onSubmit={() => {}}>
      <ControlledAutoComplete {...args} />
    </Form>
  ),
  args: {
    ...Primary.args,
    freeSolo: true,
    handleHomeEndKeys: true,
    renderInput: params => <TextField {...params} label="Update type" placeholder="Type or select a type" style={{ width: 300 }} />
  }
};

export const Disabled: Story = {
  name: 'Disabled',
  render: args => (
    <Form defaultValues={{ updateType: 'rootfs-image' }} onSubmit={() => {}}>
      <ControlledAutoComplete {...args} />
    </Form>
  ),
  args: {
    ...Primary.args,
    disabled: true
  }
};
