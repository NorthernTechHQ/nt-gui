import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeExplorer } from './ThemeExplorer';

const meta: Meta<typeof ThemeExplorer> = {
  title: 'common/ThemeExplorer',
  component: ThemeExplorer
};

export default meta;

type Story = StoryObj<typeof ThemeExplorer>;

export const Primary: Story = {
  name: 'ThemeExplorer'
};
