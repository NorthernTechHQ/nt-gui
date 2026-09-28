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

import { CodeEditor } from './CodeEditor';

const jsonSample = `{
  "artifact_name": "release-1.2.3",
  "device_types_compatible": ["qemux86-64", "raspberrypi4"],
  "updates": [{ "type_info": { "type": "rootfs-image" } }]
}`;

const yamlSample = `variables:
  MENDER_ARTIFACT_NAME: release-1.2.3
  DEVICE_TYPE: qemux86-64
stages:
  - build
  - publish
`;

const meta: Meta<typeof CodeEditor> = {
  component: CodeEditor,
  title: 'common-ui/CodeEditor'
};

export default meta;

type Story = StoryObj<typeof CodeEditor>;

export const Primary: Story = {
  name: 'CodeEditor',
  args: {
    className: '',
    language: 'json',
    onChange: (value: string | undefined) => console.log('editor content changed:', value),
    readOnly: false,
    value: jsonSample
  }
};

export const ReadOnly: Story = {
  name: 'Read only',
  args: {
    ...Primary.args,
    readOnly: true
  }
};

export const WithCustomOptions: Story = {
  name: 'With custom options',
  args: {
    ...Primary.args,
    language: 'yaml',
    options: { lineNumbers: 'off', minimap: { enabled: true }, wordWrap: 'off' },
    value: yamlSample
  }
};
