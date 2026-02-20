import { describe, expect, it } from 'vitest';

import libraryConfig from './library';
import reactConfig from './react';
import storybookConfig from './storybook';

const getCleanSnapshot = configStack => {
  return configStack
    .filter(block => !!block.rules)
    .map(block => ({
      files: block.files,
      rules: Object.fromEntries(Object.entries(block.rules).sort()),
      settings: block.settings
    }));
};
describe('ESLint Config Integrity', () => {
  it('library config matches snapshot', () => {
    expect(getCleanSnapshot(libraryConfig)).toMatchSnapshot();
  });
  it('react config matches snapshot', () => {
    expect(getCleanSnapshot(reactConfig)).toMatchSnapshot();
  });

  it('storybook config matches snapshot', () => {
    expect(getCleanSnapshot(storybookConfig)).toMatchSnapshot();
  });
});
