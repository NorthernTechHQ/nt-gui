import { GLOBALS_UPDATED, UPDATE_GLOBALS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
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

const storyListener = ({ globals }) => {
  if (globals.theme !== globals.backgrounds?.name) {
    channel.emit(UPDATE_GLOBALS, {
      globals: {
        backgrounds: globals.theme === 'dark' ? { name: 'dark', value: '#000' } : { name: 'light', value: '#fff' }
      }
    });
  }
};

const channel = addons.getChannel();
channel.removeListener(GLOBALS_UPDATED, storyListener);
channel.addListener(GLOBALS_UPDATED, storyListener);

export default preview;
