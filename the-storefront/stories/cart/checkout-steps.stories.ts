import type { Meta, StoryObj } from '@storybook/react';

import { CheckoutSteps } from 'components/cart/checkout-steps';

const meta = {
    title: 'Cart/CheckoutSteps',
    component: CheckoutSteps
} satisfies Meta<typeof CheckoutSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: { 
        step: 1,
        onClick: () => {},
        disabledSteps: []
    }
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile2'
        },
    },
    args: { 
        step: 1,
        onClick: () => {},
        disabledSteps: [3]
    }
};

