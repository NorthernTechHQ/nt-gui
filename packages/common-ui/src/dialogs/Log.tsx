// Copyright 2020 Northern.tech AS
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
//@ts-nocheck
import { useState } from 'react';

import CopyToClipboard from '../CopyToClipboard';

import { Button, DialogActions, DialogContent } from '@mui/material';

import { createFileDownload } from '@northern.tech/utils/helpers';

import { Code } from '../CopyCode';
import { BaseDialog } from './BaseDialog';

const wrapperStyle = { marginRight: 10, display: 'inline-block' };

const dialogTypes = {
  'deviceLog': {
    title: 'Deployment log for device',
    filename: ({ device, releaseName, date }) => `deployment-log-${device}-${releaseName}-${date}.log`
  },
  'configUpdateLog': {
    title: 'Config update log for device',
    filename: () => 'configuration-update.log'
  }
};

export const LogDialog = ({ context = {}, logData = '', onClose, type = 'deviceLog' }) => {
  const [copied, setCopied] = useState(false);

  const exportLog = () => createFileDownload(logData, dialogTypes[type].filename(context), '');

  return (
    <BaseDialog open title={dialogTypes[type].title} maxWidth="lg" onClose={onClose}>
      <DialogContent>
        <Code className="log">{logData}</Code>
        <p style={{ marginLeft: 24 }}>{copied && <span className="green fadeIn">Copied to clipboard.</span>}</p>
      </DialogContent>
      <DialogActions>
        <div style={wrapperStyle}>
          <Button onClick={onClose}>Cancel</Button>
        </div>
        <CopyToClipboard text={logData} onCopy={() => setCopied(true)}>
          <Button style={wrapperStyle}>Copy to clipboard</Button>
        </CopyToClipboard>
        <Button variant="contained" color="primary" onClick={exportLog}>
          Export log
        </Button>
      </DialogActions>
    </BaseDialog>
  );
};

export default LogDialog;
