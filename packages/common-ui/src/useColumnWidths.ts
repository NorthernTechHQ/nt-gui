// Copyright 2026 Northern.tech AS
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
import { useState } from 'react';

import { getCurrentUser } from '@northern.tech/store/selectors';
import { useAppSelector } from '@northern.tech/store/store';

import type { ColumnWidths } from './List';

const readColumnWidths = (storageKey: string): ColumnWidths => {
  try {
    const columnWidths = JSON.parse(window.localStorage.getItem(storageKey) ?? '');
    return columnWidths && typeof columnWidths === 'object' && !Array.isArray(columnWidths) ? columnWidths : {};
  } catch {
    return {};
  }
};

export const useColumnWidths = (key: string) => {
  const { id: userId } = useAppSelector(getCurrentUser);
  const storageKey = `${userId}-${key}`;
  const [columnWidths, setColumnWidths] = useState<ColumnWidths>(() => readColumnWidths(storageKey));

  const onResizeColumns = (columnWidths: ColumnWidths) => {
    window.localStorage.setItem(storageKey, JSON.stringify(columnWidths));
    setColumnWidths(columnWidths);
  };
  return { columnWidths, onResizeColumns };
};
