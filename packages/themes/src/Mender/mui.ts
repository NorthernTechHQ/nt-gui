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
//    limitations under the License.
import type { CSSProperties } from 'react';

import type { PaletteOptions as MuiPaletteOptions } from '@mui/material';

// Re-exported from index to force the bundler to keep a type-level reference
// to this module. Otherwise the module augmentations below would not reach consumers.
export type DummyType = never;

declare module '@mui/material' {
  interface PaletteOptions extends MuiPaletteOptions {
    neutral?: {
      contrastText: string;
      dark: string;
      light: string;
      main: string;
    };
  }

  interface Palette {
    neutral: {
      contrastText: string;
      dark: string;
      light: string;
      main: string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    code1: CSSProperties;
    code2: CSSProperties;
    mono: CSSProperties;
  }
  interface TypographyVariantsOptions {
    code1?: CSSProperties;
    code2?: CSSProperties;
    mono?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    code1: true;
    code2: true;
    mono: true;
  }
}
