
export const productOneVariant = {
    id: '1',
    title: 'Солодкі Враження',
    subtitle: 'Для жинок',
    description:
        'Поглибіться у світ солодких насолод і неймовірних вражень. Ідеальні подарунки для справжніх гурманів.',
    variants: [
        {
            id: 'Variant_123213213',
            title: 'Variant',
            price: { amount: '1000', currencyCode: 'UAH' },
            selectedOptions: [],
            availableForSale: true
        }
    ],
    images: [
        {
            url: 'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg',
            altText: 'Kino'
        },
        {
            url: 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg',
            altText: 'Kino'
        },
        {
            url: 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg',
            altText: 'Kino'
        },
        {
            url: 'https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg',
            altText: 'Kino'
        },
        {
            url: 'https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg',
            altText: 'Kino'
        },
        {
            url: 'https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg',
            altText: 'Kino'
        },
        {
            url: 'https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg',
            altText: 'Kino'
        }
    ],
    priceRange: {
        maxVariantPrice: { amount: '1000', currencyCode: 'UAH' },
        minVariantPrice: { amount: '1000', currencyCode: 'UAH' }
    }
}

export const productTwoVariants = {
    ...productOneVariant,
    variants: [
        ...productOneVariant.variants,
        {
            id: 'Variant_850349589034',
            title: 'Variant #2',
            price: { amount: '1400', currencyCode: 'UAH' },
            selectedOptions: [],
            availableForSale: true
        }
    ]
}

export const productThreeVariants = {
    ...productTwoVariants,
    variants: [
        ...productTwoVariants.variants,
        {
            id: 'Variant_123213213',
            title: 'Variant #3',
            price: { amount: '1400', currencyCode: 'UAH' },
            selectedOptions: [],
            availableForSale: true
        }
    ]
}
