import type { Preview } from '@storybook/react';
import { initialize as initializeMSW, mswLoader } from 'msw-storybook-addon';

import { defaultProduct, defaultTheme, globalProductType, globalThemeType, withMuiTheme } from './utils/themeUtils';

initializeMSW();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [withMuiTheme],
  globalTypes: {
    product: globalProductType,
    theme: globalThemeType
  },
  initialGlobals: { theme: defaultTheme, product: defaultProduct },
  loaders: [mswLoader],
  tags: ['autodocs']
};

export default preview;
