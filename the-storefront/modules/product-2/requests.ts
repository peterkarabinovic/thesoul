import { Result, pipe } from 'commons';
import { RequestError, medusaRequest } from 'data/medusa-request';
import * as T from "data/types"
import * as DT from "data/data-types"


export async function productListQuery(): Promise<Result<DT.Product[], RequestError>> {
    return pipe(
        await medusaRequest<{ products: T.MedusaProduct[] }>({
            method: 'GET',
            path: '/products'
        }),
        Result.map(({ products }) => products.map(p => DT.medusaProductToProduct(p))),
    )
}


export async function productQuery(handle: string): Promise<Result<DT.Product, RequestError>> {
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
        Result.map( product => DT.medusaProductToProduct(product))
    )
}
