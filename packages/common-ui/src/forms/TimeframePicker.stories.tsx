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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { Form } from './Form';
import { TimeframePicker } from './TimeframePicker';

const now = dayjs();
const weekAgo = now.subtract(7, 'days');
const monthAgo = now.subtract(30, 'days');

const meta: Meta<typeof TimeframePicker> = {
  component: TimeframePicker,
  title: 'common-ui/forms/TimeframePicker',
  decorators: [
    (Story, { parameters }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Form
          defaultValues={{ startDate: (parameters.startDate as string) ?? weekAgo.toISOString(), endDate: now.toISOString() }}
          onSubmit={data => console.log('Submitted:', data)}
        >
          <Story />
        </Form>
      </LocalizationProvider>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof TimeframePicker>;

export const Primary: Story = {
  name: 'TimeframePicker',
  args: {
    tonight: now.toISOString()
  }
};

export const WithHelperText: Story = {
  name: 'With Helper Text',
  parameters: { startDate: monthAgo.toISOString() },
  args: {
    tonight: now.toISOString(),
    helperText: 'Only the last 7 days of data are available on your current plan',
    hasHelperText: ({ startDate }) => dayjs(startDate).isBefore(weekAgo)
  }
};
