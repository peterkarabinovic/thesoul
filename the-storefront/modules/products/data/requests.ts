import { Result, pipe } from 'commons';
import { RequestError, medusaRequest } from 'data/medusa-request';
import * as T from "data/types"

/**
 * List of Profucts
 * @returns 
 */
export async function productListQuery(): Promise<Result<T.ProductBrief[], RequestError>> {

    return pipe(
        await medusaRequest<{ products: T.MedusaProduct[] }>({
            method: 'GET',
            path: '/products'
        }),
        Result.map(({ products }) => products.map(p => T.medusaProductToBrief(p)))
    )
}

export async function productQuery(handle: string): Promise<Result<T.Product, RequestError>> {
    const rawResult = await (async () => {

        if (/prod_\w{7,}/.test(handle)) // if handle looks like product ID
            return pipe(
                await medusaRequest<T.MedusaProduct>({
                    method: "GET",
                    path: `/products/${handle}`,
                }),
                Result.map(data => ({products: [data]}))
            )
        else
            return await medusaRequest<{products: T.MedusaProduct[]}>({
                method: "GET",
                path: `/products?handle=${handle}&limit=1`,
            });
    })();

    return pipe(
        rawResult,
        Result.chain(data => 
            T.isNonEmpty(data.products) 
            ? Result.of(data.products[0])
            : Result.failure({status: 404, message: "Not found"})  
        ),
        Result.map( product => T.medusaProductToProduct(product))
    )
}



export async function retrieveCart(cartId: string): Promise<Result<T.Cart, RequestError>> {

    return pipe(
        await medusaRequest<T.MedusaCart>({
            method: 'GET',
            path: `/carts/${cartId}`
        }),
        Result.map(cart => T.medusaCartToCart(cart))
    );
}

export async function createCart(): Promise<Result<T.Cart, RequestError>> {

    return pipe(
        await medusaRequest<{cart: T.MedusaCart}>({
            method: 'POST',
            path: '/carts'
        }),
        Result.map(({cart}) => T.medusaCartToCart(cart))
    );
}

export async function addItem(cartId: string, variant_id: string, quantity: number): Promise<Result<T.Cart, RequestError>> {

    return pipe(
        await medusaRequest<{cart: T.MedusaCart}>({
            method: "POST",
            path: `/carts/${cartId}/line-items`,
            payload: {
                variant_id,
                quantity
            }
        }),
        Result.map(({cart}) => T.medusaCartToCart(cart))
    )
}

export async function updateItem(cartId: string, itemId: string, quantity: number): Promise<Result<T.Cart, RequestError>> {

    return pipe(
        await medusaRequest<{cart: T.MedusaCart}>({
            method: "POST",
            path: `/carts/${cartId}/line-items/${itemId}`,
            payload: {
                quantity
            }
        }),
        Result.map(({cart}) => T.medusaCartToCart(cart))
    )
}

export async function deleteLineItem(cartId: string, itemId: string): Promise<Result<T.Cart, RequestError>> {

    return pipe(
        await medusaRequest<{cart: T.MedusaCart}>({
            method: "DELETE",
            path: `/carts/${cartId}/line-items/${itemId}`,
        }),
        Result.map(({cart}) => T.medusaCartToCart(cart))
    )
}
