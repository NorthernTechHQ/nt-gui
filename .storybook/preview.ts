import type { Preview } from '@storybook/react';
import { initialize as initializeMSW, mswLoader } from 'msw-storybook-addon';

import { defaultTheme, globalThemeType, withMuiTheme } from './utils/themeUtils';

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
    theme: globalThemeType
  },
  initialGlobals: { theme: defaultTheme },
  loaders: [mswLoader]
};

export default preview;
