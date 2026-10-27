// Copyright 2022 Northern.tech AS
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
import type { ThemeOptions } from '@mui/material';
import { common, grey as muiGrey } from '@mui/material/colors';

import { listItemStyles, overrides, palette as commonPalette, typography } from './common';

const grey = {
  'A400': '#1d1f20',
  '900': '#4dc3bc',
  '800': '#89c6c1',
  '700': '#a0c7c4',
  '600': '#d7d7d7',
  '500': '#484747',
  '400': '#2a2828',
  '300': '#696868',
  '200': '#b1b1b1',
  '100': '#8c8c8c',
  '50': '#4a4a4a'
};
const paper = '#23252a';

const info = {
  main: muiGrey[700],
  dark: muiGrey[800],
  light: muiGrey[300],
  contrastText: common.white
};

const palette = {
  ...commonPalette,
  mode: 'dark' as const,
  primary: {
    main: '#4d8b96'
  },
  secondary: {
    lighter: '#9e6f8e',
    light: '#8e577b',
    main: '#7d3f69'
  },
  grey,
  greySecondary: {
    '600': '#616161'
  },
  info,
  neutral: info,
  background: {
    light: '#1d1f20',
    lightgrey: paper,
    default: '#1b1c22',
    paper
  },
  text: {
    primary: 'hsl(240deg 5% 93% / 67%)',
    hint: 'hsl(240deg 5% 93% / 67%)'
  },
  error: {
    main: '#ab1000',
    dark: '#dc6a5e'
  },
  tooltip: {
    text: grey[600]
  }
};

export const dark: ThemeOptions = {
  palette,
  typography,
  components: {
    ...overrides,
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: palette.text.primary
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          ...listItemStyles,
          [`&.active`]: {
            backgroundColor: palette.background.default
          },
          [`&.leftNav.active`]: {
            borderTop: `1px solid ${palette.grey[50]}`,
            borderBottom: `1px solid ${palette.grey[50]}`
          }
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
          color: palette.text.primary
        }
      }
    }
  }
};
