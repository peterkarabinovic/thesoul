import type { Meta, StoryObj } from '@storybook/react';
import { createUseCheckout } from "../test-checkout-state"
import { NovaposhtaShippingForm } from '@checkout/components/nv-shipping-form';

const meta = {
    title: 'Checkout/NovaposhtaShippingForm',
    component: NovaposhtaShippingForm
} satisfies Meta<typeof NovaposhtaShippingForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShippingToWarehouse: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile2'
        },
    },
    args: {
        useChechout: createUseCheckout({ selectedOption: { id: "shipping-to-warehouse", name: "Shipping to warehouse" }})
    }
};

export const ShippingToDoor: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile2'
        },
    },
    args: {
        useChechout: createUseCheckout({ 
            selectedOption: { id: "shipping-to-door", name: "Shipping to warehouse" },
            receintAddresses: [
                "вул. Шевченка, 1",
                "вул. Шевченка, 2",
                "вул. Шевченка, 3",
                "вул. Шевченка, 4",
                "вул. Шевченка, 5",
            ]
        })
    }
};

