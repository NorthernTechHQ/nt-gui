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

import { InventoryTable } from './InventoryTable';

const config: Record<string, string> = {
  artifact_name: 'my-demo-app-1.0.0',
  device_type: 'raspberrypi4',
  hostname: 'raspberrypi',
  ipv4_wlan0: '192.168.10.141/24',
  kernel: 'Linux version 5.10.63-v7l+ (dom@buildbot)',
  mac_wlan0: 'dc:a6:32:0b:4e:3c',
  mem_total_kB: '3999472',
  mender_client_version: '3.7.0',
  os: 'Raspbian GNU/Linux 11 (bullseye)',
  rootfs_type: 'ext4'
};

const meta: Meta<typeof InventoryTable> = {
  component: InventoryTable,
  title: 'common-ui/InventoryTable'
};

export default meta;

type Story = StoryObj<typeof InventoryTable>;

export const Primary: Story = {
  name: 'InventoryTable',
  args: { config }
};

export const Copyable: Story = {
  name: 'With Copy Support',
  args: {
    config,
    setSnackbar: (message: string) => console.log(message)
  }
};
