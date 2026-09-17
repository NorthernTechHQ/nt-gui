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

import { LastChangedNote } from './LastChangedNote';

const meta: Meta<typeof LastChangedNote> = {
  component: LastChangedNote,
  title: 'common-ui/LastChangedNote'
};

export default meta;

type Story = StoryObj<typeof LastChangedNote>;

const updateTime = '2025-06-02 12:34:56';

export const Primary: Story = {
  name: 'LastChangedNote',
  args: {
    isOffline: false,
    updateTime
  }
};

export const Offline: Story = {
  name: 'Offline',
  args: {
    isOffline: true,
    updateTime
  }
};

export const Unknown: Story = {
  name: 'Without update time',
  args: {
    isOffline: false,
    updateTime: undefined
  }
};
