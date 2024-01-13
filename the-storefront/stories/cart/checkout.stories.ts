import type { Meta, StoryObj } from '@storybook/react';
import { createUseCart } from '../test-cart-state';
import { Checkout } from 'components/cart/checkout';
import { cartWithTwoItems } from '../test-data';

const meta = {
    title: 'Cart/Checkout',
    component: Checkout
} satisfies Meta<typeof Checkout>;

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

