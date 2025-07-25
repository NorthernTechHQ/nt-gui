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
//@ts-nocheck
import type { ForwardRefRenderFunction } from 'react';
import React, { memo } from 'react';

import { getFormattedSize } from '@northern.tech/utils/helpers';

interface FileSizeProps {
  fileSize: number;
  style?: React.CSSProperties;
}

const FileSize: ForwardRefRenderFunction<HTMLDivElement, FileSizeProps> = ({ fileSize, style = {} }, ref) => (
  <div ref={ref} style={style}>
    {getFormattedSize(fileSize)}
  </div>
);

export default memo(React.forwardRef(FileSize));
