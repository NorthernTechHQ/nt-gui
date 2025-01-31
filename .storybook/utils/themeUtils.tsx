import { useMemo } from 'react';

import { CssBaseline, ThemeProvider, createTheme, styled } from '@mui/material';

import { dark as darkTheme, light as lightTheme } from '../../packages/themes/src/Mender/index';
import '../../packages/themes/src/Mender/styles/main.less';

const reducePalette =
  prefix =>
  (accu, [key, value]) => {
    if (value instanceof Object) {
      return {
        ...accu,
        ...Object.entries(value).reduce(reducePalette(`${prefix}-${key}`), {})
      };
    } else {
      accu[`${prefix}-${key}`] = value;
    }
    return accu;
  };

const cssVariables = ({ theme: { palette } }) => {
  const muiVariables = Object.entries(palette).reduce(reducePalette('--mui'), {});
  return {
    '@global': {
      ':root': {
        ...muiVariables,
        '--mui-overlay': palette.grey[400]
      }
    }
  };
};

const WrappedBaseline = styled(CssBaseline)(cssVariables);

const THEMES = {
  light: lightTheme,
  dark: darkTheme
};

export const withMuiTheme = (Story, context) => {
  const { theme: themeKey } = context.globals;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useMemo(() => createTheme(THEMES[themeKey] || THEMES['light']), [themeKey]);

  return (
    <ThemeProvider theme={theme}>
      <WrappedBaseline enableColorScheme />
      <Story {...context} />
    </ThemeProvider>
  );
};

export const globalThemeType = {
  name: 'Theme',
  title: 'Theme',
  toolbar: {
    icon: 'paintbrush',
    dynamicTitle: true,
    items: [
      { value: 'light', left: '☀️', title: 'Light mode' },
      { value: 'dark', left: '🌙', title: 'Dark mode' }
    ]
  }
};

export const defaultTheme = 'light';
