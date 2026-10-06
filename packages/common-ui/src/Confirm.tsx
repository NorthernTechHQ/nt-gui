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
import type { CSSProperties, MouseEventHandler } from 'react';
import { useState } from 'react';

import { Cancel as CancelIcon, CheckCircle as CheckCircleIcon, Check as CheckIcon, Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { isDarkMode } from '@northern.tech/store/utils';

const useStyles = makeStyles()(theme => ({
  nudgeInward: { marginRight: 6 },
  wrapper: {
    zIndex: 1,
    background: isDarkMode(theme.palette.mode) ? theme.palette.info.dark : theme.palette.info.light,
    opacity: 1,
    height: '100%',
    justifyContent: 'flex-end'
  }
}));

const defaultRemoving = 'Removing...';

export const confirmationType = {
  retry: {
    loading: 'Creating new deployment...',
    message: 'Confirm retry?'
  },
  abort: {
    loading: 'Aborting...',
    message: 'Confirm abort?'
  },
  chartRemoval: {
    loading: defaultRemoving,
    message: 'Remove this chart?'
  },
  decommissioning: {
    loading: 'Decommissioning...',
    message: 'Decommission this device and remove all of its data from the server. This cannot be undone. Are you sure?'
  },
  deploymentContinuation: {
    loading: 'Continuing...',
    message: 'All devices with no errors will continue to the next step of the updates. Confirm continue?'
  },
  deploymentAbort: {
    loading: 'Aborting...',
    message: 'This will abort the deployment and attempt to roll back all devices. Confirm abort?'
  },
  webhooksRemoval: {
    loading: defaultRemoving,
    message: 'Delete all webhooks?'
  }
};

export interface ConfirmProps {
  action: () => void;
  cancel: () => void;
  classes?: string;
  message?: string;
  style?: CSSProperties;
  type?: keyof typeof confirmationType;
}

export const Confirm = ({ action, cancel, classes = '', message = '', style = {}, type }: ConfirmProps) => {
  const [className, setClassName] = useState('fadeIn');
  const [loading, setLoading] = useState(false);
  const { classes: localClasses } = useStyles();

  const handleCancel = () => {
    setClassName('fadeOut');
    cancel();
  };
  const handleConfirm = () => {
    setLoading(true);
    action();
  };

  let notification = message;
  if (type && confirmationType[type]) {
    notification = loading ? confirmationType[type].loading : confirmationType[type].message;
  }
  return (
    <div className={`flexbox align-items-center padding-right-small absolute full-width ${className} ${localClasses.wrapper} ${classes}`} style={style}>
      <Typography className="margin-right-small" variant="subtitle2">
        {notification}
      </Typography>
      <IconButton id="confirmAbort" onClick={handleConfirm}>
        <CheckCircleIcon className="green" fontSize="small" />
      </IconButton>
      <IconButton className={localClasses.nudgeInward} onClick={handleCancel}>
        <CancelIcon className="red" fontSize="small" />
      </IconButton>
    </div>
  );
};

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

export default Confirm;
