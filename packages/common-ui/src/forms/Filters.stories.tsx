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
import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Filters } from './Filters';

const SampleTextField = ({ name }: { name: string }) => {
  const { control } = useFormContext();
  return <Controller name={name} control={control} render={({ field }) => <TextField {...field} size="small" placeholder="Enter value" />} />;
};

const sampleFilters = [
  {
    key: 'name',
    title: 'Name',
    Component: SampleTextField,
    componentProps: {}
  },
  {
    key: 'status',
    title: 'Status',
    Component: SampleTextField,
    componentProps: {}
  }
];

const meta: Meta<typeof Filters> = {
  component: Filters,
  title: 'common-ui/forms/Filters'
};

export default meta;

type Story = StoryObj<typeof Filters>;

export const Primary: Story = {
  name: 'Filters',
  args: {
    defaultValues: { name: '', status: '' },
    initialValues: { name: '', status: '' },
    filters: sampleFilters,
    onChange: (values: any) => console.log('Filter values changed:', values),
    fieldResetTrigger: '',
    dirtyField: '',
    clearDirty: () => {}
  }
};
