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

import LinedHeader, { LinedGroupHeader } from './LinedHeader';

const meta: Meta<typeof LinedHeader> = {
  component: LinedHeader,
  title: 'common-ui/LinedHeader',
  includeStories: ['Primary', 'GroupHeader']
};

export default meta;

type Story = StoryObj<typeof LinedHeader>;

export const Primary: Story = {
  name: 'LinedHeader',
  args: {
    heading: 'Dashboard Header',
    className: '',
    style: {},
    innerStyle: {}
  }
};

type GroupStory = StoryObj<typeof LinedGroupHeader>;

export const GroupHeader: GroupStory = {
  name: 'LinedGroupHeader',
  render: props => <LinedGroupHeader {...props} />,
  args: {
    heading: 'Group Header'
  }
};
