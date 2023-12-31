import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AddToCartBtn } from 'components/product/add-to-cart-btn';

const meta = {
    title: 'Product/AddToCartBtn',
    component: AddToCartBtn
} satisfies Meta<typeof AddToCartBtn>;


export default meta;
type Story = StoryObj<typeof meta>;


export const Mobile: Story = {
    parameters:{
        viewport:{
            defaultViewport: 'mobile2'
        } 
    },
    render: () => {
        const [count, setCount] = useState(0);
        const [loading, setLoading] = useState(false);

        const handleAdd = () => {
            setLoading(true);
            setTimeout(() => { setLoading(false); setCount(count + 1); }, 1000);
        }


        return <AddToCartBtn 
            count={count}
            loading={loading}
            addToCart={handleAdd}
            removeFromCart={() => setCount(count - 1)}
         />
    }
}

