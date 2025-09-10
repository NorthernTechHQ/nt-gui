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
import { Button } from '@mui/material';

import { render } from '@/testUtils';
import { undefineds } from '@northern.tech/testing/mockData';
import { fireEvent, screen } from '@testing-library/react';
import copy from 'copy-to-clipboard';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import CopyToClipboard from './CopyToClipboard';

vi.mock('copy-to-clipboard');

const mockCopy = vi.mocked(copy);

describe('CopyToClipboard Component', () => {
  beforeEach(() => {
    mockCopy.mockClear();
    mockCopy.mockReturnValue(true);
  });

  it('renders correctly', () => {
    const { baseElement } = render(
      <CopyToClipboard text="Hello World">
        <Button>Copy</Button>
      </CopyToClipboard>
    );
    const view = baseElement.firstChild;
    expect(view).toMatchSnapshot();
    expect(view).toEqual(expect.not.stringMatching(undefineds));
  });

  it('calls copy-to-clipboard when clicked', () => {
    render(
      <CopyToClipboard text="Hello World">
        <Button>Copy</Button>
      </CopyToClipboard>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockCopy).toHaveBeenCalledWith('Hello World', undefined);
  });

  it('passes options to copy-to-clipboard', () => {
    const options = { debug: true, format: 'text/plain' };

    render(
      <CopyToClipboard text="Hello World" options={options}>
        <Button>Copy</Button>
      </CopyToClipboard>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockCopy).toHaveBeenCalledWith('Hello World', options);
  });

  it('calls both copy and original onClick in correct order', () => {
    const originalOnClick = vi.fn();
    const onCopy = vi.fn();

    render(
      <CopyToClipboard text="Hello World" onClick={originalOnClick} onCopy={onCopy}>
        <Button>Copy</Button>
      </CopyToClipboard>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(mockCopy).toHaveBeenCalledWith('Hello World', undefined);
    expect(onCopy).toHaveBeenCalledWith('Hello World', true);
    expect(originalOnClick).toHaveBeenCalled();
  });

  it('passes through additional props to child element', () => {
    render(
      <CopyToClipboard text="Hello World" className="custom-class" data-testid="copy-btn">
        <Button>Copy</Button>
      </CopyToClipboard>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveAttribute('data-testid', 'copy-btn');
  });

  it('handles copy failure gracefully', () => {
    const onCopy = vi.fn();
    mockCopy.mockReturnValue(false);

    render(
      <CopyToClipboard text="Hello World" onCopy={onCopy}>
        <Button>Copy</Button>
      </CopyToClipboard>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockCopy).toHaveBeenCalledWith('Hello World', undefined);
    expect(onCopy).toHaveBeenCalledWith('Hello World', false);
  });
});
