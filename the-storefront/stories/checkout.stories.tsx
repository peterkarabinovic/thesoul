import type { Meta, StoryObj } from '@storybook/react';
import { createUseCart } from './test-cart-state';
import { CheckoutSteps } from '@checkout/components';
import { cartWithTwoItems } from './test-data';

const meta = {
    title: 'Checkout/CheckoutSteps',
    component: CheckoutSteps
} satisfies Meta<typeof CheckoutSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        useCart: createUseCart({ cart: cartWithTwoItems }),
        canGoNext: true,
        step: 'cart',
        children: <div className='bg-purple-400 w-full h-full'></div>
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
        canGoNext: true,
        step: 'cart',
        children: <div className='bg-green-500 w-24 h-24'></div>
    }
};

