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

import { ControlledSelect } from './ControlledSelect';
import { Form } from './Form';

interface ExpirationOption {
  id: string;
  title: string;
  unavailable?: boolean;
}

const expirationOptions: ExpirationOption[] = [
  { id: '7d', title: '7 days' },
  { id: '30d', title: '30 days' },
  { id: '90d', title: '90 days' },
  { id: '1y', title: 'A year' },
  { id: 'never', title: 'Never', unavailable: true }
];

const meta: Meta<typeof ControlledSelect<ExpirationOption>> = {
  component: ControlledSelect,
  title: 'common-ui/forms/ControlledSelect'
};

export default meta;

type Story = StoryObj<typeof ControlledSelect<ExpirationOption>>;

export const Primary: Story = {
  name: 'ControlledSelect',
  render: args => (
    <Form defaultValues={{ expiresIn: '' }} onSubmit={() => {}}>
      <ControlledSelect {...args} />
    </Form>
  ),
  args: {
    labelAttribute: 'title',
    name: 'expiresIn',
    options: expirationOptions,
    placeholder: 'Select an expiration',
    selectionAttribute: 'id',
    width: 300
  }
};

export const WithSelection: Story = {
  name: 'With Preselected Value',
  render: args => (
    <Form defaultValues={{ expiresIn: '30d' }} onSubmit={() => {}}>
      <ControlledSelect {...args} />
    </Form>
  ),
  args: { ...Primary.args }
};

export const WithDisabledOptions: Story = {
  name: 'With Disabled Options',
  render: Primary.render,
  args: {
    ...Primary.args,
    getOptionDisabled: (option: ExpirationOption) => !!option.unavailable,
    hideEmptyOption: true
  }
};

export const WithCustomOptions: Story = {
  name: 'With Custom Option Rendering',
  render: Primary.render,
  args: {
    ...Primary.args,
    renderOption: (option: ExpirationOption) => (
      <div className="flexbox space-between" style={{ width: '100%' }}>
        <span>{option.title}</span>
        <span className="muted">{option.id}</span>
      </div>
    )
  }
};
