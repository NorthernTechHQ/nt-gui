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
import type { Meta, StoryObj } from '@storybook/react';

import { ConfigurationObject, TwoColumnData, TwoColumnDataMultiple, TwoColumns } from './ConfigurationObject';

const meta: Meta<typeof ConfigurationObject> = {
  component: ConfigurationObject,
  includeStories: ['Primary', 'Secondary', 'Tertiary', 'TheForth']
};

export default meta;

type Story = StoryObj<typeof ConfigurationObject>;

export const Primary: Story = {
  render: props => <ConfigurationObject {...props} />,
  name: 'ConfigurationObject',
  args: {
    config: { foo: 'bar', asd: 123, someBool: true, anything: 'else' },
    className: '',
    children: undefined,
    chipLikeKey: true,
    compact: false,
    setSnackbar: () => alert('imagine this is a snack'),
    style: {}
  }
};

type SecondaryStory = StoryObj<typeof TwoColumnData>;

export const Secondary: SecondaryStory = {
  render: props => <TwoColumnData {...props} />,
  name: 'TwoColumnData',
  args: {
    config: {
      foo: 'bar',
      some: 'data',
      here: 'more',
      even: 'more',
      alsoSomethingSomewhatLonger: `with some somewhat longer content to show things, let's repeat: with some somewhat longer content to show things`,
      and: 'now',
      this: true
    },
    className: '',
    children: undefined,
    chipLikeKey: true,
    compact: false,
    style: {}
  }
};

type TertiaryStory = StoryObj<typeof TwoColumnDataMultiple>;

export const Tertiary: TertiaryStory = {
  render: props => <TwoColumnDataMultiple {...props} />,
  name: 'TwoColumnDataMultiple',
  args: {
    config: {
      foo: 'bar',
      some: 'data',
      here: 'more',
      even: 'more',
      alsoSomethingSomewhatLonger: `with some somewhat longer content to show things, let's repeat: with some somewhat longer content to show things`,
      and: 'now',
      this: true
    },
    className: '',
    children: undefined,
    chipLikeKey: true,
    compact: false,
    style: {}
  }
};

type TheFortheStory = StoryObj<typeof TwoColumns>;

export const TheForth: TheFortheStory = {
  render: props => <TwoColumns {...props} />,
  name: 'TwoColumns',
  args: {
    items: {
      foo: 'bar',
      some: 'data',
      here: 'more',
      even: 'more',
      alsoSomethingSomewhatLonger: `with some somewhat longer content to show things, let's repeat: with some somewhat longer content to show things`,
      and: 'now',
      this: true
    },
    className: '',
    children: undefined,
    chipLikeKey: true,
    compact: false,
    setSnackbar: () => alert('imagine this is a snack'),
    style: {}
  }
};
