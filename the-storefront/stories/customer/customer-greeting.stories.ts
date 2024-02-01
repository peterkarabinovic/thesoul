import type { Meta, StoryObj } from '@storybook/react';

import { CustomerGreeting } from 'modules/customer/components/customer-greeting';

const meta = {
  title: 'Customer/CustomerGreeting',
  component: CustomerGreeting
} satisfies Meta<typeof CustomerGreeting>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    },
    nextjs: { appDirectory: true }
  },
  args: {
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      telegram: 'telegram'
    },
    linkToProfile: "/profile"
  }
};
