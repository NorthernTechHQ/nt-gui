import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const baseConfigPath = await import.meta.resolve('@northern.tech/testing/baseTestConfig.json');
const baseConfig = JSON.parse(fs.readFileSync(fileURLToPath(baseConfigPath), 'utf-8'));

export default defineConfig({
  ...baseConfig,
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@/testUtils',
        replacement: path.resolve(__dirname, 'testUtils')
      }
    ]
  }
});
