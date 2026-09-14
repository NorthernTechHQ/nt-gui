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
import { InfoOutlined as InfoOutlinedIcon } from '@mui/icons-material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import MenderTooltip from '../helptips/MenderTooltip';
import type { HelptipProps, InputHelptip, KeyValuePairs } from './KeyValueEditor';
import { KeyValueEditor } from './KeyValueEditor';

const TimezoneHelptip = ({ className, style }: HelptipProps) => (
  <MenderTooltip arrow placement="top" title="The timezone the device should report its data in, e.g. Europe/Oslo">
    <InfoOutlinedIcon className={className} color="primary" fontSize="small" style={style} />
  </MenderTooltip>
);

const inputHelpTipsMap: Record<string, InputHelptip> = { timezone: { component: TimezoneHelptip } };

const initialInput: KeyValuePairs = { environment: 'production', region: 'eu-west-1', timezone: 'Europe/Oslo' };

const onInputChange = (values: KeyValuePairs) => console.log('key value pairs changed:', values);

const meta: Meta<typeof KeyValueEditor> = {
  component: KeyValueEditor,
  title: 'common-ui/forms/KeyValueEditor'
};

export default meta;

type Story = StoryObj<typeof KeyValueEditor>;

export const Primary: Story = {
  name: 'KeyValueEditor',
  args: { onInputChange }
};

export const WithInitialValues: Story = {
  name: 'With Initial Values',
  args: { initialInput, onInputChange }
};

export const WithHelptips: Story = {
  name: 'With Helptips',
  args: { initialInput, inputHelpTipsMap, onInputChange }
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true, initialInput, onInputChange }
};
