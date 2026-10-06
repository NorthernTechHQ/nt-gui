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

import { ExpandableAttribute } from './ExpandableAttribute';

const longValue =
  'something long, something long, something long, something long, something long, something long, something long, something long, something long, something long, something long';

const meta: Meta<typeof ExpandableAttribute> = {
  title: 'common-ui/ExpandableAttribute',
  component: ExpandableAttribute
};

export default meta;

type Story = StoryObj<typeof ExpandableAttribute>;

export const Primary: Story = {
  render: props => <ExpandableAttribute {...props} />,
  name: 'ExpandableAttribute',
  args: {
    copyToClipboard: false,
    dividerDisabled: false,
    onExpansion: () => console.log('expanding'),
    primary: 'something secondary',
    secondary: longValue,
    style: {
      maxWidth: 400,
      maxHeight: 200
    }
  }
};

export const Copyable: Story = {
  render: props => <ExpandableAttribute {...props} />,
  name: 'Copyable',
  args: {
    ...Primary.args,
    copyToClipboard: true,
    primary: 'Device ID',
    secondary: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    setSnackbar: (message: string) => console.log(`snack showing: ${message}`)
  }
};

export const WithoutDivider: Story = {
  render: props => <ExpandableAttribute {...props} />,
  name: 'Without divider',
  args: {
    ...Primary.args,
    dividerDisabled: true,
    primary: 'MAC address',
    secondary: 'dc:a6:32:12:ad:bf'
  }
};

export const CustomSecondaryTypography: Story = {
  render: props => <ExpandableAttribute {...props} />,
  name: 'With custom secondary typography',
  args: {
    ...Primary.args,
    primary: 'Artifact name',
    secondary: longValue,
    secondaryTypographyProps: { color: 'primary', variant: 'body1' }
  }
};
