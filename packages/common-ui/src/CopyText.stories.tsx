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

import { CopyTextToClipboard as CopyText } from './CopyText';

const meta: Meta<typeof CopyText> = {
  title: 'common-ui/CopyText',
  component: CopyText
};

export default meta;

type Story = StoryObj<typeof CopyText>;

export const Primary: Story = {
  name: 'CopyText',
  args: {
    notify: true,
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.mender-demo-token',
    onCopy: () => alert('copied this')
  }
};

export const WithoutNotification: Story = {
  name: 'Without notification',
  args: {
    ...Primary.args,
    notify: false
  }
};
