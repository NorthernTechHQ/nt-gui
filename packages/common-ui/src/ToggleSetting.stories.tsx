// Copyright 2026 Northern.tech AS
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

import { ToggleSetting } from './ToggleSetting';

const meta: Meta<typeof ToggleSetting> = {
  component: ToggleSetting,
  title: 'common-ui/ToggleSetting'
};

export default meta;

type Story = StoryObj<typeof ToggleSetting>;

export const Primary: Story = {
  render: props => <ToggleSetting {...props} />,
  name: 'ToggleSetting',
  args: {
    description: 'Devices will be authorized automatically once they request authorization.',
    onClick: () => console.log('toggling the setting'),
    title: 'Auto-accept devices',
    value: false
  }
};

export const Enabled: Story = {
  name: 'Enabled',
  args: {
    ...Primary.args,
    value: true
  }
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    ...Primary.args,
    description: 'Upgrade to a paid plan to make use of this setting.',
    disabled: true,
    value: false
  }
};
