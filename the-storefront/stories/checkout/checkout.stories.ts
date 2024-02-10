import type { Meta, StoryObj } from '@storybook/react';
import { createUseCart } from '../test-cart-state';
import { CheckoutPage } from '@checkout/components';
import { cartWithTwoItems } from '../test-data';

const meta = {
    title: 'Checkout/CheckoutPage',
    component: CheckoutPage
} satisfies Meta<typeof CheckoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        useCart: createUseCart({ cart: cartWithTwoItems }),
    }
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile2'
        },
    },
    args: {
        useCart: createUseCart({ cart: cartWithTwoItems }),
    }
};

