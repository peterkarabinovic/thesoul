import type { Meta, StoryObj } from '@storybook/react';
import { createUseCart } from '../test-cart-state';
import { CartDetails } from '@cart/components/cart-details';
import { cartWithTwoItems } from '../test-data';

const meta = {
    title: 'Cart/CartDetails',
    component: CartDetails
} satisfies Meta<typeof CartDetails>;

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

