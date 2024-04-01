import { Result, pipe } from 'commons';
import { RequestError, medusaRequest } from 'data/medusa-request';
import { CityResponse, WarehouseResponse } from "nv-request-types"


export type ShippingOption = {
    id: string,
    dataId: "shipping-to-warehouse" | "shipping-to-door" | "сourier-delivery",
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
                        id: option.id,
                        dataId: option.data.id,
                        name: option.name
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
            path: `/np/cities?q=${q}`
        }),
    );
}

export async function getWarehouses(cityRef: string, q: string): Promise<Result<WarehouseResponse, RequestError>> {
    return pipe(
        await medusaRequest<WarehouseResponse>({
            method: 'GET',
            path: `/np/warehouses?cityRef=${cityRef}&q=${q}`
        }),
    );
}

export async function saveShippingAddress(cartId: string, shipping_address: unknown): Promise<Result<void, RequestError>> {
    return pipe(
        await medusaRequest<Record<string, string | number>>({
            method: 'POST',
            path: `/carts/${cartId}`,
            payload: { shipping_address }
        }),
        Result.map( () => {} )
    );
}

export async function addShippingMethod(cartId: string, option_id: string, data = {}): Promise<Result<void, RequestError>> {
    return pipe(
        await medusaRequest<Record<string, string | number>>({
            method: 'POST',
            path: `/carts/${cartId}/shipping-methods`,
            payload: { option_id, data }
        }),
        Result.map( () => {} )
    );
}