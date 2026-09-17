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
import { Provider } from 'react-redux';

import { defaultState as preloadedState } from '@/testUtils';
import { getConfiguredStore } from '@northern.tech/store/store';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
  title: 'common-ui/forms/FileUpload',
  decorators: [
    Story => {
      const store = getConfiguredStore({ preloadedState });
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    }
  ]
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Primary: Story = {
  name: 'FileUpload',
  args: {
    enableContentReading: true,
    onFileChange: (content?: string) => alert(`file content: ${content}`),
    onFileSelect: (file?: File) => alert(`file selected: ${file?.name}`),
    placeholder: 'Drag here or click to browse for a file to upload',
    style: { maxWidth: 500 }
  }
};

export const WithRichPlaceholder: Story = {
  name: 'With Rich Placeholder',
  args: {
    ...Primary.args,
    placeholder: (
      <>
        Drag here or <b>click to browse</b> for your <code>id_rsa.pub</code>
      </>
    )
  }
};

export const WithSelectedFile: Story = {
  name: 'With Selected File',
  args: {
    ...Primary.args,
    fileNameSelection: 'id_rsa.pub'
  }
};

export const WithValidatedFile: Story = {
  name: 'With Validated File',
  args: {
    ...Primary.args,
    fileNameSelection: 'release-v2.1.0.mender',
    isValid: true
  }
};

export const WithoutContentReading: Story = {
  name: 'Without Content Reading',
  args: {
    ...Primary.args,
    enableContentReading: false,
    placeholder: 'Only the file reference is passed on - the content is not read'
  }
};
