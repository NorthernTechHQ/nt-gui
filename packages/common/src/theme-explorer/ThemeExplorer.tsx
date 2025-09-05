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
// -----
// adapted from: https://github.com/mui/material-ui/blob/master/docs/src/modules/components/ThemeViewer.tsx
import { Box } from '@mui/material';
import { lighten, styled, useTheme } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem as MuiTreeItem } from '@mui/x-tree-view/TreeItem';

import clsx from 'clsx';

const getType = (value: any) => {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (value === null) {
    return 'null';
  }

  if (/^(#|rgb|rgba|hsl|hsla)/.test(value)) {
    return 'color';
  }

  return typeof value;
};

const getLabel = (value: any, type: string) => {
  switch (type) {
    case 'array':
      return `Array(${value.length})`;
    case 'null':
      return 'null';
    case 'undefined':
      return 'undefined';
    case 'function':
      return `f ${value.name}()`;
    case 'object':
      return 'Object';
    case 'string':
      return `"${value}"`;
    case 'symbol':
      return `Symbol(${String(value)})`;
    case 'bigint':
    case 'boolean':
    case 'number':
    default:
      return String(value);
  }
};

const getTokenType = (type: string) => {
  switch (type) {
    case 'color':
      return 'string';
    case 'object':
    case 'array':
      return 'comment';
    default:
      return type;
  }
};

const Color = styled('span')(({ theme }) => ({
  backgroundColor: '#fff',
  display: 'inline-block',
  marginBottom: -1,
  marginRight: theme.spacing(0.5),
  border: '1px solid',
  backgroundImage:
    'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M1%202V0h1v1H0v1z%22%20fill-opacity%3D%22.2%22%2F%3E%3C%2Fsvg%3E")'
}));

const ObjectEntryLabel = (props: { objectKey: string; objectValue: any }) => {
  const { objectKey, objectValue } = props;
  const type = getType(objectValue);
  const label = getLabel(objectValue, type);
  const tokenType = getTokenType(type);

  return (
    <>
      {`${objectKey}: `}
      {type === 'color' ? (
        <Color style={{ borderColor: lighten(label, 0.7) }}>
          <Box component="span" sx={{ display: 'block', width: 11, height: 11 }} style={{ backgroundColor: label }} />
        </Color>
      ) : null}
      <span className={clsx('token', tokenType)}>{label}</span>
    </>
  );
};

const ObjectEntry = (props: { itemId: string; objectKey: string; objectValue: any }) => {
  const { itemId, objectKey, objectValue } = props;
  const keyPrefix = itemId;
  let children: any = null;

  if ((objectValue !== null && typeof objectValue === 'object') || typeof objectValue === 'function') {
    children =
      Object.keys(objectValue).length === 0
        ? undefined
        : Object.keys(objectValue).map(key => <ObjectEntry key={key} itemId={`${keyPrefix}.${key}`} objectKey={key} objectValue={objectValue[key]} />);
  }

  return (
    <MuiTreeItem itemId={itemId} label={<ObjectEntryLabel objectKey={objectKey} objectValue={objectValue} />}>
      {children}
    </MuiTreeItem>
  );
};

const keyPrefix = '$ROOT';

export const ThemeExplorer = () => {
  const theme = useTheme();

  return (
    <SimpleTreeView sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, p: 2 }}>
      {Object.keys(theme).map(objectKey => (
        <ObjectEntry key={objectKey} itemId={`${keyPrefix}.${objectKey}`} objectKey={objectKey} objectValue={theme[objectKey]} />
      ))}
    </SimpleTreeView>
  );
};
