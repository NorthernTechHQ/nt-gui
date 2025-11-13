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
import { Checkbox } from '@mui/material';

import { SORTING_OPTIONS } from '@northern.tech/store/constants';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ColumnHeader, ListItemComponentProps } from './List';
import { CommonList } from './List';

// Sample data type
interface SampleItem {
  created: string;
  id: string;
  name: string;
  status: string;
}

// Sample ListItem component
const SampleListItem = ({ columnHeaders, listItem, onClick, onRowSelect, selectable, selected }: ListItemComponentProps<SampleItem>) => (
  <div className="deviceListRow" onClick={() => onClick(listItem)}>
    {selectable && (
      <div>
        <Checkbox checked={selected} onChange={() => onRowSelect(listItem)} />
      </div>
    )}
    {columnHeaders.map((column, index) => {
      const { component: Component } = column;
      return <Component key={`col-${index}`} column={column} item={listItem} />;
    })}
  </div>
);

// Sample cell renderers
const NameCell = ({ item }: { item?: SampleItem }) => <div>{item?.name || ''}</div>;
const StatusCell = ({ item }: { item?: SampleItem }) => <div>{item?.status || ''}</div>;
const DateCell = ({ item }: { item?: SampleItem }) => <div>{item?.created || ''}</div>;

const sampleColumns: ColumnHeader<SampleItem>[] = [
  {
    attribute: { name: 'name', scope: 'identity' },
    component: NameCell,
    sortable: true,
    title: 'Name'
  },
  {
    attribute: { name: 'status', scope: 'system' },
    component: StatusCell,
    sortable: true,
    title: 'Status'
  },
  {
    attribute: { name: 'created', scope: 'system' },
    component: DateCell,
    sortable: true,
    title: 'Created'
  }
];

const sampleItems: SampleItem[] = Array.from({ length: 5 }, (_, i) => ({
  id: `item-${i + 1}`,
  name: `Item ${i + 1}`,
  status: i % 2 === 0 ? 'Active' : 'Inactive',
  created: `2025-01-${String(i + 10).padStart(2, '0')}`
}));

const meta: Meta<typeof CommonList<SampleItem>> = {
  component: CommonList,
  title: 'common-ui/List'
};

export default meta;

type Story = StoryObj<typeof CommonList<SampleItem>>;

export const Primary: Story = {
  name: 'List',
  args: {
    columnHeaders: sampleColumns,
    listItems: sampleItems,
    listState: {
      page: 1,
      perPage: 20,
      selection: [],
      sort: { direction: SORTING_OPTIONS.desc, key: 'name' },
      total: 5
    },
    idAttribute: 'id',
    ListItemComponent: SampleListItem,
    onChangeRowsPerPage: (perPage: number) => console.log('Rows per page:', perPage),
    onExpandClick: (item: SampleItem) => console.log('Clicked:', item),
    onPageChange: (event: any, page: number) => console.log('Page:', page),
    onResizeColumns: false,
    onSelect: false,
    onSort: (attr: any) => console.log('Sort:', attr),
    pageLoading: false
  }
};

export const WithSelection: Story = {
  name: 'With Selection',
  args: {
    ...Primary.args,
    onSelect: (rows: number[]) => console.log('Selected rows:', rows)
  }
};
