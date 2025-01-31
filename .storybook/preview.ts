import type { Preview } from '@storybook/react';

import { defaultTheme, globalThemeType, withMuiTheme } from './utils/themeUtils';

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
  initialGlobals: { theme: defaultTheme }
};

export default preview;
