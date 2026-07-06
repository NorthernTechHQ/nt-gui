import defineConfig, { config } from '@northern.tech/typescript-config/tsdown.config';

export default defineConfig({
  copy: [{ from: 'public', to: 'dist', flatten: false }],
  loader: {
    ...config.loader,
    '.yaml': 'text'
  }
});
