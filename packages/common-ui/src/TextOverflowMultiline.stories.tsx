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

import { TextOverflowMultiline } from './TextOverflowMultiline';

const longText =
  'This release contains the delta update payload for the gateway fleet, together with the accompanying provisioning scripts, the updated device configuration defaults and a set of release notes that are deliberately long enough to be clamped by the component.';

const meta: Meta<typeof TextOverflowMultiline> = {
  component: TextOverflowMultiline,
  title: 'common-ui/TextOverflowMultiline',
  decorators: [
    Story => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof TextOverflowMultiline>;

export const Primary: Story = {
  name: 'TextOverflowMultiline',
  args: {
    children: longText,
    variant: 'body1'
  }
};

export const SingleLine: Story = {
  name: 'Single Line',
  args: {
    ...Primary.args,
    lines: 1
  }
};

export const ManyLines: Story = {
  name: 'Many Lines',
  args: {
    ...Primary.args,
    lines: 5
  }
};

export const WithOverflowCallback: Story = {
  name: 'With Overflow Callback',
  args: {
    ...Primary.args,
    onOverflowChange: (isOverflowing: boolean) => console.log('overflowing:', isOverflowing)
  }
};
