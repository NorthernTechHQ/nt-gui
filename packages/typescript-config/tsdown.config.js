import { defineConfig } from 'tsdown';

export const config = {
  format: ['cjs', 'esm'],
  dts: true,
  entry: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.test.{js,jsx,ts,tsx}', '!src/**/*.stories.{js,jsx,ts,tsx}'],
  sourcemap: true,
  skipNodeModulesBundle: true,
  clean: true,
  loader: {
    '.js': 'jsx',
    '.svg': 'dataurl',
    '.png': 'dataurl',
    '.jpg': 'dataurl',
    '.gif': 'dataurl'
  },
  outExtensions: ({ format }) => ({ js: format === 'es' ? `.js` : '.cjs' })
};

export default defineConfig(options => ({ ...config, ...options }));
