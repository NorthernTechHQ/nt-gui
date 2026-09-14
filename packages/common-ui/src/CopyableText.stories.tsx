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

import { CopyableText } from './CopyableText';

const meta: Meta<typeof CopyableText> = {
  component: CopyableText,
  title: 'common-ui/CopyableText',
  decorators: [
    Story => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof CopyableText>;

export const Primary: Story = {
  name: 'CopyableText',
  args: {
    children: 'd4ae1ba9-7b52-4b91-a1bc-8c3a1f0c1f4e',
    onCopy: () => console.log('copied'),
    title: 'Device id'
  }
};

export const WithoutCopy: Story = {
  name: 'Without Copy',
  args: {
    children: 'd4ae1ba9-7b52-4b91-a1bc-8c3a1f0c1f4e',
    title: 'Device id'
  }
};

export const WithComponentContent: Story = {
  name: 'With Component Content',
  args: {
    children: (
      <span>
        <b>mac</b>: dc:a6:32:12:ad:bf
      </span>
    ),
    onCopy: () => console.log('copied')
  }
};
