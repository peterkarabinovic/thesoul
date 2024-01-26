import axios from "axios"
import { caching } from "cache-manager"

type PromiseValue<T> =T extends Promise<infer U> ? U : T;

export type NpApi = PromiseValue<ReturnType<typeof NpApi>>;

export async function NpApi(apiKey: string, looger: any) {

    const cache = await caching('memory', { 
        ttl: 30 * 1000, // 30 seconds,
        max: 300
    });

    const _npApi = axios.create({
        baseURL: "https://api.novaposhta.ua/v2.0/json",
        headers: {
            "Content-Type": "application/json"
        }
    });


    return {
        cities: async (query: string, limit: number) => {
            return cache.wrap(`np-cities-${query}-${limit}`, async () => {
                return _npApi.post("/", {
                    apiKey,
                    modelName: "Address",
                    calledMethod: "searchSettlements",
                    methodProperties: {
                        CityName: query,
                        Limit: Math.min(Math.max(1,limit),50),
                        Page: 1
                    }
                })
                .then( ({data}) => ({cities: data}) )
                .catch( (err:any) => {
                    looger.error("np-cities", err);
                    return {error: "Сервер Нової Пошти наразі недоступний."};
                });
            });
        },

        warehouses: async (cityRef: string, warehouseId = 0) => {
            return cache.wrap(`np-warehouses-${cityRef}-${warehouseId}`, async () => {
                return _npApi.post("/", {
                    apiKey,
                    modelName: "AddressGeneral",
                    calledMethod: "getWarehouses",
                    methodProperties: {
                        CityRef: cityRef,
                        WarehouseId: warehouseId,
                        Limit: 50,
                        Page: 1
                    }
                })
                .then( ({data}) => ({warehouses: data}) )
                .catch( (err:any) => {
                    looger.error("np-warehouses", err);
                    return {error: "Сервер Нової Пошти наразі недоступний."};
                });
            });
        },

        streets: async (cityRef: string, street: string) => {
            return cache.wrap(`np-street-${cityRef}-${street}`, async () => {
                return _npApi.post("/", {
                    apiKey,
                    modelName: "Address",
                    calledMethod: "searchSettlementStreets",
                    methodProperties: {
                        CityRef: cityRef,
                        StreetName: street,
                        Limit: 50,
                        Page: 1
                    }
                })
                .then( ({data}) => ({streets: data}) )
                .catch( (err:any) => {
                    looger.error("np-warehouses", err);
                    return {error: "Сервер Нової Пошти наразі недоступний."};
                });                
            });
        }
    }
}

export const NpApiStub: NpApi = {
    cities: async (query: string, limit: number) => ({ cities: [] }),
    warehouses: async (cityRef: string, warehouseId = 0) => ({ warehouses: [] }),
    streets: async (cityRef: string, street: string) => ({ streets: [] })
}
