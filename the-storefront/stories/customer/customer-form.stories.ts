import type { Meta, StoryObj } from '@storybook/react';

import { CustomerForm } from 'modules/customer/components/customer-form';

const meta = {
  title: 'Customer/CustomerForm',
  component: CustomerForm
} satisfies Meta<typeof CustomerForm>;

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
