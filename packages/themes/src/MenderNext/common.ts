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
import { blue, cyan, grey, purple } from '@mui/material/colors';

// breakpoints, metadata, shape config, spacing are not adjusted in the theme
import colorDefinitions from './figma/material_colors.json' with { type: 'json' };
import typographyDefinitions from './figma/typography.json' with { type: 'json' };

const typographyTokens = typographyDefinitions.collections.find(({ name }) => name === 'typography');
const colorTokens = colorDefinitions.collections.find(({ name }) => name === 'material/colors');

export const typography = {
  fontFamily: typographyTokens?.variables.fontFamily.values['Mode 1'],
  body1: {
    fontFamily: typographyTokens?.variables['fontFamily (body)'].values['Mode 1']
  }
};

export const colors = {
  grey: {
    ...grey,
    50: colorTokens?.variables['grey (M)']['50'].values['Mode 1'] || grey[50],
    100: colorTokens?.variables['grey (M)']['100'].values['Mode 1'] || grey[100],
    200: colorTokens?.variables['grey (M)']['200'].values['Mode 1'] || grey[200],
    300: colorTokens?.variables['grey (M)']['300'].values['Mode 1'] || grey[300],
    400: colorTokens?.variables['grey (M)']['400'].values['Mode 1'] || grey[400],
    500: colorTokens?.variables['grey (M)']['500'].values['Mode 1'] || grey[500],
    600: colorTokens?.variables['grey (M)']['600'].values['Mode 1'] || grey[600],
    700: colorTokens?.variables['grey (M)']['700'].values['Mode 1'] || grey[700],
    800: colorTokens?.variables['grey (M)']['800'].values['Mode 1'] || grey[800],
    900: colorTokens?.variables['grey (M)']['900'].values['Mode 1'] || grey[900]
  },
  purple: {
    ...blue, // ...remainder colors (A100 - A700) should be based on 'blue'
    50: colorTokens?.variables['purple(M)']['50'].values['Mode 1'] || purple[50],
    100: colorTokens?.variables['purple(M)']['100'].values['Mode 1'] || purple[100],
    200: colorTokens?.variables['purple(M)']['200'].values['Mode 1'] || purple[200],
    300: colorTokens?.variables['purple(M)']['300'].values['Mode 1'] || purple[300],
    400: colorTokens?.variables['purple(M)']['400'].values['Mode 1'] || purple[400],
    500: colorTokens?.variables['purple(M)']['500'].values['Mode 1'] || purple[500],
    600: colorTokens?.variables['purple(M)']['600'].values['Mode 1'] || purple[600],
    700: colorTokens?.variables['purple(M)']['700'].values['Mode 1'] || purple[700],
    800: colorTokens?.variables['purple(M)']['800'].values['Mode 1'] || purple[800],
    900: colorTokens?.variables['purple(M)']['900'].values['Mode 1'] || purple[900]
  },
  cyan: {
    ...cyan,
    50: colorTokens?.variables['cyan (M)']['50'].values['Mode 1'] || cyan[50],
    100: colorTokens?.variables['cyan (M)']['100'].values['Mode 1'] || cyan[100],
    200: colorTokens?.variables['cyan (M)']['200'].values['Mode 1'] || cyan[200],
    300: colorTokens?.variables['cyan (M)']['300'].values['Mode 1'] || cyan[300],
    400: colorTokens?.variables['cyan (M)']['400'].values['Mode 1'] || cyan[400],
    500: colorTokens?.variables['cyan (M)']['500'].values['Mode 1'] || cyan[500],
    600: colorTokens?.variables['cyan (M)']['600'].values['Mode 1'] || cyan[600],
    700: colorTokens?.variables['cyan (M)']['700'].values['Mode 1'] || cyan[700],
    800: colorTokens?.variables['cyan (M)']['800'].values['Mode 1'] || cyan[800],
    900: colorTokens?.variables['cyan (M)']['900'].values['Mode 1'] || cyan[900]
  }
};
