import * as M from 'lib/medusa/types';

export type Money = {
    amount: number;
    currencyCode: string;
}

export type Product = {
    id: string;
    handle: string,
    title: string;
    subtitle: string;
    description: string;
    images: {
        url: string;
        altText: string;
    }[];
    variants: {
        id: string;
        title: string;
        price: Money;
        available: boolean; // ? or amount: number;
        length?: number | null;
        width?: number | null;
        height?: number | null;
    }[];
}

export function medusaProductToProduct(prod: M.MedusaProduct): Product {
console.log({prod});
    return {
        id: prod.id,
        handle: prod.handle || prod.id,
        title: prod.title,
        subtitle: prod.subtitle || '',
        description: prod.description || '',
        images: (prod?.images || []).map( i => ( {url: i.url, altText: prod.title}) ),
        variants: prod.variants.map( v => ({
            id: v.id,
            title: v.title || prod.title,
            price: { amount: v.prices?.[0]?.amount || 0, currencyCode: v.prices?.[0]?.currency_code || "UA"},
            available: true,
            length: v.length,
            width: v.width,
            height: v.height
        }))
    }
}