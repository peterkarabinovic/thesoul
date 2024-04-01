import axios from "axios"
import { caching } from "cache-manager"
import * as T from "./types"

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
        cities: async (query: string, limit: number): Promise<T.CityResponse> => {
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
                .then( ({data}) => {
                    const  {data: d, success} = data;
                    if(!success)
                        return { error: "Сервер Нової Пошти наразі недоступний." };
                    const addresses = d[0]?.Addresses || []
                    const cities = addresses
                        .filter( (it: any) => !!it.DeliveryCity)
                        .map( (it: any) => ({
                            name: it.Present,
                            id: it.DeliveryCity
                        })
                    );
                    return { cities };

                })
                .catch( (err:any) => {
                    looger.error("np-cities", err);
                    return {error: "Сервер Нової Пошти наразі недоступний."};
                });
            });
        },

        warehouses: async (cityRef: string, query = ""): Promise<T.WarehouseResponse> => {
            return cache.wrap(`np-warehouses-${cityRef}-${query}`, async () => {
                const warehouseId = parseInt(query) || 0;
                const findByString = warehouseId ? "" : query
                return _npApi.post("/", {
                    apiKey,
                    modelName: "Address",
                    calledMethod: "getWarehouses",
                    methodProperties: {
                        CityRef: cityRef,
                        WarehouseId: warehouseId,
                        FindByString: findByString,
                        Limit: 50,
                        Page: 1
                    }
                })
                .then( ({data}) => {
                    const  {data: d, success} = data;
                    const warehouses = (d || []).map( (it: any) => ({
                        name: `${it.CityDescription}, ${it.Description}`,
                        id: it.Ref
                    }));
                    return { warehouses };
                })
                .catch( (err:any) => {
                    looger.error("np-warehouses", err);
                    return {error: "Сервер Нової Пошти наразі недоступний."};
                });
            });
        },

        streets: async (cityRef: string, street: string): Promise<T.StreetResponse> => {
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
                .then( ({data}) => {
                    const  {data: d, success} = data;
                    if(!success)
                        return { error: "Сервер Нової Пошти наразі недоступний." };
                    const addresses = d[0]?.Addresses || []
                    const streets = addresses.map( (it: any) => ({
                        name: it.Present,
                        id: it.Ref
                    }));
                    return { streets };

                })
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
    warehouses: async (cityRef: string, q = "") => ({ warehouses: [] }),
    streets: async (cityRef: string, street: string) => ({ streets: [] })
}
