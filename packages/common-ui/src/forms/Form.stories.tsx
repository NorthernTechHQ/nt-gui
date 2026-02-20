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

import { Form } from './Form';

const SampleFormContent = () => {
  const { control } = useFormContext();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field, fieldState }) => <TextField {...field} label="Name" error={!!fieldState.error} helperText={fieldState.error?.message} />}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: 'Email is required' }}
        render={({ field, fieldState }) => (
          <TextField {...field} label="Email" type="email" error={!!fieldState.error} helperText={fieldState.error?.message} />
        )}
      />
    </div>
  );
};

const meta: Meta<typeof Form> = {
  component: Form,
  title: 'common-ui/forms/Form'
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Primary: Story = {
  name: 'Form',
  render: args => (
    <Form {...args}>
      <SampleFormContent />
    </Form>
  ),
  args: {
    defaultValues: { name: '', email: '' },
    onSubmit: (data: any) => {
      console.log('Form submitted:', data);
      alert(`Form submitted with: ${JSON.stringify(data)}`);
    },
    showButtons: true,
    submitLabel: 'Submit'
  }
};

export const WithCancel: Story = {
  name: 'Form with Cancel Button',
  render: args => (
    <Form {...args}>
      <SampleFormContent />
    </Form>
  ),
  args: {
    ...Primary.args,
    handleCancel: () => alert('Form cancelled')
  }
};
