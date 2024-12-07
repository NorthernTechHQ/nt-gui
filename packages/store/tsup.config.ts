import { defineConfig } from 'tsup';

import { peerDependencies } from './package.json';

export default defineConfig(options => ({
  format: ['cjs', 'esm'],
  dts: true,
  entry: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.test.{js,jsx,ts,tsx}', '!src/api/types'],
  sourcemap: true,
  target: 'esnext',
  platform: 'browser',
  loader: { '.js': 'jsx' },
  external: [...Object.keys(peerDependencies)],
  ...options
}));
