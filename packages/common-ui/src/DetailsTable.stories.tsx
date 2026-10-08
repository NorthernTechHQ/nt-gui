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
import { SORTING_OPTIONS } from '@northern.tech/utils/constants';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ColumnDefinition, ColumnRendererProps } from './DetailsTable';
import { DetailsTable } from './DetailsTable';

interface SampleItem {
  count: number;
  id: string;
  name: string;
}

const columns: ColumnDefinition<SampleItem>[] = [
  {
    key: 'name',
    title: 'Name',
    render: ({ name }) => name,
    sortable: true,
    defaultSortDirection: SORTING_OPTIONS.asc
  },
  {
    key: 'count',
    title: 'count',
    render: ({ count }) => count,
    renderTitle: extras => <b>{extras.extraCount}</b>,
    extras: { extraCount: 'something a little extra' },
    sortable: false,
    defaultSortDirection: SORTING_OPTIONS.asc
  },
  {
    key: 'constant',
    title: 'something constant',
    render: () => 'Yeah!',
    cellProps: { align: 'right' }
  }
];

const CountChip = ({ column, extras, item }: ColumnRendererProps<SampleItem, { label: string }>) => (
  <div className="flexbox center-aligned" style={{ gap: 4 }}>
    <b>{item[column.key as keyof SampleItem]}</b>
    <span className="muted">{extras?.label}</span>
  </div>
);

const componentColumns: ColumnDefinition<SampleItem>[] = [
  { key: 'name', title: 'Name', render: ({ name }) => name, sortable: true },
  { key: 'count', title: 'Count', component: CountChip, extras: { label: 'deployments' } }
];

const items: SampleItem[] = Array.from({ length: 10 }).map((_, index) => ({ id: `item-${index + 1}`, name: `list-entry ${index + 1}`, count: index }));

const meta: Meta<typeof DetailsTable> = {
  component: DetailsTable,
  title: 'common-ui/DetailsTable'
};

export default meta;

type Story = StoryObj<typeof DetailsTable>;

export const Primary: Story = {
  render: props => <DetailsTable {...props} />,
  name: 'DetailsTable',
  args: {
    className: '',
    columns,
    items,
    onChangeSorting: sortKey => console.log(`sorting changed: ${sortKey}`),
    onItemClick: item => console.log(`item clicked: ${JSON.stringify(item)}`),
    onRowSelected: rowNumbers => console.log(`rows selected: ${JSON.stringify(rowNumbers)}`),
    selectedRows: [2, 5],
    sort: { direction: SORTING_OPTIONS.asc, key: 'name' },
    style: {}
  }
};

export const WithoutSelection: Story = {
  name: 'DetailsTableNoSelection',
  args: {
    ...Primary.args,
    onRowSelected: undefined,
    selectedRows: []
  }
};

export const SortedDescending: Story = {
  name: 'DetailsTableSortedDescending',
  args: {
    ...Primary.args,
    sort: { direction: SORTING_OPTIONS.desc, key: 'name' }
  }
};

export const Empty: Story = {
  name: 'DetailsTableNothingness',
  args: {
    ...Primary.args,
    items: [],
    onRowSelected: undefined,
    selectedRows: []
  }
};

export const WithComponentRenderers: Story = {
  name: 'DetailsTableComponentRenderers',
  args: {
    ...Primary.args,
    columns: componentColumns,
    onRowSelected: undefined,
    selectedRows: []
  }
};
