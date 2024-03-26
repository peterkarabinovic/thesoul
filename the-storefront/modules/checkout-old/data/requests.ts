import { Result, pipe } from 'commons';
import exp from 'constants';
import { RequestError, medusaRequest } from 'data/medusa-request';
import { CityResponse, WarehouseResponse, StreetResponse } from "nv-request-types"


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
            if (res && typeof res === 'object' && "shipping_options" in res) {
                if (Array.isArray(res.shipping_options)) {
                    return Result.of(res.shipping_options.map((option) => ({
                        id: option.data.id,
                        name: option.data.name
                    })));
                }
            }
            return Result.failure({ status: 200, message: "Invalid response structure" });
        })
    );
}

export async function getCity(q: string): Promise<Result<CityResponse, RequestError>> {
    return pipe(
        await medusaRequest<CityResponse>({
            method: 'GET',
            path: `np/cities?q=${q}`
        }),
    );
}

export async function getWarehouses(cityRef: string, q: string): Promise<Result<WarehouseResponse, RequestError>> {
    return pipe(
        await medusaRequest<WarehouseResponse>({
            method: 'GET',
            path: `np/warehouses?cityRef=${cityRef}?q=${q}`
        }),
    );
}

export async function getStreets(cityRef: string, street: string): Promise<Result<StreetResponse, RequestError>> {
    return pipe(
        await medusaRequest<StreetResponse>({
            method: 'GET',
            path: `np/streets?cityRef=${cityRef}?street=${street}`
        }),
    );
}