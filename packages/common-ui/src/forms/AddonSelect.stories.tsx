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
import type { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { AddonId } from '@northern.tech/store/constants';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AddonSelect } from './AddonSelect';

const FormWrapper = ({ children, defaultAddons = [] }: { children: ReactNode; defaultAddons?: AddonId[] }) => {
  const methods = useForm({ defaultValues: { addons: defaultAddons } });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const meta: Meta<typeof AddonSelect> = {
  component: AddonSelect,
  title: 'common-ui/forms/AddonSelect'
};

export default meta;

type Story = StoryObj<typeof AddonSelect>;

export const Primary: Story = {
  name: 'AddonSelect',
  args: { name: 'addons' },
  render: args => (
    <FormWrapper>
      <AddonSelect {...args} />
    </FormWrapper>
  )
};

export const WithPreselection: Story = {
  name: 'With Preselected Addons',
  args: { name: 'addons' },
  render: args => (
    <FormWrapper defaultAddons={['configure']}>
      <AddonSelect {...args} />
    </FormWrapper>
  )
};
