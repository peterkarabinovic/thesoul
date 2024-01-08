
import { useState, useEffect} from "react";
import { productListQuery, productQuery } from "./requests"
import { ProductBrief, Product } from "./types";


export function useProductListQuery(): ProductBrief[] {
    const [products, setProducts] = useState<ProductBrief[]>([]);

    useEffect(() => {
        productListQuery()
        .then( res => {
            if(!res.success) {
                // TODO: proper error handling
                console.error(res);
            }
            else {
                setProducts(res.data)
            }
        })
    }, []);

    return products;
}

export function useProduct(handle: string): Product | null {
    const [product, setProduct] = useState<Product|null>(null);

    useEffect(() => {
        productQuery(handle)
        .then( res => {
            if(!res.success) {
                // TODO: proper error handling
                console.error(res);
            }
            else {
                setProduct(res.data)
            }
        })
    }, [handle]);

    return product;
}

