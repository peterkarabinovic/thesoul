import type { Meta, StoryObj } from '@storybook/react';

import { CartDetails } from 'components/cart/cart-details';
import { cartWithTwoItems } from '../test-data';

const meta = {
    title: 'Cart/CartDetails',
    component: CartDetails
} satisfies Meta<typeof CartDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: { 
        cart: cartWithTwoItems,
    }
};

export const Long: Story = {
    args: { 
        cart: cartWithTwoItems,
    }
};

