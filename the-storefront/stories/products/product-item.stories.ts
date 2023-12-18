import type { Meta, StoryObj } from '@storybook/react';

import { ProductListItem } from 'components/product-2';

const meta = {
    title: 'Components/Product/ProductListItem',
    component: ProductListItem
} satisfies Meta<typeof ProductListItem>;


export default meta;
type Story = StoryObj<typeof meta>;


export const Mobile: Story = {
    parameters:{
        viewport:{
            defaultViewport: 'mobile2'
        } 
    },
    args: {
        product: { 
            title: 'Солодкі Враження',
            description: "Поглибіться у світ солодких насолод і неймовірних вражень. Ідеальні подарунки для справжніх гурманів.",
            images: [
                { url: 'https://via.placeholder.com/1000x1000', altText: 'Product image' } as any,
            ],
            priceRange: { maxVariantPrice: { amount: "1000", currencyCode: 'UAH' } },
        }
    }
}

