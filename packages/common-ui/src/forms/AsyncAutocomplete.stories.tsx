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

import { AsyncAutocomplete, ControlledAsyncAutocomplete } from './AsyncAutocomplete';
import { Form } from './Form';

interface ReleaseOption {
  id: string;
  title: string;
}

const options: ReleaseOption[] = [
  { id: 'release-a', title: 'Application 1.0.0' },
  { id: 'release-b', title: 'Application 1.1.0' },
  { id: 'release-c', title: 'System update 2023-04' },
  { id: 'release-d', title: 'System update 2023-05' }
];

const sharedProps = {
  label: 'Select a release',
  onSearch: (searchTerm: string) => console.log('onSearch:', searchTerm),
  options,
  placeholder: 'Start typing to search...',
  style: { width: 400 }
};

const meta: Meta<typeof AsyncAutocomplete<ReleaseOption>> = {
  component: AsyncAutocomplete,
  title: 'common-ui/forms/AsyncAutocomplete'
};

export default meta;

type Story = StoryObj<typeof AsyncAutocomplete<ReleaseOption>>;

export const Primary: Story = {
  name: 'AsyncAutocomplete',
  args: {
    ...sharedProps,
    labelAttribute: 'title',
    selectionAttribute: 'id',
    onChange: (value: ReleaseOption | string | null) => console.log('onChange:', value)
  }
};

export const Loading: Story = {
  name: 'Loading Results',
  args: {
    ...Primary.args,
    isLoading: true,
    options: []
  }
};

export const WithSelection: Story = {
  name: 'With Preselected Value',
  args: {
    ...Primary.args,
    value: options[1]
  }
};

export const Controlled: Story = {
  name: 'ControlledAsyncAutocomplete',
  args: {
    ...Primary.args
  },
  render: () => (
    <Form defaultValues={{ release: null }} onSubmit={() => {}}>
      <ControlledAsyncAutocomplete {...sharedProps} name="release" />
    </Form>
  )
};
