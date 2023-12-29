import { Money, MedusaProduct} from '../medusa';

export { type Product } from "../medusa"

/****************************************************************************************
 * 
 *  ProductBrief is a subset of the MedusaProduct type
 *  It is used to display a product in a list
 * 
 ****************************************************************************************/
export type ProductBrief = {
    id: string;
    title: string, 
    description: string
    featuredImageSrc: string,
    updatedAt: Date
    collection_id: string
    tags: string[]  
    price: Money
}



export function medusaProductToBrief(prod: MedusaProduct): ProductBrief {

    const variant = prod.variants?.[0];

    let amount = "0";
    let currencyCode = 'USD';
    if (variant && variant.prices && variant.prices[0]) {
        currencyCode = variant.prices[0].currency_code;
        amount = String(variant.prices[0].amount);
    }
            
    return {
        id: prod.id,
        title: prod.title,
        description: prod.description || "",
        featuredImageSrc: prod.thumbnail || prod.images?.[0]?.url || `https://via.placeholder.com/1000x1000`,
        updatedAt: new Date(prod.updated_at),
        collection_id: prod.collection_id,
        tags: prod.tags?.map( t => t.value ) || [],
        price: { amount, currencyCode }
    }
}
