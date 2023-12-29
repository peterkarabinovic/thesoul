import { Result } from 'lib/result';
import { medusaRequest, RequestError } from "./requests"
import { ProductBrief, medusaProductToBrief } from "./types"

export async function productListQuery(): Promise<Result<ProductBrief[], RequestError>> {

    const rawResult = await medusaRequest({
        method: 'GET',
        path: '/products'    
    });

    if(!rawResult.success)
        return rawResult;

    const { products = [] } = rawResult.data as any;

    const listItems = products.map( (p: any) => medusaProductToBrief(p) );

    return Result.of(listItems);
}

export async function productQuery(id: string): Promise<Result<ProductBrief, RequestError>> {
    
}