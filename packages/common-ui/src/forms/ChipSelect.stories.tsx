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

import { ChipSelect } from './ChipSelect';
import { Form } from './Form';

type ChipSelectFormValues = { deviceTypes: string[] };

const options = ['raspberrypi4', 'raspberrypi5', 'beaglebone', 'qemux86-64'];

const defaultValues: ChipSelectFormValues = { deviceTypes: ['raspberrypi4', 'qemux86-64'] };

const meta: Meta<typeof ChipSelect<ChipSelectFormValues>> = {
  component: ChipSelect,
  title: 'common-ui/forms/ChipSelect',
  argTypes: {
    disabled: { control: { type: 'radio' }, options: [true, false] }
  }
};

export default meta;

type Story = StoryObj<typeof ChipSelect<ChipSelectFormValues>>;

export const Primary: Story = {
  name: 'ChipSelect',
  render: args => (
    <Form defaultValues={defaultValues} onSubmit={() => {}}>
      <ChipSelect {...args} />
    </Form>
  ),
  args: {
    className: '',
    disabled: false,
    helperText: 'Enter device types separated by a comma',
    label: 'Device types',
    name: 'deviceTypes',
    options,
    placeholder: 'Select device types'
  }
};

export const TruncatedList: Story = {
  name: 'Truncated Tag List',
  render: Primary.render,
  args: {
    ...Primary.args,
    chipDisplay: false,
    forcePopupIcon: true
  }
};

export const Disabled: Story = {
  name: 'Disabled',
  render: Primary.render,
  args: {
    ...Primary.args,
    disabled: true,
    helperText: undefined
  }
};

export const WithValidation: Story = {
  name: 'With Validation',
  render: args => (
    <Form defaultValues={{ deviceTypes: [] }} onSubmit={() => {}}>
      <ChipSelect {...args} />
    </Form>
  ),
  args: {
    ...Primary.args,
    rules: { required: 'At least one device type is required' }
  }
};
