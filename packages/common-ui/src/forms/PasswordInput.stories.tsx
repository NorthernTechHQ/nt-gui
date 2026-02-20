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
import { useForm } from 'react-hook-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Form } from './Form';
import { PasswordInput } from './PasswordInput';

const PasswordInputWrapper = (props: any) => {
  const { control } = useForm({ defaultValues: { password: '' } });
  return <PasswordInput control={control} {...props} />;
};

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,
  title: 'common-ui/forms/PasswordInput'
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Primary: Story = {
  name: 'PasswordInput',
  render: args => (
    <Form defaultValues={{ password: '' }} onSubmit={() => {}}>
      <PasswordInputWrapper {...args} />
    </Form>
  ),
  args: {
    id: 'password',
    label: 'Password',
    disabled: false,
    required: false,
    create: false,
    generate: false,
    edit: false
  }
};

export const WithGenerate: Story = {
  name: 'With Generate Button',
  render: args => (
    <Form defaultValues={{ password: '' }} onSubmit={() => {}}>
      <PasswordInputWrapper {...args} />
    </Form>
  ),
  args: {
    ...Primary.args,
    generate: true,
    create: true,
    required: true
  }
};
