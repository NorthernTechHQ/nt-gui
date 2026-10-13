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
import { Button } from '@mui/material';

import { render } from '@/testUtils';
import { undefineds } from '@northern.tech/testing/mockData';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SETTINGS_CONTENT_MAX_WIDTH } from './SettingsItem';
import { SettingsSection } from './SettingsSection';

describe('SettingsSection Component', () => {
  it('renders correctly', async () => {
    const { baseElement } = render(
      <SettingsSection title="User management" actions={<Button>Add new user</Button>} fullWidthContent={<table />}>
        <p>constrained content</p>
      </SettingsSection>
    );
    const view = baseElement.firstChild?.firstChild as HTMLElement;
    expect(view).toMatchSnapshot();
    expect(view).toEqual(expect.not.stringMatching(undefineds));
    expect(screen.getByRole('heading', { name: 'User management' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add new user' })).toBeInTheDocument();
  });

  it('constrains children but not the full width content', async () => {
    render(
      <SettingsSection title="Roles" fullWidthContent={<div>table placeholder</div>}>
        <div>alert placeholder</div>
      </SettingsSection>
    );
    expect(screen.getByText('alert placeholder').parentElement).toHaveStyle({ maxWidth: `${SETTINGS_CONTENT_MAX_WIDTH}px` });
    expect(screen.getByText('table placeholder').parentElement?.tagName).toBe('SECTION');
  });
});
