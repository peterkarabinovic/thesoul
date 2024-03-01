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
