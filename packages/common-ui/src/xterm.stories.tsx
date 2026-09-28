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
import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Terminal } from '@xterm/xterm';

import type { XtermProps, XtermRefContent } from './xterm';
import { Xterm } from './xterm';

const welcomeText = ['Connected to device qemux86-64.', 'Type something - the demo terminal echoes your input.', ''].join('\r\n');

// the terminal instance is owned by the consumer, so the story sets up the refs the component expects
const XtermWrapper = (props: Omit<XtermProps, 'xtermRef'>) => {
  const terminal = useRef<Terminal | null>(null);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const xtermRef = useRef<XtermRefContent>({ terminal, terminalRef });

  useEffect(() => {
    terminal.current?.write(`${welcomeText}\r\n$ `);
  }, []);

  return <Xterm xtermRef={xtermRef} onData={(data: string) => terminal.current?.write(data)} {...props} />;
};

const meta: Meta<typeof Xterm> = {
  component: Xterm,
  title: 'common-ui/Xterm'
};

export default meta;

type Story = StoryObj<typeof XtermWrapper>;

export const Primary: Story = {
  name: 'Xterm',
  render: args => <XtermWrapper {...args} />,
  args: {
    className: 'terminal-container',
    options: { cursorBlink: true, fontSize: 14 },
    style: { height: 300, width: 600 }
  }
};

export const WithResizeHandling: Story = {
  name: 'With resize handling',
  render: args => <XtermWrapper {...args} />,
  args: {
    ...Primary.args,
    onResize: ({ cols, rows }) => console.log('terminal resized to:', { cols, rows }),
    triggerResize: true
  }
};
