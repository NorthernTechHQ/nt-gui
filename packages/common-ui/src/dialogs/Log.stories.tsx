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

import { LogDialog } from './Log';

const sampleLogData = `2025-01-15 10:30:45 INFO: Starting deployment
2025-01-15 10:30:46 INFO: Downloading artifact
2025-01-15 10:30:48 INFO: Download complete
2025-01-15 10:30:49 INFO: Installing update
2025-01-15 10:31:15 INFO: Installation complete
2025-01-15 10:31:16 INFO: Rebooting device
2025-01-15 10:31:45 INFO: Device online
2025-01-15 10:31:46 INFO: Deployment successful`;

const meta: Meta<typeof LogDialog> = {
  component: LogDialog,
  title: 'common-ui/dialogs/Log'
};

export default meta;

type Story = StoryObj<typeof LogDialog>;

export const DeviceLog: Story = {
  name: 'Device Deployment Log',
  args: {
    type: 'deviceLog',
    logData: sampleLogData,
    context: {
      device: 'device-123',
      releaseName: 'release-v1.0.0',
      date: '2025-01-15'
    },
    onClose: () => console.log('Dialog closed')
  }
};

export const ConfigLog: Story = {
  name: 'Config Update Log',
  args: {
    type: 'configUpdateLog',
    logData: `2025-01-15 10:30:45 INFO: Starting configuration update
2025-01-15 10:30:46 INFO: Applying new configuration
2025-01-15 10:30:47 INFO: Configuration updated successfully`,
    context: {},
    onClose: () => console.log('Dialog closed')
  }
};
