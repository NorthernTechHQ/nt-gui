import { defineConfig } from 'tsdown';

export default defineConfig(options => ({
  format: ['cjs', 'esm'],
  ...options
}));
