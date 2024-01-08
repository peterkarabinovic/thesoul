import { Result, pipe } from 'lib/result';
import * as T from "./types"

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
            return await medusaRequest<T.MedusaProduct>({
                method: "GET",
                path: `products/${handle}`,
            });
        else
            return await medusaRequest<T.MedusaProduct>({
                method: "GET",
                path: `products?handle=${handle}&limit=1`,
            });
    })();

    return pipe(
        rawResult,
        Result.map(product => T.medusaProductToProduct(product))
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
        await medusaRequest<T.MedusaCart>({
            method: 'POST',
            path: '/carts'
        }),
        Result.map(cart => T.medusaCartToCart(cart))
    );
}

export async function addItem(cartId: string, variant_id: string, quantity: number): Promise<Result<T.Cart, RequestError>> {

    return pipe(
        await medusaRequest<T.MedusaCart>({
            method: "POST",
            path: `/carts/${cartId}/line-items`,
            payload: {
                variant_id,
                quantity
            }
        }),
        Result.map(cart => T.medusaCartToCart(cart))
    )
}

export async function updateItem(cartId: string, itemId: string, quantity: number): Promise<Result<T.Cart, RequestError>> {

    return pipe(
        await medusaRequest<T.MedusaCart>({
            method: "POST",
            path: `/carts/${cartId}/line-items/${itemId}`,
            payload: {
                quantity
            }
        }),
        Result.map(cart => T.medusaCartToCart(cart))
    )
}

export async function deleteLineItem(cartId: string, itemId: string): Promise<Result<T.Cart, RequestError>> {

    return pipe(
        await medusaRequest<T.MedusaCart>({
            method: "DELETE",
            path: `/carts/${cartId}/line-items/${itemId}`,
        }),
        Result.map(cart => T.medusaCartToCart(cart))
    )
}


const ENDPOINT = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_API ?? 'http://localhost:9000';
const INTERNAL_ENDPOINT = process.env.NEXT_INTERNAL_MEDUSA_BACKEND_API ?? 'http://localhost:9000';

export type RequestError = {
    status: number;
    message: string;
};

type MedusaRequestParams = {
    method: string;
    path: string;
    payload?: Record<string, unknown> | undefined;
    serverSide?: boolean
    revalidateSec?: number
};

export async function medusaRequest<R>({
    method,
    path,
    payload,
    revalidateSec,
    serverSide = true
}: MedusaRequestParams): Promise<Result<R, RequestError>> {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...(revalidateSec && { next: { revalidate: revalidateSec } })
    };

    if (path.includes('/carts')) {
        options.cache = 'no-cache';
    }

    if (payload) {
        options.body = JSON.stringify(payload);
    }

    try {
        const endpoint = serverSide ? INTERNAL_ENDPOINT : ENDPOINT;
        const result = await fetch(`${endpoint}/store${path}`, options);

        const body = await result.json();

        if (body.errors) {
            throw body.errors[0];
        }

        return Result.of(body);
    } catch (e) {
        const error = e as RequestError;
        return Result.failure({
            status: error?.status || 500,
            message: error.message || 'Something went wrong'
        });
    }
}
