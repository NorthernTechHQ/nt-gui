import { useMemo } from 'react';

import { CssBaseline, ThemeProvider, createTheme, styled } from '@mui/material';

import { dark as darkAlvaldiTheme, light as lightAlvaldiTheme } from '@northern.tech/themes/Alvaldi';
import { dark as darkCFEngineTheme, light as lightCFEngineTheme } from '@northern.tech/themes/CFEngine';
import { dark as darkMenderTheme, light as lightMenderTheme } from '@northern.tech/themes/Mender';
import '@northern.tech/themes/Mender/styles/main.css';

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
  Alvaldi: {
    id: 'Alvaldi',
    light: lightAlvaldiTheme,
    dark: darkAlvaldiTheme
  },
  Mender: {
    id: 'Mender',
    light: lightMenderTheme,
    dark: darkMenderTheme
  },
  CFEngine: {
    id: 'CFEngine',
    light: lightCFEngineTheme,
    dark: darkCFEngineTheme
  }
};

export const withMuiTheme = (Story, context) => {
  const { product, theme: themeKey } = context.globals;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useMemo(() => createTheme(THEMES[product][themeKey] || THEMES.Mender.light), [product, themeKey]);

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

export const globalProductType = {
  name: 'Product',
  title: 'Product',
  toolbar: {
    icon: 'repository',
    dynamicTitle: true,
    items: [
      { value: THEMES.Alvaldi.id, title: THEMES.Alvaldi.id },
      { value: THEMES.Mender.id, title: THEMES.Mender.id },
      { value: THEMES.CFEngine.id, title: THEMES.CFEngine.id }
    ]
  }
};

export const defaultProduct = THEMES.Mender.id;
