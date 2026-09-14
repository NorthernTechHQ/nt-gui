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

import Pagination, { TablePaginationActions } from './Pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'common-ui/Pagination'
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {
  name: 'Pagination',
  args: {
    className: '',
    count: 100,
    page: 1,
    rowsPerPage: 20,
    disabled: false,
    showCountInfo: true,
    onChangePage: (page: number) => console.log('Page changed to:', page),
    onChangeRowsPerPage: (perPage: number) => console.log('Rows per page changed to:', perPage)
  }
};

export const WithoutCountInfo: Story = {
  name: 'Without count info',
  args: {
    ...Primary.args,
    showCountInfo: false
  }
};

export const CustomRowsPerPageOptions: Story = {
  name: 'Custom rows per page options',
  args: {
    ...Primary.args,
    rowsPerPage: 50,
    rowsPerPageOptions: [50, 100, 250]
  }
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    ...Primary.args,
    disabled: true
  }
};

type ActionsStory = StoryObj<typeof TablePaginationActions>;

export const Secondary: ActionsStory = {
  render: props => <TablePaginationActions {...props} />,
  name: 'TablePaginationActions',
  args: {
    count: 100,
    page: 0,
    rowsPerPage: 20,
    showCountInfo: true,
    onPageChange: (page: number) => console.log('Page changed to:', page)
  }
};
