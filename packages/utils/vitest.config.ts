import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const baseConfigPath = await import.meta.resolve('@northern.tech/testing/baseTestConfig.json');
const baseConfig = JSON.parse(fs.readFileSync(fileURLToPath(baseConfigPath), 'utf-8'));

export default defineConfig(baseConfig);
