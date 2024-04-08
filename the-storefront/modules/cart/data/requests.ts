import { Result, pipe } from 'commons';
import { RequestError, medusaRequest } from 'data/medusa-request';
import * as T from "data/types"


export async function retrieveCart(cartId: string): Promise<Result<T.Cart, RequestError>> {
console.log("retrieveCart")
    return pipe(
        await medusaRequest<{cart:T.MedusaCart}>({
            method: 'GET',
            path: `/carts/${cartId}`,
        }),
        Result.map(res => T.medusaCartToCart(res.cart))
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
