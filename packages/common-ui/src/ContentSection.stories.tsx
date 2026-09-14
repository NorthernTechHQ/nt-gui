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
import { Button, Chip } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { ContentSection } from './ContentSection';
import { TwoColumnData } from './TwoColumnData';

const deviceIdentity = {
  mac: 'dc:a6:32:12:ad:bf',
  sku: 'raspberrypi4',
  sn: '10000000e6f1b8b9',
  status: 'accepted'
};

const meta: Meta<typeof ContentSection> = {
  component: ContentSection,
  title: 'common-ui/ContentSection'
};

export default meta;

type Story = StoryObj<typeof ContentSection>;

export const Primary: Story = {
  name: 'ContentSection',
  args: {
    title: 'Device identity',
    children: <TwoColumnData data={deviceIdentity} />
  }
};

export const WithPostTitle: Story = {
  name: 'With post title',
  args: {
    ...Primary.args,
    postTitle: <Chip clickable label="Test device" size="small" />
  }
};

export const AddOn: Story = {
  name: 'Add-on section',
  args: {
    ...Primary.args,
    title: 'Monitoring',
    isAddOn: true,
    children: <div>Configure alerts to be notified about issues on your devices.</div>
  }
};

export const WithTitleEnd: Story = {
  name: 'With title end',
  args: {
    ...Primary.args,
    title: 'Installed software',
    titleEnd: <Button size="small">Refresh</Button>
  }
};

export const WithoutMargin: Story = {
  name: 'Without margin',
  args: {
    ...Primary.args,
    disableMargin: true
  }
};
