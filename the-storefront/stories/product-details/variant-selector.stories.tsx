
import type { Meta, StoryObj } from '@storybook/react';

import { VariantSelector } from 'components/product-derails/variant-selector';
import { useCartState } from '../test-cart-state'
import * as D from "../test-data"

const meta = {
    title: "Product/VariantSelector",
    component: VariantSelector
} satisfies Meta<typeof VariantSelector>;


export default meta;
type Story = StoryObj<typeof meta>;


export const Mobile: Story = {
    parameters:{
        viewport:{
            defaultViewport: 'mobile2'
        } 
    },
    args:{
        product: D.productTwoVariants
    },
    render: () => {

        return <VariantSelector 
            product={D.productTwoVariants}
            useCart={useCartState}
         />
    }
}

