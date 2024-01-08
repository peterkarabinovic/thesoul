import type { Meta, StoryObj } from '@storybook/react';

import { ProductListItem } from 'components/product-list/product-item';

const meta = {
    title: "Product List/Item",
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
            handle: '1',
            title: 'Солодкі Враження',
            description: "Поглибіться у світ солодких насолод і неймовірних вражень. Ідеальні подарунки для справжніх гурманів.",
            featuredImageSrc: 'https://via.placeholder.com/1000x1000',
            price: { amount: "1000", currencyCode: 'UAH' } ,
        }
    }
}

