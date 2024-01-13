import type { Meta, StoryObj } from '@storybook/react';

import { CartBtn } from 'components/cart/cart-btn';
import { createUseCart } from '../test-cart-state';
import { cartWithTwoItems } from '../test-data';

const meta = {
    title: 'Cart/CartBtn',
    component: CartBtn
} satisfies Meta<typeof CartBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: { 
        useCart: createUseCart({ cart: cartWithTwoItems }),
    }
};


