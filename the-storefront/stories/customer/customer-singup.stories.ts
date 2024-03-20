import type { Meta, StoryObj } from '@storybook/react';

import { CustomerSingUp } from 'modules/customer/components/customer-signup';

const meta = {
  title: 'Customer/CustomerSingUp',
  component: CustomerSingUp
} satisfies Meta<typeof CustomerSingUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    },
    nextjs: { appDirectory: true }
  }
};
