import type { Meta, StoryObj } from '@storybook/react';

import { ProductList } from 'components/product-2';

const meta = {
    title: 'Components/Product/ProductList',
    component: ProductList
} satisfies Meta<typeof ProductList>;


export default meta;
type Story = StoryObj<typeof meta>;


export const Mobile: Story = {
    // parameters:{
    //     viewport:{
    //         defaultViewport: 'mobile2'
    //     } 
    // },
    args: {

        useProductQuery: () => [
            { 
                id: "1",
                title: 'Солодкі Враження',
                description: "Поглибіться у світ солодких насолод і неймовірних вражень. Ідеальні подарунки для справжніх гурманів.",
                images: [
                    { url: 'https://via.placeholder.com/1000x1000', altText: 'Product image' } as any,
                ],
                priceRange: { maxVariantPrice: { amount: "1000", currencyCode: 'UAH' } },
                tags: ["featured"],
                collection_id: "man",
                updatedAt: new Date()
            },

            { 
                id: "2",
                title: 'Мить Радості',
                description: "Неповторні подарункові комплекти, які здатні створити миті радості та враження. Виберіть унікальний подарунок, щоб зробити день особливим.",
                images: [
                    { url: 'https://via.placeholder.com/1000x1000', altText: 'Product image' } as any,
                ],
                priceRange: { maxVariantPrice: { amount: "200000", currencyCode: 'UAH' } },
                tags: ["featured"],
                collection_id: "man",
                updatedAt: new Date()
            },

            { 
                id: "3",
                title: 'Магія Дотику',
                description: "Почуття тепла та ласки в кожному подарунковому наборі. Завдяки вишуканій упаковці та неперевершеному вмінню робити подарунки особливими.",
                images: [
                    { url: 'https://via.placeholder.com/1000x1000', altText: 'Product image' } as any,
                ],
                priceRange: { maxVariantPrice: { amount: "200000", currencyCode: 'UAH' } },
                tags: ["featured"],
                collection_id: "man",
                updatedAt: new Date()
            },
            { 
                id: "4",
                title: 'Мить Радості',
                description: "Неповторні подарункові комплекти, які здатні створити миті радості та враження. Виберіть унікальний подарунок, щоб зробити день особливим.",
                images: [
                    { url: 'https://via.placeholder.com/1000x1000', altText: 'Product image' } as any,
                ],
                priceRange: { maxVariantPrice: { amount: "200000", currencyCode: 'UAH' } },
                tags: [""],
                collection_id: "man",
                updatedAt: new Date()
            },

            { 
                id: "5",
                title: 'Магія Дотику',
                description: "Почуття тепла та ласки в кожному подарунковому наборі. Завдяки вишуканій упаковці та неперевершеному вмінню робити подарунки особливими.",
                images: [
                    { url: 'https://via.placeholder.com/1000x1000', altText: 'Product image' } as any,
                ],
                priceRange: { maxVariantPrice: { amount: "200000", currencyCode: 'UAH' } },
                tags: [""],
                collection_id: "woman",
                updatedAt: new Date()
            },
            { 
                id: "6",
                title: 'Мить Радості',
                description: "Неповторні подарункові комплекти, які здатні створити миті радості та враження. Виберіть унікальний подарунок, щоб зробити день особливим.",
                images: [
                    { url: 'https://via.placeholder.com/1000x1000', altText: 'Product image' } as any,
                ],
                priceRange: { maxVariantPrice: { amount: "200000", currencyCode: 'UAH' } },
                tags: [""],
                collection_id: "woman",
                updatedAt: new Date()
            },

            { 
                id: "7",
                title: 'Магія Дотику',
                description: "Почуття тепла та ласки в кожному подарунковому наборі. Завдяки вишуканій упаковці та неперевершеному вмінню робити подарунки особливими.",
                images: [
                    { url: 'https://via.placeholder.com/1000x1000', altText: 'Product image' } as any,
                ],
                priceRange: { maxVariantPrice: { amount: "200000", currencyCode: 'UAH' } },
                tags: [""],
                collection_id: "woman",
                updatedAt: new Date()
            },
            { 
                id: "8",
                title: 'Зіркові Моменти',
                description: "Підкресліть особливі моменти у ваших життях з подарунковими комплектами, які роблять кожен день як зіркову подію..",
                images: [
                    { url: 'https://via.placeholder.com/1000x1000', altText: 'Product image' } as any,
                ],
                priceRange: { maxVariantPrice: { amount: "200000", currencyCode: 'UAH' } },
                tags: ["featured"],
                collection_id: "woman",
                updatedAt: new Date()
            },
        ]
    }
}

