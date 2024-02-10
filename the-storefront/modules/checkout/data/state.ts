import { create, StateCreator, UseBoundStore, StoreApi } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { syncProperty } from 'lib/zustand-utils';
import { AsyncResult, pipe } from 'commons';
import { useCartState } from "@cart/data"
import { useCustomerStore } from "@customer/data"
import { debounce, omitProps } from 'lib/utils';

import * as R from "./requests"
import { i18n_unable_access_store } from 'i18n';


export type ChechoutStep = "cart" | "shipping" | "payment" | "review";

export type TChechoutState = {
    processing: boolean;
    globalError: string | null; 
    shippingOptions: { id: string, name: string}[];
    selectedOption?: { id: string, name: string}
    shipping_firstName: string,
    shipping_lastName: string,
    shipping_phone: string,
    shipping_city: string | null;
    shipping_address: string | null;
    shipping_data: Record<string, string | number> | null;

    cityQuery: string
    cityLists: string[],
    addressQuery: string,
    addressList: string[],

    logedIn: boolean,
    cartId: string | null,
    cartEmpty: boolean ,
    canGoNext: (step: ChechoutStep) => boolean;
    loadShippingOptions: () => void,
    selectOption: (option: { id: string, name: string}) => void,
    searchCity: ( q: string ) => void
}

export type TChechoutStore = UseBoundStore<StoreApi<TChechoutState>>;

export const _ChechoutStore: StateCreator<TChechoutState> = (set, get) => ({
    processing: false,
    globalError: null,
    shippingOptions: [],
    shipping_firstName: "",
    shipping_lastName: "",
    shipping_phone : "",
    shipping_city: null,
    shipping_address: null,
    shipping_data: null,
    cityQuery: "",
    cityLists: [],
    addressQuery: "",
    addressList: [],
    logedIn: syncProperty(useCustomerStore, state => state.logedIn(), val => set({logedIn: val}) ),
    cartId: syncProperty(useCartState, state => state.cartId, val => set({cartId: val})),
    cartEmpty: syncProperty(useCartState, state => (state.cart?.lines.length || 0) === 0 , val => set({cartEmpty: val})),
    canGoNext: (step) => {
        switch(step) {
            case 'cart': return !get().cartEmpty;
            case 'shipping': return get().shipping_data !== null;
            case 'payment': return true
        }
        return true;
    },
    loadShippingOptions: () => {
        const cartId = get().cartId;
        if(cartId){
            set({processing: true, globalError: null})
            pipe(
                R.shippingOptions(cartId),
                AsyncResult.tap(options => {
                    set({shippingOptions: options});
                    if(options.length === 1) {
                        set({selectedOption: options[0]})
                    }
                    else {
                        set({selectedOption: undefined})
                    }
                }),
                AsyncResult.tapError(err => { set({globalError: i18n_unable_access_store}); console.error('loadShippingOptions', err)}),
                AsyncResult.then(() => set({processing: false}))
            )
        }
    },
    selectOption: (option) => set({selectedOption: option}),

    searchCity: debounce( (q:string) => {
        if( get().cityQuery.trim() == q.trim() || q.trim().length < 2 )
            return;
        
    }, 300)
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