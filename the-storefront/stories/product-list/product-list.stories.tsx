import type { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';
import { Result } from 'lib/result';


import { ProductList } from 'components/product-list';

const meta = {
    title: "Product List/List",
    component: ProductList,
    decorators: [ (Story) => (
        <Suspense>
        <Story />
      </Suspense>        
    )]
} satisfies Meta<typeof ProductList>;


export default meta;
type Story = StoryObj<typeof meta>;


export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile2'
        }
    },
    args: {
        getProductListQuery: async () => Result.of(products)
    }
}

export const Desktop: Story = {
    args: {
        getProductListQuery: async () => Result.of(products)
    }
}


const products = [
    {
        id: "1",
        handle: "product-1",
        title: 'Солодкі Враження',
        description: "Поглибіться у світ солодких насолод і неймовірних вражень. Ідеальні подарунки для справжніх гурманів.",
        featuredImageSrc: 'https://via.placeholder.com/1000x1000',
        price: { amount: "1000", currencyCode: 'UAH' } ,
        tags: ["featured"],
        collection_id: "man",
        updatedAt: new Date()
    },

    {
        id: "2",
        handle: "product-2",
        title: 'Мить Радості',
        description: "Неповторні подарункові комплекти, які здатні створити миті радості та враження. Виберіть унікальний подарунок, щоб зробити день особливим.",
        featuredImageSrc: 'https://via.placeholder.com/1000x1000',
        price: { amount: "200000", currencyCode: 'UAH' } ,
        tags: ["featured"],
        collection_id: "man",
        updatedAt: new Date()
    },

    {
        id: "3",
        handle: "product-3",
        title: 'Магія Дотику',
        description: "Почуття тепла та ласки в кожному подарунковому наборі. Завдяки вишуканій упаковці та неперевершеному вмінню робити подарунки особливими.",
        featuredImageSrc: 'https://via.placeholder.com/1000x1000',
        price: { amount: "200000", currencyCode: 'UAH' } ,
        tags: ["featured"],
        collection_id: "man",
        updatedAt: new Date()
    },
    {
        id: "4",
        handle: "product-4",
        title: 'Мить Радості',
        description: "Неповторні подарункові комплекти, які здатні створити миті радості та враження. Виберіть унікальний подарунок, щоб зробити день особливим.",
        featuredImageSrc: 'https://via.placeholder.com/1000x1000',
        price: { amount: "200000", currencyCode: 'UAH' } ,
        tags: [""],
        collection_id: "man",
        updatedAt: new Date()
    },

    {
        id: "5",
        handle: "product-5",
        title: 'Магія Дотику',
        description: "Почуття тепла та ласки в кожному подарунковому наборі. Завдяки вишуканій упаковці та неперевершеному вмінню робити подарунки особливими.",
        featuredImageSrc: 'https://via.placeholder.com/1000x1000',
        price: { amount: "200000", currencyCode: 'UAH' } ,
        tags: [""],
        collection_id: "woman",
        updatedAt: new Date()
    },
    {
        id: "6",
        handle: "product-6",
        title: 'Мить Радості',
        description: "Неповторні подарункові комплекти, які здатні створити миті радості та враження. Виберіть унікальний подарунок, щоб зробити день особливим.",
        featuredImageSrc: 'https://via.placeholder.com/1000x1000',
        price: { amount: "200000", currencyCode: 'UAH' } ,
        tags: [""],
        collection_id: "woman",
        updatedAt: new Date()
    },

    {
        id: "7",
        handle: "product-7",
        title: 'Магія Дотику',
        description: "Почуття тепла та ласки в кожному подарунковому наборі. Завдяки вишуканій упаковці та неперевершеному вмінню робити подарунки особливими.",
        featuredImageSrc: 'https://via.placeholder.com/1000x1000',
        price: { amount: "200000", currencyCode: 'UAH' } ,
        tags: [""],
        collection_id: "woman",
        updatedAt: new Date()
    },
    {
        id: "8",
        handle: "product-8",
        title: 'Зіркові Моменти',
        description: "Підкресліть особливі моменти у ваших життях з подарунковими комплектами, які роблять кожен день як зіркову подію..",
        featuredImageSrc: 'https://via.placeholder.com/1000x1000',
        price: { amount: "200000", currencyCode: 'UAH' } ,
        tags: ["featured"],
        collection_id: "woman",
        updatedAt: new Date()
    },
]
