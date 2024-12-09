import { config } from '@northern.tech/typescript-config/tsup-config.js';
import { defineConfig } from 'tsup';

export default defineConfig(options => ({
  ...config,
  entry: [...config.entry, '!src/api/types'],
  ...options
}));
