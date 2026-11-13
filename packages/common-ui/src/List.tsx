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
import type { ComponentType, ReactElement, MouseEvent as ReactMouseEvent } from 'react';
import { useMemo, useState } from 'react';

import { Settings as SettingsIcon } from '@mui/icons-material';
import { typographyClasses } from '@mui/material';
import type { GridColDef, GridColumnResizeParams, GridRowParams, GridRowSelectionModel, GridSortModel, GridValidRowModel } from '@mui/x-data-grid';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, gridClasses } from '@mui/x-data-grid';

import type { SortOptions } from '@northern.tech/utils/constants';
import { DEVICE_LIST_DEFAULTS, SORTING_OPTIONS } from '@northern.tech/utils/constants';

import Loader from './Loader';
import Pagination from './Pagination';

const { page: defaultPage, perPage: defaultPerPage } = DEVICE_LIST_DEFAULTS;

interface Attribute {
  name: string;
  scope: string;
}
export interface RendererProp<T> {
  [key: string]: any;
  column: ColumnHeader<T>;
  item?: T;
}

export interface ColumnHeader<T> {
  attribute: Attribute;
  component?: ComponentType<RendererProp<T>>;
  customize?: () => void;
  sortable: boolean;
  textRender?: (props: RendererProp<T>) => string | ReactElement;
  title: string;
}

export interface ColumnSize {
  attribute: Attribute;
  size: number;
}

interface ListState {
  page?: number;
  perPage?: number;
  selection?: number[];
  sort?: SortOptions;
  total: number;
}

type wID = { id: string };

interface CommonListProps<T extends wID> {
  columnHeaders: ColumnHeader<T>[];
  customColumnSizes?: ColumnSize[];
  listItems: T[];
  listState: ListState;
  onChangeRowsPerPage: (perPage: number) => void;
  onExpandClick: (item: T) => void;
  onPageChange: (page: number) => void;
  onResizeColumns: ((columns: ColumnSize[]) => void) | false;
  onSelect: ((rows: number[]) => void) | false;
  onSort?: (attr: Attribute) => void;
  pageLoading: boolean;
  PaginationProps?: object;
}

export const minCellWidth = 150;
const checkboxColumnWidth = GRID_CHECKBOX_SELECTION_COL_DEF.width ?? 50;
// the community grid refuses larger pages
const maxPageSize = 100;
const sortingOrder = [SORTING_OPTIONS.desc, SORTING_OPTIONS.asc] as const;

const getColumnFields = <T,>(columnHeaders: ColumnHeader<T>[]) => {
  const fields = columnHeaders.map(({ attribute: { name, scope } }) => [scope, name].filter(Boolean).join(':'));
  return fields.map((field, index) => (!field || fields.indexOf(field) !== index ? `${field}-column-${index}` : field));
};

const isSameAttribute = (a: Attribute, b: Attribute) => a.name === b.name && a.scope === b.scope;

const textOverflow = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

const gridStyle = {
  border: 'none',
  [`.${gridClasses.row}`]: { cursor: 'pointer' },
  [`.${gridClasses.cell} > *`]: { ...textOverflow, minWidth: 0 },
  [`.${gridClasses.cell} .${typographyClasses.root}`]: textOverflow
};

interface CustomizableHeaderProps {
  customize: () => void;
  title: string;
}

const CustomizableHeader = ({ customize, title }: CustomizableHeaderProps) => {
  const onCustomizeClick = (e: ReactMouseEvent) => {
    e.stopPropagation();
    customize();
  };
  return (
    <div className={`flexbox align-items-center ${gridClasses.columnHeaderTitle}`}>
      {title}
      <SettingsIcon className="margin-left-x-small" onClick={onCustomizeClick} style={{ fontSize: 16 }} data-testid="column-configuration" />
    </div>
  );
};
export const CommonList = <T extends wID>(props: CommonListProps<T>) => {
  const {
    columnHeaders,
    customColumnSizes,
    listItems,
    listState,
    onChangeRowsPerPage,
    PaginationProps = {},
    onExpandClick,
    onResizeColumns,
    onPageChange,
    onSelect,
    onSort,
    pageLoading
  } = props;
  const { page: pageNo = defaultPage, perPage: pageLength = defaultPerPage, selection: selectedRows, sort = {}, total: pageTotal = 1 } = listState;
  const { direction: sortDown = SORTING_OPTIONS.desc, key: sortCol, scope: sortScope } = sort as SortOptions;
  const selectable = !!onSelect;
  const resizable = !!onResizeColumns;
  const [gridWidth, setGridWidth] = useState(0);
  const fields = useMemo(() => getColumnFields(columnHeaders), [columnHeaders]);

  const columns = useMemo<GridColDef<T>[]>(() => {
    const lastIndex = columnHeaders.length - 1;
    // the last column always takes up the remaining space, just like the columns without a custom size
    const sizes = columnHeaders.map(({ attribute }, index) =>
      index === lastIndex ? undefined : customColumnSizes?.find(columnSize => columnSize.attribute && isSameAttribute(columnSize.attribute, attribute))?.size
    );
    // the space the columns need at the very least: the custom sized ones can't shrink, the others only down to their minimum
    const occupiedWidth = sizes.reduce<number>((accu, size) => accu + (size ?? minCellWidth), selectable ? checkboxColumnWidth : 0);
    return columnHeaders.map((column, index) => {
      const { component: Component, customize, sortable, textRender, title } = column;
      const size = sizes[index];
      const ownWidth = size ?? minCellWidth;
      return {
        // the cells contain elements instead of plain text
        display: 'flex' as const,
        field: fields[index],
        headerName: title,
        // a column can only grow as far as the other columns can make room for it, to keep the list from outgrowing the available space
        maxWidth: gridWidth ? Math.max(ownWidth, gridWidth - (occupiedWidth - ownWidth)) : undefined,
        minWidth: minCellWidth,
        resizable: resizable && index !== lastIndex,
        sortable,
        ...(size ? { width: size } : { flex: 1 }),
        ...(customize ? { renderHeader: () => <CustomizableHeader customize={customize} title={title} /> } : {}),
        renderCell: ({ row }) => (Component ? <Component column={column} item={row} /> : (textRender?.({ column, item: row }) ?? null))
      };
    });
  }, [columnHeaders, customColumnSizes, fields, gridWidth, resizable, selectable]);

  const sortModel = useMemo<GridSortModel>(() => {
    const index = columnHeaders.findIndex(({ attribute, sortable }) => sortable && attribute.name === sortCol && (!sortScope || attribute.scope === sortScope));
    return index === -1 ? [] : [{ field: fields[index], sort: sortDown }];
  }, [columnHeaders, fields, sortCol, sortDown, sortScope]);

  const rowSelectionModel = useMemo<GridRowSelectionModel>(
    () => ({ type: 'include', ids: new Set((selectedRows ?? []).filter(index => listItems[index]).map(index => listItems[index].id)) }),
    [listItems, selectedRows]
  );

  const onSortModelChange = (model: GridSortModel) => {
    const field = model[0]?.field ?? sortModel[0]?.field;
    const column = columnHeaders[fields.indexOf(field)];
    if (column && onSort) {
      onSort(column.attribute);
    }
  };

  const onRowSelectionModelChange = ({ ids, type }: GridRowSelectionModel) => {
    if (!onSelect) {
      return;
    }
    const isIncluding = type === 'include';
    const selectedIndices = listItems.flatMap(({ id }, index) => (ids.has(id) === isIncluding ? [index] : []));
    onSelect(selectedIndices);
  };

  const onColumnWidthChange = ({ colDef: { field }, width }: GridColumnResizeParams) => {
    const resizedColumn = columnHeaders[fields.indexOf(field)];
    if (!onResizeColumns || !resizedColumn) {
      return;
    }
    const { attribute } = resizedColumn;
    // only the explicitly resized columns get a fixed size, the others stay flexible to keep the list from outgrowing the available space
    const unchangedSizes = (customColumnSizes ?? []).filter(columnSize => columnSize.attribute && !isSameAttribute(columnSize.attribute, attribute));
    onResizeColumns([...unchangedSizes, { attribute, size: Math.round(width) }]);
  };

  const onRowClick = ({ row }: GridRowParams<T>, event: ReactMouseEvent<HTMLElement>) => {
    if (event.defaultPrevented || (event.target as HTMLElement).closest(`.${gridClasses.cellCheckbox}`)) {
      return;
    }
    onExpandClick(row);
  };

  return (
    <>
      <DataGrid<T & GridValidRowModel>
        checkboxSelection={selectable}
        columns={columns as GridColDef<T & GridValidRowModel>[]}
        disableColumnMenu
        disableColumnResize={!resizable}
        disableRowSelectionOnClick
        hideFooter
        onColumnWidthChange={onColumnWidthChange}
        onResize={({ width }) => setGridWidth(width)}
        onRowClick={onRowClick}
        onRowSelectionModelChange={onRowSelectionModelChange}
        onSortModelChange={onSortModelChange}
        paginationMode="server"
        paginationModel={{ page: Math.max(pageNo - 1, 0), pageSize: Math.min(pageLength, maxPageSize) }}
        rowCount={pageTotal}
        rows={listItems}
        rowSelectionModel={rowSelectionModel}
        sortingMode="server"
        sortingOrder={sortingOrder}
        sortModel={sortModel}
        sx={gridStyle}
      />
      <div className="flexbox margin-top-small">
        <Pagination
          className="margin-top-none"
          count={pageTotal}
          rowsPerPage={pageLength}
          onChangeRowsPerPage={onChangeRowsPerPage}
          page={pageNo}
          onChangePage={onPageChange}
          {...PaginationProps}
        />
        <Loader show={pageLoading} small />
      </div>
    </>
  );
};
