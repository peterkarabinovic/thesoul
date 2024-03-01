import { create } from "zustand"
import { faker } from '@faker-js/faker';
import { _ChechoutStore, TChechoutState } from "../modules/checkout/data";

export function createUseChechout(state: Partial<TChechoutState> = {}) {

    return create<TChechoutState>((set, get, _) => {

        return {
            ..._ChechoutStore(set, get, _),
            ...state,

            searchCity: q => {
                set({ processing: true })
                setTimeout(() => {
                    set({
                        processing: false,
                        cityList: Array.from({ length: 10 }, () => ({
                            name: faker.location.city(),
                            id: faker.string.uuid()
                        })),
                        cityQuery: q
                    })
                }, 1000)
            },


            searchWarehouse: q => {
                set({ processing: true })
                setTimeout(() => {
                    set({
                        processing: false,
                        warehouseList: Array.from({ length: 10 }, () => ({
                            name: faker.company.name(),
                            id: faker.string.uuid()
                        })),
                        warehouseQuery: q
                    })
                }, 1000)
            }
        }
    });
}
