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
import type { HTMLAttributes, MouseEvent, ReactElement } from 'react';
import { Children, cloneElement } from 'react';

import copy from 'copy-to-clipboard';

interface CopyToClipboardOptions {
  debug?: boolean;
  format?: string;
  message?: string;
  onCopy?: (clipboardData: object) => void;
}

interface CopyToClipboardProps extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'onClick' | 'onCopy'> {
  children: ReactElement;
  onClick?: (event: MouseEvent) => void;
  onCopy?: (text: string, result: boolean) => void;
  options?: CopyToClipboardOptions;
  text: string;
}

export const CopyToClipboard = ({ text, onCopy, children, options, onClick: originalOnClick, ...props }: CopyToClipboardProps) => {
  const handleClick = (event: MouseEvent) => {
    const copied = copy(text, options);
    if (onCopy) {
      copied.then(result => onCopy(text, result));
    }
    if (originalOnClick && typeof originalOnClick === 'function') {
      originalOnClick(event);
    }
  };

  const elem = Children.only(children);
  return cloneElement(elem, { ...props, onClick: handleClick } as any);
};

export default CopyToClipboard;
