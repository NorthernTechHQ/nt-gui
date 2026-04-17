import defineConfig from '@northern.tech/typescript-config/tsdown.config';
import less from 'less';
import path from 'path';

const lessPlugin = () => ({
  name: 'less',
  async transform(code, id) {
    if (!id.endsWith('.less')) return null;
    const result = await less.render(code, { filename: id, paths: [path.dirname(id)] });
    return { code: result.css, moduleType: 'css' };
  }
});

export default defineConfig({
  dts: { entry: ['src/**/*.{ts,tsx}'] },
  publicDir: 'public',
  plugins: [lessPlugin()]
});
