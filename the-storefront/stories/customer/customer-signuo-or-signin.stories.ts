import type { Meta, StoryObj } from '@storybook/react';

import { CustomerSignUpOrSignIn } from 'modules/customer/components/customer-signup-or-signin';

const meta = {
  title: 'Customer/CustomerSignUpOrSignIn',
  component: CustomerSignUpOrSignIn
} satisfies Meta<typeof CustomerSignUpOrSignIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
  ,args: {
    lang: "en",
    customerId: "123"
  }
};
