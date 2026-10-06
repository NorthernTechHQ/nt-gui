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
import type { FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

import { MenuItem, Select, TextField } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import type { FilterDefinition } from './Filters';
import { Filters } from './Filters';

type SampleFilterProps = { name: string } & Record<string, unknown>;

const FilterTextField = ({ name, ...componentProps }: SampleFilterProps) => {
  const { control } = useFormContext();
  const placeholder = typeof componentProps.placeholder === 'string' ? componentProps.placeholder : '';
  return <Controller control={control} name={name} render={({ field }) => <TextField {...field} placeholder={placeholder} size="small" />} />;
};

const FilterSelect = ({ name, ...componentProps }: SampleFilterProps) => {
  const { control } = useFormContext();
  const options = Array.isArray(componentProps.options) ? (componentProps.options as string[]) : [];
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select {...field} displayEmpty size="small" style={{ minWidth: 160 }}>
          <MenuItem value="">Any</MenuItem>
          {options.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};

const filters: FilterDefinition[] = [
  { Component: FilterTextField, componentProps: { placeholder: 'e.g. production gateway' }, key: 'name', title: 'Device name' },
  { Component: FilterSelect, componentProps: { options: ['accepted', 'pending', 'preauthorized', 'rejected'] }, key: 'status', title: 'Status' },
  { Component: FilterSelect, componentProps: { options: ['qemux86-64', 'raspberrypi4', 'beaglebone'] }, key: 'device_type', title: 'Device type' }
];

const defaultValues: FieldValues = { device_type: '', name: '', status: '' };

const meta: Meta<typeof Filters> = {
  component: Filters,
  title: 'common-ui/forms/Filters'
};

export default meta;

type Story = StoryObj<typeof Filters>;

export const Primary: Story = {
  name: 'Filters',
  args: {
    defaultValues,
    filters,
    initialValues: defaultValues,
    onChange: (values: FieldValues) => console.log('filter values changed:', values)
  }
};

export const WithInitialValues: Story = {
  name: 'With Initial Values',
  args: {
    ...Primary.args,
    initialValues: { device_type: 'qemux86-64', name: 'gateway', status: 'accepted' }
  }
};

export const WithDirtyField: Story = {
  name: 'With Dirty Field',
  args: {
    ...Primary.args,
    clearDirty: (field: string) => console.log('dirty state cleared for:', field),
    dirtyField: 'status'
  }
};

export const WithFieldResetTrigger: Story = {
  name: 'With Field Reset Trigger',
  args: {
    ...Primary.args,
    fieldResetTrigger: 'name',
    initialValues: { device_type: '', name: 'gateway', status: 'accepted' }
  }
};
