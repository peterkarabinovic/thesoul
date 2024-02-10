import { Result, pipe } from 'commons';
import { RequestError, medusaRequest } from 'data/medusa-request';


type ShippingOption = {
    id: string,
    name: string
}

export async function shippingOptions(cartId: string): Promise<Result<ShippingOption[], RequestError>> {

    return pipe(
        await medusaRequest({
            method: 'GET',
            path: `/shipping-options/${cartId}`
        }),
        Result.chain(res => {
            if(res && typeof res === 'object' && "shipping_options" in res){
                if(Array.isArray(res.shipping_options) ){
                    return Result.of(res.shipping_options.map((option) => ({
                        id: option.data.id,
                        name: option.data.name
                    }) ));
                }
            }
            return Result.failure({ status: 200, message: "Invalid response structure" });
        })
    );
}

export async function getCity(q: string): Promise<Result<string[], RequestError>> {
    return pipe(
        await medusaRequest({
            method: 'GET',
            path: `np/cities?q=${q}`
        }),
        Result.chain(res => {
            if(res && typeof res === 'object' && "cities" in res){
                if(Array.isArray(res.cities) ){
                    return Result.of(res.cities);
                }
            }
            return Result.failure({ status: 200, message: "Invalid response structure" });
        })
    );
}