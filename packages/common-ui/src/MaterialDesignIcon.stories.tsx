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
import { mdiAccount, mdiHome, mdiImageBrokenVariant } from '@mdi/js';
import type { Meta, StoryObj } from '@storybook/react-vite';

import MaterialDesignIcon from './MaterialDesignIcon';

const meta: Meta<typeof MaterialDesignIcon> = {
  component: MaterialDesignIcon,
  title: 'common-ui/MaterialDesignIcon',
  argTypes: {
    path: {
      options: ['account', 'home', 'broken'],
      mapping: {
        account: mdiAccount,
        home: mdiHome,
        broken: mdiImageBrokenVariant
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof MaterialDesignIcon>;

export const Primary: Story = {
  name: 'MaterialDesignIcon',
  args: {
    path: 'account',
    className: '',
    style: { fontSize: 48 }
  }
};
