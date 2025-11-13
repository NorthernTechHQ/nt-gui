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

import { AsyncAutocomplete } from './AsyncAutocomplete';

const sampleOptions = [
  { id: '1', name: 'Option 1', label: 'First Option' },
  { id: '2', name: 'Option 2', label: 'Second Option' },
  { id: '3', name: 'Option 3', label: 'Third Option' },
  { id: '4', name: 'Option 4', label: 'Fourth Option' }
];

const meta: Meta<typeof AsyncAutocomplete> = {
  component: AsyncAutocomplete,
  title: 'common-ui/AsyncAutocomplete'
};

export default meta;

type Story = StoryObj<typeof AsyncAutocomplete>;

export const Primary: Story = {
  name: 'AsyncAutocomplete',
  args: {
    id: 'async-autocomplete-demo',
    label: 'Select an option',
    placeholder: 'Start typing...',
    selectionAttribute: 'id',
    labelAttribute: 'label',
    options: sampleOptions,
    initialValue: '',
    isLoading: false,
    onChange: (value: string) => console.log('onChange:', value),
    onChangeSelection: (selection: any) => console.log('onChangeSelection:', selection),
    styles: { textField: { width: 300 } }
  }
};
