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
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

// material ui
import { TextField, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { ConfirmationButtons, EditButton } from './Confirm';

const useStyles = makeStyles()(() => ({
  notes: { whiteSpace: 'pre-wrap', wordBreak: 'break-word' }
}));

const MAX_ROWS = 4;

export interface EditableLongTextProps {
  fullWidth?: boolean;
  isEditing?: boolean;
  onChange: (value: string) => Promise<void>;
  onEditToggle?: (editing: boolean) => void;
  original: string;
  placeholder?: string;
}

type ConfirmEditEvent = KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>;

export const EditableLongText = ({ fullWidth, isEditing: isEditingProp, onChange, onEditToggle, original, placeholder = '-' }: EditableLongTextProps) => {
  const [isEditingInternal, setIsEditingInternal] = useState(false);
  const [value, setValue] = useState(original);
  const { classes } = useStyles();

  const isControlled = isEditingProp !== undefined;
  const isEditing = isControlled ? isEditingProp : isEditingInternal;

  useEffect(() => {
    setValue(original);
  }, [original]);

  const setEditing = useCallback(
    (editing: boolean) => {
      if (!isControlled) {
        setIsEditingInternal(editing);
      }
      onEditToggle?.(editing);
    },
    [isControlled, onEditToggle]
  );

  const onCancelClick = () => {
    setValue(original);
    setEditing(false);
  };

  const onEdit = ({ target: { value: newValue } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(newValue);

  const onEditClick = () => setEditing(true);

  const onConfirmEdit = useCallback(
    (event: ConfirmEditEvent) => {
      event.stopPropagation();
      const key = 'key' in event ? event.key : undefined;
      if (key && (key !== 'Enter' || event.shiftKey)) {
        return;
      }
      if (isEditing) {
        // save change
        return onChange(value)
          .then(() => setEditing(false))
          .catch(() => setEditing(true));
      } else {
        setEditing(!isEditing);
      }
    },
    [isEditing, onChange, setEditing, value]
  );

  const fullWidthClass = fullWidth ? 'full-width' : '';

  return (
    <div className="flexbox" style={{ alignItems: 'end' }}>
      {isEditing ? (
        <>
          <TextField
            className={`margin-right ${fullWidthClass}`}
            maxRows={MAX_ROWS}
            multiline
            onChange={onEdit}
            onKeyDown={onConfirmEdit}
            label={placeholder}
            value={value}
          />
          <ConfirmationButtons onCancel={onCancelClick} onConfirm={onConfirmEdit} />
        </>
      ) : (
        <>
          <Typography className={`${fullWidthClass} margin-right ${classes.notes}`} variant="body2" color="textSecondary" component="div">
            {original || value}
          </Typography>
          {!isControlled && <EditButton onClick={onEditClick} />}
        </>
      )}
    </div>
  );
};
