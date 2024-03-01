import { create, StateCreator, UseBoundStore, StoreApi } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { syncProperty } from 'lib/zustand-utils';
import { AsyncResult, pipe } from 'commons';
import { useCartState } from "@cart/data"
import { useCustomerStore } from "@customer/data"
import { debounce, omitProps } from 'lib/utils';

import * as R from "./requests"
import { i18n_unable_access_store } from 'i18n';

import { City, Warehouse } from "nv-request-types"


export type ChechoutStep = "cart" | "shipping" | "payment" | "review";

export type TChechoutState = {
    processing: boolean;
    globalError: string | null;
    shippingOptions: { id: string, name: string }[];
    selectedOption?: { id: string, name: string }

    shippingFirstName: string,
    shippingLastName: string,
    shippingPhone: string,
    shippingCity: City | null;
    shippingWarehouse: Warehouse | null;
    shippingAddress: string;
    shipping_data: Record<string, string | number> | null;

    // Novaposhta search
    cityQuery: string
    cityList: City[],
    warehouseQuery: string,
    warehouseList: Warehouse[],
    receintAddresses: string[],
    searchCity: (q: string) => void
    selectCity: (city?: City) => void
    searchWarehouse: (q: string) => void
    selectWarehouse: (warehouse?: Warehouse) => void
    setAddress: (street?: string) => void

    logedIn: boolean,
    cartId: string | null,
    cartEmpty: boolean,
    canGoNext: (step: ChechoutStep) => boolean;
    loadShippingOptions: () => void,
    selectOption: (option: { id: string, name: string }) => void,
    
}

export type TChechoutStore = UseBoundStore<StoreApi<TChechoutState>>;

export const _ChechoutStore: StateCreator<TChechoutState> = (set, get) => ({
    processing: false,
    globalError: null,
    shippingOptions: [],
    shippingFirstName: "",
    shippingLastName: "",
    shippingPhone: "",
    shippingCity: null,
    shippingWarehouse: null,
    shippingAddress: "",
    shipping_data: null,

    cityQuery: "",
    cityList: [],
    warehouseList: [],
    warehouseQuery: "",
    receintAddresses: [],


    logedIn: syncProperty(useCustomerStore, state => state.logedIn(), val => set({ logedIn: val })),
    cartId: syncProperty(useCartState, state => state.cartId, val => set({ cartId: val })),
    cartEmpty: syncProperty(useCartState, state => (state.cart?.lines.length || 0) === 0, val => set({ cartEmpty: val })),
    canGoNext: (step) => {
        switch (step) {
            case 'cart': return !get().cartEmpty;
            case 'shipping': {
                const { shippingFirstName, shippingLastName, shippingPhone, shippingCity, shippingWarehouse, shippingAddress } = get();
                return Boolean(shippingFirstName && shippingLastName && shippingPhone && shippingCity && (shippingWarehouse || shippingAddress))
            }
            case 'payment': return true
        }
        return true;
    },

    loadShippingOptions: () => {
        const cartId = get().cartId;
        if (cartId) {
            set({ processing: true, globalError: null })
            pipe(
                R.shippingOptions(cartId),
                AsyncResult.tap(options => {
                    set({ shippingOptions: options });
                    if (options.length === 1) {
                        set({ selectedOption: options[0] })
                    }
                    else {
                        set({ selectedOption: undefined })
                    }
                }),
                AsyncResult.tapError(err => { set({ globalError: i18n_unable_access_store }); console.error('loadShippingOptions', err) }),
                AsyncResult.then(() => set({ processing: false }))
            )
        }
    },
    selectOption: (option) => set({ selectedOption: option }),


    searchCity: debounce((q: string) => {
        if (get().cityQuery.trim() == q.trim() || q.trim().length < 2)
            return;

        set({ processing: true, globalError: null })
        pipe(
            R.getCity(q),
            AsyncResult.tap(res => {
                if ("error" in res) {
                    set({ globalError: res.error });
                }
                else {
                    set({ cityList: res.cities, cityQuery: q });
                }
            }),
            AsyncResult.tapError(err => { set({ globalError: i18n_unable_access_store }); console.error('searchCity', err) }),
            AsyncResult.then(() => set({ processing: false }))
        );

    }, 300),
    selectCity: (city) => {
        if( city !== get().shippingCity )
            set({ 
                shippingCity: city, 
                cityQuery: city?.name || get().cityQuery,
                shippingWarehouse: null,
                warehouseQuery: "",
                warehouseList: [],
                shippingAddress: "",
            })
    },

    searchWarehouse: debounce((q: string) => {
        const { warehouseQuery, shippingCity } = get();
        if (warehouseQuery.trim() == q.trim())
            return;
        if (!shippingCity)
            return;
        set({ processing: true, globalError: null });
        pipe(
            R.getWarehouses(shippingCity.id, q),
            AsyncResult.tap(res => {
                if ("error" in res) {
                    set({ globalError: res.error });
                }
                else {
                    set({ warehouseList: res.warehouses, warehouseQuery: q });
                }
            }),
            AsyncResult.tapError(err => { set({ globalError: i18n_unable_access_store }); console.error('searchWarehouse', err) }),
            AsyncResult.then(() => set({ processing: false }))
        )
    }, 300),

    selectWarehouse: (warehouse) => set({ shippingWarehouse: warehouse, warehouseQuery: warehouse?.name || get().warehouseQuery }),

    setAddress: (address) => set({ shippingAddress: address }),
});

export const useChechoutState = create(
    persist<TChechoutState>(
        _ChechoutStore,
        {
            name: 'checkout-state',
            partialize: state => omitProps(state, 'cartId', 'cartEmpty'),
            storage: createJSONStorage(() => localStorage),
        }
    )
)