import * as M from 'lib/medusa/types';
import { minMax } from 'lib/utils';

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
    extra_md?: string;
    available: boolean;
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
    priceRange: {
        currencyCode: string,
        high: string,
        low: string
    },
    tags?: string[]
}

export function medusaProductToProduct(prod: M.MedusaProduct): Product {
    const {min, max} = minMax(prod.variants, v => v.prices?.[0]?.amount || 0)
    const currencyCode = prod.variants[0]?.prices?.[0]?.currency_code || "UAH";
    return {
        id: prod.id,
        handle: prod.handle || prod.id,
        title: prod.title,
        subtitle: prod.subtitle || '',
        description: prod.description || '',
        extra_md: prod.metadata?.extra_md,
        available: true,
        images: (prod?.images || []).map( i => ( {url: i.url, altText: prod.title}) ),
        variants: prod.variants.map( v => ({
            id: v.id,
            title: v.title || prod.title,
            price: { amount: v.prices?.[0]?.amount || 0, currencyCode },
            available: true,
            length: v.length,
            width: v.width,
            height: v.height
        })),
        priceRange: {
            currencyCode,
            high: max.toFixed(2),
            low: min.toFixed(2)
        }
    }
}