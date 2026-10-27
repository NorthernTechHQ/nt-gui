import { defineConfig } from 'tsdown';

export default defineConfig(options => ({
  format: ['esm'],
  ...options
}));
