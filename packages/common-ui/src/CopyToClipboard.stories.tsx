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
import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { CopyToClipboard } from './CopyToClipboard';

const meta: Meta<typeof CopyToClipboard> = {
  component: CopyToClipboard,
  title: 'common-ui/CopyToClipboard'
};

export default meta;

type Story = StoryObj<typeof CopyToClipboard>;

export const Primary: Story = {
  name: 'CopyToClipboard',
  render: args => (
    <CopyToClipboard {...args}>
      <Button variant="contained">Click to Copy</Button>
    </CopyToClipboard>
  ),
  args: {
    text: 'This text will be copied to clipboard',
    onCopy: (text: string, result: boolean) => alert(`Copied: "${text}" - Success: ${result}`)
  }
};
