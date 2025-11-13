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

import { CountrySelect } from './CountrySelect';

const meta: Meta<typeof CountrySelect> = {
  component: CountrySelect,
  title: 'common-ui/forms/CountrySelect'
};

export default meta;

type Story = StoryObj<typeof CountrySelect>;

export const Primary: Story = {
  name: 'CountrySelect',
  args: {
    error: false,
    defaultValue: 'NO',
    helperText: 'Country is required',
    onChange: (country: any) => alert('Selected country:', country)
  }
};
