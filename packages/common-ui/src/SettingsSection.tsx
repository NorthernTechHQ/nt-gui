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
import type { ReactNode } from 'react';

import { Divider, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { SETTINGS_CONTENT_MAX_WIDTH } from './SettingsItem';

export interface SettingsSectionProps {
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  fullWidthContent?: ReactNode;
  title: string | ReactNode;
}

const useStyles = makeStyles()(({ spacing }) => ({
  actions: { gap: spacing(2) },
  content: { maxWidth: SETTINGS_CONTENT_MAX_WIDTH }
}));

export const SettingsSection = ({ actions, children, className = '', fullWidthContent, title }: SettingsSectionProps) => {
  const { classes } = useStyles();
  return (
    <section className={className}>
      <div className="flexbox space-between">
        {typeof title === 'string' ? <Typography variant="h5">{title}</Typography> : title}
        {actions && <div className="flexbox align-items-center gap-small">{actions}</div>}
      </div>
      <Divider className="margin-bottom-medium margin-top-small" />
      {children && <div className={classes.content}>{children}</div>}
      {fullWidthContent}
    </section>
  );
};
