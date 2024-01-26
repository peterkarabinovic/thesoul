
import type { Meta, StoryObj } from '@storybook/react';

import { VariantSelector } from 'modules/products/components/product-derails/variant-selector';
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
        },
        nextjs: { appDirectory: true }
    },
    args:{
        product: D.productTwoVariants
    },
    render: () => {

        return <VariantSelector 
            product={D.productTwoVariants}
         />
    }
}

