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

import { SharedSnackbar } from './SharedSnackbar';

const meta: Meta<typeof SharedSnackbar> = {
  component: SharedSnackbar,
  title: 'common-ui/SharedSnackbar'
};

export default meta;

type Story = StoryObj<typeof SharedSnackbar>;

export const Primary: Story = {
  name: 'SharedSnackbar',
  args: {
    snackbar: {
      open: true,
      message: 'This is a snackbar message. Click to copy to clipboard.',
      autoHideDuration: 5000
    },
    setSnackbar: (message: string) => alert(`Snackbar closed/updated: ${message}`)
  }
};

export const PreventCopy: Story = {
  name: 'Prevent Click to Copy',
  args: {
    snackbar: {
      open: true,
      message: 'This snackbar cannot be copied by clicking.',
      autoHideDuration: 5000,
      preventClickToCopy: true
    },
    setSnackbar: (message: string) => alert(`Snackbar closed/updated: ${message}`)
  }
};
