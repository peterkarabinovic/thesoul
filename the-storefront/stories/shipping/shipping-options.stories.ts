import type { Meta, StoryObj } from '@storybook/react';

import { ShippingOptions } from 'modules/shipping/components/shipping-options';
import { createUseShipping } from "modules/shipping/data/state"

const meta = {
  title: 'Shipping/ShippingOptions',
  component: ShippingOptions
} satisfies Meta<typeof ShippingOptions>;

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
    cartId: "cart-id",
    shippingStore: createUseShipping({
        state: {
            loadOptions: () => {},
            options: [
                { id: "1", dataId: "сourier-delivery", name: "Courier Delivery" },
                { id: "2", dataId: "shipping-to-warehouse", name: "Shipping to warehouse" },
                { id: "3", dataId: "shipping-to-door", name: "Shipping to door" },
            ],
            selectedOption: { id: "3", dataId: "shipping-to-door", name: "Shipping to door" }
        }
    })
  }
};
