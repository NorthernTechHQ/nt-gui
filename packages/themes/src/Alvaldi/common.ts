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
import type { Components, Theme } from '@mui/material';

import { components } from '../common';

export { typography } from '../common';

const secondaryText = '#424242';

const brandColors = {
  white: '#FFFFFF',
  primary: {
    main: '#14A452'
  },
  secondary: {
    main: '#FFFFFF'
  },
  error: {
    light: 'rgba(93, 15, 67, 0.075)',
    main: '#A11100',
    dark: '#770b00' // hardcode same as darken to match less variables
  },
  success: {
    main: '#009e73'
  },
  text: {
    /**
     * color matched from variables.less @text of #404041 but by opacity, same as main
     */
    primary: 'rgba(10, 10, 11, 0.78)',
    secondary: secondaryText,
    hint: secondaryText,
    inactive: '#616161'
  },
  brand: {
    mender: '#015969',
    northernTech: '#28aee4'
  },
  terminal: {
    backgroundInactive: 'rgba(33, 36, 41, 0.25)'
  },
  surface: {
    primary: '#F5F5F5'
  },
  backdrop: 'rgba(9, 9, 9, 0.8)'
};

export const chartColorPalette = [brandColors.primary.main, '#a31773', '#00859e', '#14cfda', '#9bfff0', '#d5d5d5'];

const qualitative = ['a', 'b', 'c', 'd', 'e', 'f'].reduce((accu, key, index) => ({ ...accu, [key]: { main: chartColorPalette[index] } }), {});

export const palette = {
  ...brandColors,
  qualitative
};

export const listItemStyles = {
  paddingTop: 11,
  paddingBottom: 11,
  // the global state class names are used directly as ListItem itself no longer exposes selected/disabled classes
  ['&.Mui-disabled']: {
    opacity: 1
  },
  [`&.Mui-selected, &.Mui-selected:hover, &:hover`]: {
    backgroundColor: palette.surface.primary
  }
};

export const overrides: Components<Theme> = {
  ...components,
  MuiListItem: {
    styleOverrides: {
      root: listItemStyles
    }
  },
  MuiListItemText: {
    styleOverrides: {
      root: {
        marginTop: 0,
        marginBottom: 0
      }
    }
  },
  MuiSnackbarContent: {
    styleOverrides: {
      action: {
        color: palette.primary.main
      }
    }
  }
};
