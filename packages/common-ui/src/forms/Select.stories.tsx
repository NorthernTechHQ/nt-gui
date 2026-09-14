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

import { Select } from './Select';

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

const meta: Meta<typeof Select<ExpirationOption>> = {
  component: Select,
  title: 'common-ui/forms/Select'
};

export default meta;

type Story = StoryObj<typeof Select<ExpirationOption>>;

export const Primary: Story = {
  name: 'Select',
  args: {
    label: 'Expiration',
    options: expirationOptions,
    value: '30d',
    width: 300
  }
};

export const WithPlaceholder: Story = {
  name: 'With Placeholder',
  args: {
    ...Primary.args,
    label: undefined,
    placeholder: 'Select an expiration',
    value: ''
  }
};

export const Multiple: Story = {
  name: 'Multiple',
  args: {
    ...Primary.args,
    multiple: true,
    value: ['7d', '30d']
  }
};

export const WithDisabledOptions: Story = {
  name: 'With Disabled Options',
  args: {
    ...Primary.args,
    getOptionDisabled: (option: ExpirationOption) => !!option.unavailable
  }
};

export const WithHelperText: Story = {
  name: 'With Helper Text',
  args: {
    ...Primary.args,
    error: true,
    helperText: 'Please pick a shorter expiration'
  }
};

export const WithCustomOptions: Story = {
  name: 'With Custom Option Rendering',
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
