import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutPage } from '@checkout/components';
import { cartWithTwoItems } from '../test-data';
import { createUseCart } from '../test-cart-state';
import { createUseCheckout } from "../test-checkout-state"

const meta = {
    title: 'Checkout/CheckoutPage',
    component: CheckoutPage
} satisfies Meta<typeof CheckoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        step: 'shipping',
        useCart: createUseCart({ cart: cartWithTwoItems }),
        useCheckout: createUseCheckout({ cartEmpty: false })

    }
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile2'
        },
    },
    ...Main,
};

