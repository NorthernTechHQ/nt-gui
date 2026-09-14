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

import { Code, CopyCode, InlineCode } from './CopyCode';

const multilineCode = `mender-cli login --server https://hosted.mender.io --username demo@northern.tech
mender-cli artifacts upload --server https://hosted.mender.io release-1.2.3.mender
mender-cli devices list --server https://hosted.mender.io`;

const meta: Meta<typeof CopyCode> = {
  title: 'common-ui/CopyCode',
  component: CopyCode,
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'full'] },
    variant: { control: 'select', options: ['code1', 'code2'] },
    withDescription: { type: 'boolean' }
  }
};

export default meta;

type Story = StoryObj<typeof CopyCode>;

export const Primary: Story = {
  render: props => <CopyCode {...props} />,
  name: 'CopyCode',
  args: {
    code: 'mender-cli login --server https://hosted.mender.io',
    onCopy: () => alert('copied this'),
    size: 'full',
    variant: 'code1',
    withDescription: true
  }
};

export const IconOnly: Story = {
  render: props => <CopyCode {...props} />,
  name: 'CopyCode - icon only',
  args: {
    ...Primary.args,
    withDescription: false
  }
};

export const Scrollable: Story = {
  render: props => <CopyCode {...props} />,
  name: 'CopyCode - limited height',
  args: {
    ...Primary.args,
    code: multilineCode,
    size: 'small'
  }
};

export const WithoutBackground: Story = {
  render: props => <CopyCode {...props} />,
  name: 'CopyCode - no background',
  args: {
    ...Primary.args,
    noBackground: true,
    variant: 'code2'
  }
};

type CodeStory = StoryObj<typeof Code>;

export const Secondary: CodeStory = {
  render: props => <Code {...props} />,
  name: 'Code',
  args: {
    className: '',
    children: 'hackety hack {} , <>/|| very 123',
    noBackground: false,
    size: 'full',
    style: {}
  }
};

type InlineCodeStory = StoryObj<typeof InlineCode>;

export const Tertiary: InlineCodeStory = {
  render: props => (
    <div>
      run <InlineCode {...props} /> to get started
    </div>
  ),
  name: 'InlineCode',
  args: {
    children: 'mender-cli login',
    variant: 'code1'
  }
};
