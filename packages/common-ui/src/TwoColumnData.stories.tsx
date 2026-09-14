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
import { Chip } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { ColumnWidthProvider, SynchronizedTwoColumnData, TwoColumnData } from './TwoColumnData';

const data: Record<string, string | string[]> = {
  artifact_name: 'my-demo-app-1.0.0',
  device_type: 'raspberrypi4',
  hostname: 'raspberrypi',
  mac_wlan0: 'dc:a6:32:0b:4e:3c',
  tags: ['production', 'europe']
};

const meta: Meta<typeof TwoColumnData> = {
  component: TwoColumnData,
  title: 'common-ui/TwoColumnData'
};

export default meta;

type Story = StoryObj<typeof TwoColumnData>;

export const Primary: Story = {
  render: props => <TwoColumnData {...props} />,
  name: 'TwoColumnData',
  args: {
    data,
    style: { maxWidth: 600 }
  }
};

export const Copyable: Story = {
  name: 'With Copy Support',
  args: {
    ...Primary.args,
    setSnackbar: (message: string) => console.log(message)
  }
};

export const ChipLikeKeys: Story = {
  name: 'Chip Like Keys',
  args: {
    ...Primary.args,
    chipLikeKey: true
  }
};

export const CustomValues: Story = {
  name: 'Custom Value Components',
  args: {
    ...Primary.args,
    data: {
      ...data,
      status: <Chip label="accepted" size="small" />,
      uiPasswordRequired: true
    }
  }
};

export const Synchronized: Story = {
  name: 'Synchronized Column Width',
  render: ({ style }) => (
    <ColumnWidthProvider>
      <SynchronizedTwoColumnData style={style} data={{ short: 'value' }} />
      <SynchronizedTwoColumnData style={style} data={{ a_much_longer_attribute_name: 'another value' }} />
    </ColumnWidthProvider>
  ),
  args: {
    style: { maxWidth: 600 }
  }
};
