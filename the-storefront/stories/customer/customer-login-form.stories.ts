import type { Meta, StoryObj } from '@storybook/react';

import { CustomerLoginForm } from 'modules/customer/components/customer-login-form';

const meta = {
  title: 'Customer/CustomerLoginForm',
  component: CustomerLoginForm
} satisfies Meta<typeof CustomerLoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    },
  },
  args: {
    
    otpSentAt: Date.now(),
  }
};
