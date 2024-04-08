import type { Meta, StoryObj } from '@storybook/react';
import { CartView } from '@cart/components/cart-view';
import { createUseCart } from '../test-cart-state';
import { cartWithTwoItems } from '../test-data';

const meta = {
    title: 'Cart/CartView',
    component: CartView
} satisfies Meta<typeof CartView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        cartId: '123',
    }
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile2'
        },
    },
    ...Main
};

