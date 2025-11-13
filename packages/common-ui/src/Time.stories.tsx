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

import { RelativeTime, Time } from './Time';

const meta: Meta<typeof Time> = {
  component: Time,
  title: 'common-ui/Time',
  includeStories: ['Primary', 'Relative', 'RelativeTimeStory', 'ApproximateDate']
};

export default meta;

type Story = StoryObj<typeof Time>;

const exampleDate = '2025-01-15 14:30';
const recentDate = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(); // 2 hours ago
const veryRecentDate = new Date(Date.now() - 3 * 60 * 1000).toISOString(); // 3 minutes ago

export const Primary: Story = {
  name: 'Time',
  args: {
    value: exampleDate,
    relative: false
  }
};

export const Relative: Story = {
  name: 'Time, but relative',
  args: {
    value: recentDate,
    relative: true
  }
};

type RelativeTimeStory = StoryObj<typeof RelativeTime>;

export const RelativeTimeStory: RelativeTimeStory = {
  name: 'RelativeTime Component',
  render: props => <RelativeTime {...props} />,
  args: {
    updateTime: veryRecentDate,
    shouldCount: 'both',
    className: ''
  },
  argTypes: {
    shouldCount: {
      control: 'select',
      options: ['both', 'up', 'down']
    }
  }
};
