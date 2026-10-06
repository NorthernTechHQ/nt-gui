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

import Search, { ControlledSearch } from './Search';
import { Form } from './forms/Form';

const meta: Meta<typeof Search> = {
  component: Search,
  title: 'common-ui/Search'
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Primary: Story = {
  name: 'Search',
  args: {
    className: '',
    searchTerm: '',
    placeholder: 'Search devices',
    showSearchIcon: true,
    onSearch: async (term: string, shouldTrigger: boolean) => {
      console.log('Search triggered:', { term, shouldTrigger });
      return Promise.resolve();
    }
  }
};

export const WithSearchTerm: Story = {
  name: 'With initial search term',
  args: {
    ...Primary.args,
    searchTerm: 'qemux86-64'
  }
};

export const ClearButtonOnHover: Story = {
  name: 'Clear button on hover',
  args: {
    ...Primary.args,
    clearButtonOnHover: true,
    searchTerm: 'raspberrypi'
  }
};

export const WithoutSearchIcon: Story = {
  name: 'Without search icon',
  args: {
    ...Primary.args,
    showSearchIcon: false
  }
};

export const TriggeredOnly: Story = {
  name: 'Only searching on submit',
  args: {
    ...Primary.args,
    trigger: true
  }
};

type ControlledSearchStory = StoryObj<typeof ControlledSearch>;

export const Secondary: ControlledSearchStory = {
  name: 'ControlledSearch',
  render: props => (
    <Form defaultValues={{ search: '' }} onSubmit={data => console.log('Form submitted:', data)}>
      <ControlledSearch {...props} />
    </Form>
  ),
  args: {
    asFormField: true,
    className: '',
    name: 'search',
    placeholder: 'Filter devices'
  }
};
