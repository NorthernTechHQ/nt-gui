import type { Preview } from '@storybook/react-vite';
import { mswLoader } from 'msw-storybook-addon/csf3';

import { defaultProduct, defaultTheme, globalProductType, globalThemeType, withMuiTheme } from './utils/themeUtils';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#000' }
      ]
    }
  },
  decorators: [withMuiTheme],
  globalTypes: {
    product: globalProductType,
    theme: globalThemeType
  },
  initialGlobals: { theme: defaultTheme, product: defaultProduct },
  loaders: [mswLoader()],
  tags: ['autodocs']
};

export default preview;
