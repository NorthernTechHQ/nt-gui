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
import { InputAdornment } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { NumberField } from './NumberField';

const meta: Meta<typeof NumberField> = {
  component: NumberField,
  title: 'common-ui/forms/NumberField',
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium']
    }
  }
};

export default meta;

type Story = StoryObj<typeof NumberField>;

export const Primary: Story = {
  name: 'NumberField',
  args: {
    id: 'deviceLimit',
    label: 'Device limit',
    defaultValue: 250,
    min: 0,
    max: 1000,
    helperText: 'The maximum number of devices allowed to authenticate'
  }
};

export const WithSteppers: Story = {
  name: 'With Steppers',
  args: {
    ...Primary.args,
    id: 'retries',
    label: 'Retries',
    defaultValue: 3,
    max: 10,
    step: 1,
    showSteps: true,
    helperText: 'Number of times a failed deployment is retried'
  }
};

export const Small: Story = {
  name: 'Small',
  args: {
    ...WithSteppers.args,
    size: 'small'
  }
};

export const WithError: Story = {
  name: 'With Error',
  args: {
    ...Primary.args,
    defaultValue: 1200,
    error: true,
    helperText: 'The device limit has to be between 0 and 1000'
  }
};

export const WithEndAdornment: Story = {
  name: 'With End Adornment',
  args: {
    id: 'retention',
    label: 'Retention',
    defaultValue: 30,
    min: 1,
    max: 365,
    endAdornment: <InputAdornment position="end">days</InputAdornment>,
    helperText: 'Number of days deployment reports are kept'
  }
};

export const Grouped: Story = {
  name: 'Grouped Formatting',
  args: {
    id: 'storage',
    label: 'Storage limit',
    defaultValue: 1500000,
    format: { useGrouping: true },
    endAdornment: <InputAdornment position="end">MB</InputAdornment>
  }
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    ...WithSteppers.args,
    disabled: true
  }
};

export const Required: Story = {
  name: 'Required',
  args: {
    ...Primary.args,
    required: true
  }
};
