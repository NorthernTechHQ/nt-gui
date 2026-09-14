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

import { ControlledCountrySelect, findCountry } from './CountrySelect';
import { Form } from './Form';

const meta: Meta<typeof ControlledCountrySelect> = {
  component: ControlledCountrySelect,
  title: 'common-ui/forms/CountrySelect'
};

export default meta;

type Story = StoryObj<typeof ControlledCountrySelect>;

export const Primary: Story = {
  name: 'ControlledCountrySelect',
  render: args => (
    <Form defaultValues={{ country: null }} onSubmit={data => console.log('submitted:', data)}>
      <ControlledCountrySelect {...args} />
    </Form>
  ),
  args: { id: 'country' }
};

export const Preselected: Story = {
  name: 'With Preselected Country',
  render: args => (
    <Form defaultValues={{ country: findCountry('NO') }} onSubmit={data => console.log('submitted:', data)}>
      <ControlledCountrySelect {...args} />
    </Form>
  ),
  args: { ...Primary.args }
};

export const Required: Story = {
  name: 'Required',
  render: args => (
    <Form defaultValues={{ country: null }} onSubmit={data => console.log('submitted:', data)} showButtons submitLabel="Submit">
      <ControlledCountrySelect {...args} />
    </Form>
  ),
  args: { ...Primary.args, required: true }
};
