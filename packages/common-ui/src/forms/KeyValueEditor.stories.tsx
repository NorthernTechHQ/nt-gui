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

import { KeyValueEditor } from './KeyValueEditor';

const meta: Meta<typeof KeyValueEditor> = {
  component: KeyValueEditor,
  title: 'common-ui/forms/KeyValueEditor'
};

export default meta;

type Story = StoryObj<typeof KeyValueEditor>;

export const Primary: Story = {
  name: 'KeyValueEditor',
  args: {
    disabled: false,
    initialInput: {},
    onInputChange: (values: Record<string, string>) => console.log('Input changed:', values)
  }
};

export const WithInitialValues: Story = {
  name: 'With Initial Values',
  args: {
    disabled: false,
    initialInput: {
      environment: 'production',
      region: 'us-west-2',
      version: '1.0.0'
    },
    onInputChange: (values: Record<string, string>) => console.log('Input changed:', values)
  }
};
