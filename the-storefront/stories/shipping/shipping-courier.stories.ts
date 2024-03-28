

import type { Meta, StoryObj } from '@storybook/react';

import { ShippingCourier } from 'modules/shipping/components/shipping-сourier';
import { createUseCourierShipping } from "modules/shipping/data/state"

const meta = {
  title: 'Shipping/ShippingCourier',
  component: ShippingCourier
} satisfies Meta<typeof ShippingCourier>;

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
    lang: "en",
    useCourierShipping: createUseCourierShipping({
        receintAddresses: [
            "Address 1",
            "Address 2",
            "Address 3",
            "Address 4",
            "Address 5",
        ],
    })
  }
};
