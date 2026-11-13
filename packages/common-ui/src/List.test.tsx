// Copyright 2024 Northern.tech AS
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
import { render } from '@/testUtils';
import { tenants, undefineds } from '@northern.tech/testing/mockData';
import { SORTING_OPTIONS } from '@northern.tech/utils/constants';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import DetailsIndicator from './DetailsIndicator';
import type { ColumnHeader, RendererProp } from './List';
import { CommonList } from './List';

interface TestItem {
  id: string;
  name: string;
}

const listState = { page: 1, perPage: 20, selection: [], sort: { direction: SORTING_OPTIONS.desc, key: 'name' }, total: 10 };

const NameRenderer = ({ column, item }: RendererProp<TestItem>) => <div>{item?.[column.attribute.name] ?? ''}</div>;

const DetailsButtonRenderer = () => (
  <div className="padding-bottom-small padding-top-small">
    <DetailsIndicator />
  </div>
);

const columnHeaders: ColumnHeader<TestItem>[] = [
  { attribute: { name: 'name', scope: '' }, component: NameRenderer, sortable: true, title: 'Name' },
  { attribute: { name: '', scope: '' }, component: DetailsButtonRenderer, sortable: false, title: '' }
];

describe('List component', () => {
  it('renders correctly', () => {
    const onExpandClickMock = vi.fn();
    const onResizeColumns = vi.fn();
    const onPageChange = vi.fn();
    const onSelect = vi.fn();
    const onSort = vi.fn();
    const onChangeRowsPerPage = vi.fn();
    const { baseElement } = render(
      <CommonList
        listItems={tenants as TestItem[]}
        listState={listState}
        columnHeaders={columnHeaders}
        onExpandClick={onExpandClickMock}
        onChangeRowsPerPage={onChangeRowsPerPage}
        onPageChange={onPageChange}
        onResizeColumns={onResizeColumns}
        onSelect={onSelect}
        onSort={onSort}
        pageLoading={false}
      />
    );
    const view = baseElement.firstChild;
    expect(view).toMatchSnapshot();
    expect(view).toEqual(expect.not.stringMatching(undefineds));
  });
  it('works as expected', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onExpandClickMock = vi.fn();
    const onResizeColumns = vi.fn();
    const onPageChange = vi.fn();
    const onSelect = vi.fn();
    const onSort = vi.fn();
    const onChangeRowsPerPage = vi.fn();
    render(
      <CommonList
        listItems={tenants as TestItem[]}
        listState={listState}
        columnHeaders={columnHeaders}
        onExpandClick={onExpandClickMock}
        onChangeRowsPerPage={onChangeRowsPerPage}
        onPageChange={onPageChange}
        onResizeColumns={onResizeColumns}
        onSelect={onSelect}
        onSort={onSort}
        pageLoading={false}
      />
    );

    await user.click(screen.getAllByText('View details')[0]);
    expect(onExpandClickMock).toHaveBeenCalledWith(tenants[0]);

    await user.click(screen.getByText('Name'));
    expect(onSort).toHaveBeenCalledWith({ name: 'name', scope: '' });

    await user.click(screen.getByRole('checkbox', { name: /select row/i }));
    expect(onSelect).toHaveBeenCalledWith([0]);
    expect(onExpandClickMock).toHaveBeenCalledTimes(1);
  });
  it('keeps columns showing the same attribute apart', () => {
    const props = { listItems: tenants as TestItem[], listState, onChangeRowsPerPage: vi.fn(), onExpandClick: vi.fn(), onPageChange: vi.fn() };
    const ui = (headers: ColumnHeader<TestItem>[]) => (
      <CommonList {...props} columnHeaders={headers} onResizeColumns={false} onSelect={() => undefined} pageLoading={false} />
    );
    const duplicated = [columnHeaders[0], columnHeaders[0], columnHeaders[1]];
    const { rerender } = render(ui(duplicated));
    // new header objects lead to an update of the columns
    rerender(ui(duplicated.map(header => ({ ...header }))));
    rerender(ui(duplicated.map(header => ({ ...header }))));
    expect(screen.getAllByRole('columnheader').filter(header => header.textContent === 'Name')).toHaveLength(2);
  });
});
