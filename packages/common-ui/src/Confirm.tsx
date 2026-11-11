// Copyright 2017 Northern.tech AS
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
import type { MouseEventHandler } from 'react';

import { Check as CheckIcon, Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

export interface EditButtonProps {
  disabled?: boolean;
  label?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const EditButton = ({ label = 'Edit', onClick, disabled = false }: EditButtonProps) =>
  label ? (
    <Button onClick={onClick} size="small" disabled={disabled} startIcon={<EditIcon />} style={{ padding: 5 }} color="inherit">
      {label}
    </Button>
  ) : (
    <IconButton onClick={onClick} size="small" disabled={disabled} color="inherit">
      <EditIcon />
    </IconButton>
  );

export interface ConfirmationButtonsProps {
  className?: string;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
}

export const ConfirmationButtons = ({ onConfirm, onCancel, className = '' }: ConfirmationButtonsProps) => (
  <div className={`flexbox ${className}`}>
    <IconButton onClick={onConfirm} size="small" aria-label="confirm">
      <CheckIcon color="disabled" />
    </IconButton>
    <IconButton onClick={onCancel} size="small" aria-label="cancel">
      <CloseIcon color="disabled" />
    </IconButton>
  </div>
);
