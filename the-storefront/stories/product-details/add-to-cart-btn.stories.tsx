import type { Meta, StoryObj } from '@storybook/react';

import { AddToCartBtn } from 'components/product-derails/add-to-cart-btn';
import { useCartState } from '../test-cart-state'
import * as D from "../test-data"

const meta = {
    title: "Product/Add To Cart Btn",
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
    args:{
        product: D.productTwoVariants,
        useCart: useCartState
    },
    render: () => {
        return <AddToCartBtn 
            product={D.productTwoVariants}
            useCart={useCartState}
         />
    }
}

