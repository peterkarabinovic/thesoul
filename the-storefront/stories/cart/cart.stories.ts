import type { Meta, StoryObj } from '@storybook/react';
import { createUseCart } from '../test-cart-state';
import { Cart } from 'components/cart';
import { cartWithTwoItems } from '../test-data';

const meta = {
    title: 'Cart/Cart',
    component: Cart
} satisfies Meta<typeof Cart>;

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

