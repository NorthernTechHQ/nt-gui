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
import type { CSSProperties } from 'react';

// Re-exported from index to force the bundler to keep a type-level reference
// to this module. Otherwise the module augmentations below would not reach consumers.
export type CFEngineDummyType = never;

declare module '@mui/material/styles' {
  interface TypographyVariants {
    hint: CSSProperties;
    labelSmall: CSSProperties;
    statValue: CSSProperties;
  }
  interface TypographyVariantsOptions {
    hint?: CSSProperties;
    labelSmall?: CSSProperties;
    statValue?: CSSProperties;
  }
  // Optional, as augmentations are global and other themes don't provide these.
  interface TypeBackground {
    code?: string;
    // Text fields / selects rendered on top of a filled panel.
    input?: string;
    lightgrey?: string;
    // Dropdown and popover surfaces; `paper` is a light gray in the light theme.
    menu?: string;
    summary?: string;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    hint: true;
    labelSmall: true;
    statValue: true;
  }
}
