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
import { PaletteOptions, ThemeOptions, alertClasses, outlinedInputClasses } from '@mui/material';
import { common, red } from '@mui/material/colors';

import { components as baseComponents, colors, typography } from './common';

const info = {
  main: colors.grey[700],
  dark: colors.grey[800],
  light: colors.grey[300],
  contrastText: common.white
};

const palette: PaletteOptions = {
  ...colors,
  mode: 'dark',
  primary: {
    main: colors.purple[200],
    dark: colors.purple[400],
    light: colors.purple[50]
  },
  secondary: {
    main: colors.cyan[200],
    dark: colors.cyan[400],
    light: colors.cyan[50]
  },
  error: {
    main: red[400],
    dark: red[700],
    light: red[300],
    contrastText: common.white
  },
  info,
  neutral: info
};

export const dark: ThemeOptions = {
  palette,
  typography,
  components: {
    ...baseComponents,
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'rgba(255, 255, 255, 0.42)'
          },
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'rgba(255, 255, 255, 0.65)'
          },
          [`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'rgba(255, 255, 255, 0.42)'
          }
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          [`& .${alertClasses.colorError}`]: {
            backgroundColor: 'rgba(244, 67, 54, 0.2)'
          },
          [`& .${alertClasses.colorWarning}`]: {
            backgroundColor: 'rgba(255, 152, 0, 0.2)'
          },
          [`& .${alertClasses.colorInfo}`]: {
            backgroundColor: 'rgba(33, 150, 243, 0.2)'
          },
          [`& .${alertClasses.colorSuccess}`]: {
            backgroundColor: 'rgba(76, 175, 80, 0.2)'
          }
        }
      }
    }
  }
};
