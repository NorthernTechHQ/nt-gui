// Copyright 2026 Northern.tech AS
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
import typographyDefinitions from '../Mender/figma/typography.json' with { type: 'json' };

const typographyTokens = typographyDefinitions.collections.find(({ name }) => name === 'typography');

const themeMode = 'Mode 1';

export const typography = {
  fontFamily: typographyTokens?.variables['fontFamily (body)'].values[themeMode],
  h1: {
    fontWeight: 500
  },
  h2: {
    fontWeight: 500
  },
  h3: {
    fontWeight: 500
  },
  h4: {
    fontWeight: 500
  },
  h5: {
    fontWeight: 500
  },
  h6: {
    fontWeight: 500
  },
  subtitle1: {
    fontWeight: 500
  },
  mono: {
    fontFamily: typographyTokens?.variables['fontFamily (mono)'].values[themeMode]
  },
  code1: {
    fontFamily: typographyTokens?.variables['fontFamily (mono)'].values[themeMode]
  },
  code2: {
    fontSize: '0.875rem',
    fontFamily: typographyTokens?.variables['fontFamily (mono)'].values[themeMode]
  }
};
