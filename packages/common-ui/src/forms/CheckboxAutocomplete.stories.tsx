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

import { CheckboxAutocomplete, ControlledCheckboxAutocomplete } from './CheckboxAutocomplete';
import { Form } from './Form';

interface GroupOption {
  id: string;
  title: string;
}

const options: GroupOption[] = [
  { id: 'group-a', title: 'Production devices' },
  { id: 'group-b', title: 'Staging devices' },
  { id: 'group-c', title: 'Test bench' },
  { id: 'group-d', title: 'Field trial' }
];

const sharedProps = {
  label: 'Device groups',
  options,
  placeholder: 'Select groups...',
  style: { width: 400 }
};

const meta: Meta<typeof CheckboxAutocomplete<GroupOption>> = {
  component: CheckboxAutocomplete,
  title: 'common-ui/forms/CheckboxAutocomplete'
};

export default meta;

type Story = StoryObj<typeof CheckboxAutocomplete<GroupOption>>;

export const Primary: Story = {
  name: 'CheckboxAutocomplete',
  args: {
    ...sharedProps,
    labelAttribute: 'title',
    onChange: (value: GroupOption[]) => console.log('onChange:', value)
  }
};

export const WithSelection: Story = {
  name: 'With Preselected Values',
  args: {
    ...Primary.args,
    value: [options[0], options[2]]
  }
};

export const ChipDisplay: Story = {
  name: 'Chip Display',
  args: {
    ...Primary.args,
    chipDisplay: true,
    value: [options[0], options[1]]
  }
};

export const Controlled: Story = {
  name: 'ControlledCheckboxAutocomplete',
  args: {
    ...Primary.args
  },
  render: () => (
    <Form defaultValues={{ groups: [options[1]] }} onSubmit={() => {}}>
      <ControlledCheckboxAutocomplete {...sharedProps} name="groups" />
    </Form>
  )
};
