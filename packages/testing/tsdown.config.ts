import defineConfig, { config } from '@northern.tech/typescript-config/tsdown.config';

export default defineConfig({
  publicDir: 'public',
  loader: {
    ...config.loader,
    '.yaml': 'text'
  }
});
