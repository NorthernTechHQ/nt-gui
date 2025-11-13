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
import { useForm } from 'react-hook-form';

import { FormCheckbox } from './FormCheckbox';
import { Form } from './Form';

const FormCheckboxWrapper = (props: any) => {
  const { control } = useForm({ defaultValues: { agree: false } });
  return <FormCheckbox control={control} {...props} />;
};

const meta: Meta<typeof FormCheckbox> = {
  component: FormCheckbox,
  title: 'common-ui/forms/FormCheckbox'
};

export default meta;

type Story = StoryObj<typeof FormCheckbox>;

export const Primary: Story = {
  name: 'FormCheckbox',
  render: args => (
    <Form defaultValues={{ agree: false }} onSubmit={() => {}}>
      <FormCheckboxWrapper {...args} />
    </Form>
  ),
  args: {
    id: 'agree',
    label: 'I agree to the terms and conditions',
    disabled: false,
    required: false
  }
};
