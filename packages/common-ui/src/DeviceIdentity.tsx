// Copyright 2021 Northern.tech AS
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
import type { CSSProperties, ComponentType } from 'react';

import { Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import type { IdAttribute } from '@northern.tech/store/constants';
import type { Device } from '@northern.tech/store/devicesSlice';
import { getDeviceById as getDeviceByIdSelector, getIdAttribute } from '@northern.tech/store/selectors';
import { useAppSelector } from '@northern.tech/store/store';

import DeviceNameInput from './DeviceNameInput';

const useStyles = makeStyles()(theme => ({
  container: {
    gridTemplateColumns: '1fr max-content',
    columnGap: theme.spacing()
  }
}));

const propertyNameMap: Record<string, string> = {
  inventory: 'attributes',
  identity: 'identity_data',
  system: 'system',
  monitor: 'monitor',
  tags: 'tags'
};

interface AttributeColumn {
  attribute: { name: string; scope: string };
}

export const defaultTextRender = ({ column, device }: { column: AttributeColumn; device: Partial<Device> }): string => {
  const deviceProperties = device as Record<string, unknown>;
  const propertyName = propertyNameMap[column.attribute.scope] ?? column.attribute.scope;
  const accessorTarget = (deviceProperties[propertyName] ?? device) as Record<string, unknown>;
  const attributeValue = accessorTarget[column.attribute.name] || deviceProperties[column.attribute.name];
  return ((typeof attributeValue === 'object' ? JSON.stringify(attributeValue) : attributeValue) as string | undefined) ?? '-';
};

export const getDeviceIdentityText = ({ device = {}, idAttribute }: { device?: Partial<Device>; idAttribute?: IdAttribute | string }): string => {
  const { id = '', identity_data = {}, tags = {} } = device;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { status, ...remainingIds } = identity_data;

  const nonIdKey = Object.keys(remainingIds)[0];
  if (!idAttribute || idAttribute === 'id' || idAttribute === 'Device ID') {
    return id;
  } else if (typeof idAttribute === 'string' || !Object.keys(idAttribute).length) {
    return (identity_data[idAttribute as string] ?? identity_data[nonIdKey] ?? id) as string;
  }
  const { attribute, scope } = idAttribute;
  // special handling for tags purely to handle the untagged devices case
  if (attribute === 'name' && scope === 'tags') {
    return tags[attribute] ?? `${id.substring(0, 6)}...`;
  }
  return defaultTextRender({ column: { attribute: { name: attribute, scope } }, device });
};

export interface DeviceIdentityDisplayProps {
  device: Device;
  isEditable?: boolean;
  isHovered?: boolean;
  style?: CSSProperties;
}

type IdentityComponentProps = DeviceIdentityDisplayProps & { value: string };

interface DeviceIdComponentProps {
  style?: CSSProperties;
  value: string;
}

const DeviceIdComponent = ({ style = {}, value }: DeviceIdComponentProps) => (
  <Typography style={style} variant="body2">
    {value}
  </Typography>
);

const attributeComponentMap: Record<string, ComponentType<IdentityComponentProps>> = {
  default: DeviceIdComponent,
  name: DeviceNameInput
};

export const DeviceIdentityDisplay = (props: DeviceIdentityDisplayProps) => {
  const { device, isEditable = true } = props;

  const idAttribute = useAppSelector(getIdAttribute);
  const { attribute, scope } = idAttribute;
  const stateDevice = useAppSelector(state => getDeviceByIdSelector(state, device.id));
  const idValue = getDeviceIdentityText({ device: { ...device, ...stateDevice }, idAttribute });
  const { classes } = useStyles();

  let Component = attributeComponentMap.default;
  if (attribute === 'name' && scope === 'tags') {
    Component = isEditable ? attributeComponentMap.name : Component;
  }
  return (
    // due to the specificity of the deviceListRow child class, applying the display styling through the container class doesn't work, thus the inline style in addition here
    <div className={classes.container} style={{ display: 'grid' }}>
      <Component {...props} value={idValue} />
    </div>
  );
};

export default DeviceIdentityDisplay;
