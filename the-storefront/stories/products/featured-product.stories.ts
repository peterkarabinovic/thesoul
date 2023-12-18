import type { Meta, StoryObj } from '@storybook/react';

import { FeaturedProduct } from 'components/product-2';

const meta = {
    title: 'Components/Product/FeaturedProduct',
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
            description: "Поглибіться у світ солодких насолод і неймовірних вражень. Ідеальні подарунки для справжніх гурманів.",
            images: [
                { url: 'https://via.placeholder.com/1000x1000', altText: 'Product image' } as any,
            ],
            priceRange: { maxVariantPrice: { amount: "1000", currencyCode: 'UAH' } },
        }
    }
}

export const Desktop: Story = {
    args: {
        product: { 
            title: 'Енергія Позитиву',
            description: "Подарунки, що принесуть у ваш день світлу енергію та позитив. Оберіть радість для ваших близьких.",
            images: [
                { url: 'https://via.placeholder.com/1000x1000', altText: 'Product image' } as any,
            ],
            priceRange: { maxVariantPrice: { amount: "1000", currencyCode: 'UAH' } },
        }
    }
}