import * as M from '../medusa';

export { type Product, type MedusaProduct, type Cart, type MedusaCart, type Money } from "../medusa"


/****************************************************************************************
 * 
 *  ProductBrief is a subset of the MedusaProduct type
 *  It is used to display a product in a list
 * 
 ****************************************************************************************/
export type ProductBrief = {
    id: string;
    handle: string,
    title: string, 
    description: string
    featuredImageSrc: string,
    updatedAt: Date
    collection_id: string
    tags: string[]  
    price: M.Money
}



export function medusaProductToBrief(prod: M.MedusaProduct): ProductBrief {

    const variant = prod.variants?.[0];

    let amount = "0";
    let currencyCode = 'USD';
    if (variant && variant.prices && variant.prices[0]) {
        currencyCode = variant.prices[0].currency_code;
        amount = String(variant.prices[0].amount);
    }
            
    return {
        id: prod.id,
        handle: prod.handle || prod.id,
        title: prod.title,
        description: prod.description || "",
        featuredImageSrc: prod.thumbnail || prod.images?.[0]?.url || `https://via.placeholder.com/1000x1000`,
        updatedAt: new Date(prod.updated_at),
        collection_id: prod.collection_id,
        tags: prod.tags?.map( t => t.value ) || [],
        price: { amount, currencyCode }
    }
}

export function medusaProductToProduct(prod: M.MedusaProduct): M.Product {
    return M.reshapeProduct(prod)
}

export function medusaCartToCart(cart: M.MedusaCart): M.Cart {
    return M.reshapeCart(cart);
}

export type NonEmptyArray<T> = [T, ...T[]];

export function isNonEmpty<T>(xs: T[]): xs is NonEmptyArray<T> {
    return xs.length > 0;
}
