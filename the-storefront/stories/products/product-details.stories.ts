import type { Meta, StoryObj } from '@storybook/react';

import { ProductDetails } from 'components/product';

const meta = {
    title: 'Product/ProductDetails',
    component: ProductDetails
} satisfies Meta<typeof ProductDetails>;


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
            id: '1',
            title: 'Солодкі Враження',
            description: "Поглибіться у світ солодких насолод і неймовірних вражень. Ідеальні подарунки для справжніх гурманів.",
            featuredImageSrc: 'https://via.placeholder.com/1000x1000',
            price: { amount: "1000", currencyCode: 'UAH' } ,
        }
    }
}

export const Desktop: Story = {
    args: {
        product: { 
            id: '1',
            title: 'Солодкі Враження',
            description: "Поглибіться у світ солодких насолод і неймовірних вражень. Ідеальні подарунки для справжніх гурманів.",
            featuredImageSrc: 'https://via.placeholder.com/1000x1000',
            price: { amount: "1000", currencyCode: 'UAH' } ,
        }
    }
}
