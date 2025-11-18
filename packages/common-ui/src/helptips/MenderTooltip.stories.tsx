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
import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import MenderTooltip, { MenderTooltipClickable } from './MenderTooltip';

const meta: Meta<typeof MenderTooltip> = {
  component: MenderTooltip,
  title: 'common-ui/helptips/MenderTooltip',
  includeStories: ['Primary', 'Clickable']
};

export default meta;

type Story = StoryObj<typeof MenderTooltip>;

export const Primary: Story = {
  name: 'MenderTooltip',
  render: args => (
    <div style={{ padding: 50 }}>
      <MenderTooltip {...args}>
        <Button variant="contained">Hover over me</Button>
      </MenderTooltip>
    </div>
  ),
  args: {
    title: 'This is a helpful tooltip with useful information',
    placement: 'top',
    arrow: true
  }
};

type ClickableStory = StoryObj<typeof MenderTooltipClickable>;

export const Clickable: ClickableStory = {
  name: 'MenderTooltipClickable',
  render: args => (
    <div style={{ padding: 50 }}>
      <MenderTooltipClickable {...args}>
        <Button variant="contained">Click to toggle tooltip</Button>
      </MenderTooltipClickable>
    </div>
  ),
  args: {
    title: 'This tooltip can be toggled by clicking. Click away to dismiss.',
    placement: 'top',
    arrow: true,
    startOpen: false,
    onOpenChange: (open: boolean) => console.log('Tooltip open:', open)
  }
};
