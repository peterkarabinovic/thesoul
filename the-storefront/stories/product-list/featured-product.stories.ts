import type { Meta, StoryObj } from '@storybook/react';

import { FeaturedProduct } from 'modules/products/components/product-list/product-item';

const meta = {
    title: "Product List/FeaturedItem",
    component: FeaturedProduct
} satisfies Meta<typeof FeaturedProduct>;


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
            handle: 'sweet-impressions',
            description: "Поглибіться у світ солодких насолод і неймовірних вражень. Ідеальні подарунки для справжніх гурманів.",
            featuredImageSrc: 'https://via.placeholder.com/1000x1000',
            price: { amount: "1000", currencyCode: 'UAH' } ,
        }
    }
}

export const Desktop: Story = {
    args: {
        product: { 
            handle: 'sweet-impressions',
            title: 'Енергія Позитиву',
            description: "Подарунки, що принесуть у ваш день світлу енергію та позитив. Оберіть радість для ваших близьких.",
            featuredImageSrc: 'https://via.placeholder.com/1000x1000',
            price: { amount: "1000", currencyCode: 'UAH' } ,
        }
    }
}