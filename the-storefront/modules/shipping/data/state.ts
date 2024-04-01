import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { AsyncResult, pipe } from 'commons';
import { i18n_unable_access_store } from 'i18n';
import { City, Warehouse } from "nv-request-types"
import { debounce, omitProps } from 'lib/utils';
import * as R from "./requests"
import { useCustomerStore } from '@customer/data';
import { syncProperty } from 'lib/zustand-utils';


type TShipping = CommonState & {
    options: R.ShippingOption[];
    selectedOption?: R.ShippingOption
    customerFirstName: string;
    customerLastName: string;
    customerPhone: string;
    anotherFirstName: string;
    anotherLastName: string;
    anotherPhone: string;
    useAnotherContact: boolean;
    setAnotherContact: ( firstName: string, secondName: string, phone: string) => void;
    setUseAnotherContact: (b: boolean) => void;
    loadOptions: (cartId: string) => void;
    selectOption: (option: R.ShippingOption) => void;
    readyToSaveShipping: () => boolean;
    saveShipping: (cartId: string) => Promise<void>;
} 

export const shippingStore = createUseShipping();

export type TShippingStore = typeof shippingStore;

export function createUseShipping({
    state = {},
    useCourierShipping = createUseCourierShipping(),
    useNpWarehouseShipping = createNpWarehouseState(),
    useNpDoorShipping = createUseNpDoorState()
}:{
    state?: Partial<TShipping>,
    useCourierShipping?: TCourierShippingStore,
    useNpWarehouseShipping?: TNpWarehouseStore,
    useNpDoorShipping?: TNpDoorStore,
} = {}) {
    return {
            useCourierShipping,
            useNpWarehouseShipping,
            useNpDoorShipping,
            useShipping: create(persist<TShipping>(
                ((set, get) => ({
                    processing: false,
                    globalError: null,
                    options: [],
                    selectedOption: undefined,
                    customerFirstName: syncProperty(useCustomerStore, s => s.customer.firstName, v => set({ customerFirstName: v })),
                    customerLastName: syncProperty(useCustomerStore, s => s.customer.lastName, v => set({ customerLastName: v })),
                    customerPhone: syncProperty(useCustomerStore, s => s.customer.phone, v => set({ customerPhone: v })),
                    anotherFirstName: "",
                    anotherLastName: "",
                    anotherPhone: "",
                    useAnotherContact: false,
                
                    setUseAnotherContact: f => set({ useAnotherContact: f }),
                    setAnotherContact: (anotherFirstName, anotherLastName, anotherPhone) => set({ anotherFirstName, anotherLastName, anotherPhone }),
                                    
                    loadOptions: function (cartId)  {
                        set({ processing: true, globalError: null });
                        pipe(
                            R.shippingOptions(cartId),
                            AsyncResult.tap(res => {
                                set({ options: res });
                                if(res.length == 1 && res[0] )
                                    this.selectOption( res[0] );
                            }),
                            AsyncResult.tapError(err => { console.error('loadOptions', err) }),
                            AsyncResult.then(() => set({ processing: false })),
                        );
                    },
                
                    selectOption: function(option) {
                        set({ selectedOption: option });
                    } ,
                
                    readyToSaveShipping: () => {
                        const { selectedOption, useAnotherContact, anotherFirstName, anotherLastName, anotherPhone } = get();
                        if(useAnotherContact &&
                            (anotherFirstName.trim().length == 0 || anotherLastName.trim().length == 0 || anotherPhone.trim().length == 0)
                        )
                            return false;
                        switch(selectedOption?.dataId) {
                            case "shipping-to-warehouse": {
                                const { city, warehouse } = useNpWarehouseShipping.getState();
                                return Boolean(city?.id && warehouse?.id);
                            }
                            case "shipping-to-door": {
                                const { city, address } = useNpDoorShipping.getState();
                                return Boolean(city?.id && address && address.length > 0);
                            }
                            case "сourier-delivery": {
                                const { address } = useCourierShipping.getState();
                                return !!address && address.trim().length > 0;
                            }
                        }
                        return false;
                    },
                
                    saveShipping: (cartId) => {
                        const { selectedOption } = get();
                        if (!selectedOption)
                            return Promise.reject("No selected option");
                
                        const address_part = { 
                            phone: get().useAnotherContact ? get().anotherPhone : get().customerPhone, 
                            first_name: get().useAnotherContact ? get().anotherFirstName : get().customerFirstName, 
                            last_name: get().useAnotherContact ? get().anotherLastName : get().customerLastName 
                        }
                        const d = (() => {
                            switch(selectedOption.dataId){
                                case "shipping-to-warehouse": {
                                    const { city, warehouse, comment } = useNpWarehouseShipping.getState();
                                    return {
                                        shipping_address: {
                                            city: city?.name || "",
                                            address_1: warehouse?.name || "",
                                            ...address_part,
                                            metadata: { comment }
                                        },
                                        data: {
                                            cityRef: city?.id,
                                            warehouseRef: warehouse?.id
                                        }
                                    }
                                }
                                case "shipping-to-door": {
                                    const { city, address, updateReceintAddresses, comment } = useNpDoorShipping.getState();
                                    updateReceintAddresses();
                                    return {
                                        shipping_address: {
                                            city: city?.name || "",
                                            address_1: address || "",
                                            ...address_part,
                                            metadata: { comment }
                                        },
                                        data: {
                                            cityRef: city?.id
                                        }
                                    }
                                }
                                case "сourier-delivery": {
                                    const { address, desirableTime, updateReceintAddresses, comment } = useCourierShipping.getState();
                                    updateReceintAddresses();
                                    return {
                                        shipping_address: {
                                            address_1: address,
                                            ...address_part,
                                            metadata: { desirableTime, comment }
                                        },
                                        data: {}
                                    }
                                }
                            }
                        })();
                
                
                        set({ processing: true, globalError: null });
                        return pipe(
                            R.saveShippingAddress(cartId, d.shipping_address ),
                            AsyncResult.chain( () => R.addShippingMethod(cartId, selectedOption.id, d.data) ),
                            AsyncResult.tapError(err => { set({ globalError: i18n_unable_access_store }); console.error('saveShipping', err) }),
                            AsyncResult.then(() => set({ processing: false })),
                            AsyncResult.toPromise
                        );
                    },            
                    ...state,
                })),{
                    name: 'shipping-state',
                    partialize: s => omitProps(s, "options", "anotherFirstName", "anotherLastName", "anotherPhone"),
                    storage: createJSONStorage(() => localStorage),
                }
            ))
    }
}
// ####################################################################################
// #
// #    Courier Shipping
// #
// ####################################################################################z

type TCourierShippingState = AddressState & AdditionalInfo & {
    desirableTime: string;
    setDesirableTime: (t: string) => void;
}

export type TCourierShippingStore = ReturnType<typeof createUseCourierShipping>;

export function createUseCourierShipping( state: Partial<TCourierShippingState> = {} ) {

    return create(persist<TCourierShippingState>(
            (set, get) => ({
                ...addressState(set, get),
                ...additionalInfoState(set),
                desirableTime: "",
                setDesirableTime: (t: string) => set({ desirableTime: t }),
                ...state
            }),{
                name: 'courier-shipping-state',
                storage: createJSONStorage(() => localStorage),
            }
        )
    );
}


// ####################################################################################
// #
// #    Nova Poshta Shipping To Wharehouse
// #
// ####################################################################################
type NpCity = CommonState & {
    city?: City;
    cityQuery: string;
    cityList: City[];
    searchCity: (q: string) => void;
    selectCity: (city?: City) => void;
}

function npCityState(set: Parameters<StateCreator<NpCity>>[0], get: Parameters<StateCreator<NpCity>>[1] ){

    return {
        globalError: null,
        processing: false,
        city: undefined,
        cityQuery: "",
        cityList: [],
        searchCity: debounce((q: string) => {

            if (get().cityQuery.trim() == q.trim() )
                return;

            if( q.trim().length <= 2 ) {
                set({ cityList: [] });
                return;
            }
    
            set({ processing: true, globalError: null, cityQuery: q })
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
    
        selectCity: (city?: City) =>  set({ city, cityQuery: city?.name || ""})
    }
} 



type NpWarehouse = NpCity & AdditionalInfo & {
    warehouse?: Warehouse;
    warehouseQuery: string;
    warehouseList: Warehouse[];
    searchWarehouse: (q: string) => void;
    selectWarehouse: (warehouse?: Warehouse) => void;
    isWarehouseDisabled: () => boolean;
}

export type TNpWarehouseStore = ReturnType<typeof createNpWarehouseState>;

export function createNpWarehouseState(state: Partial<NpWarehouse> = {}){

    return create(persist<NpWarehouse>(
        (set, get, store) => ({
            ...npCityState(set, get),
            ...additionalInfoState(set),
            warehouse: undefined,
            warehouseQuery: "",
            warehouseList: [],
            searchWarehouse: debounce((q: string) => {
                const { warehouseQuery, city, warehouseList } = get();
                if (!city)
                    return;
                if (warehouseQuery.trim() == q.trim() && warehouseList.length > 0)
                    return;
                set({ processing: true, globalError: null, warehouseQuery: q });
                pipe(
                    R.getWarehouses(city.id, q),
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

            selectCity: function (city?: City)  {
                set({ city, cityQuery: city?.name || ""})
                store.getState().searchWarehouse("")
            },
        
            selectWarehouse: (warehouse) => set({ warehouse }),

            isWarehouseDisabled: () => !get().city,

            ...state
        }),{
            name: 'np-warehouse-state',
            storage: createJSONStorage(() => localStorage),
        }))
} 

// ####################################################################################
// #
// #    Nova Poshta Shipping To Door
// #
// ####################################################################################
type NpDoor = NpCity & AddressState & AdditionalInfo;

type TNpDoorStore = ReturnType<typeof createUseNpDoorState>;

export function createUseNpDoorState(state: Partial<NpDoor> = {}) {
    return create(persist<NpDoor>(
        (set, get) => ({
            ...npCityState(set, get),
            ...addressState(set, get),
            ...additionalInfoState(set),
            ...state
        }),{
            name: 'np-door-state',
            storage: createJSONStorage(() => localStorage),
        })
    )
}

// ####################################################################################
// #
// #    Common Shipping Atrributes
// #
// ####################################################################################

type CommonState = {
    globalError?: string | null;
    processing: boolean;
}

type AddressState = {
    address: string;
    receintAddresses: string[];
    setAddress: (a: string) => void;
    updateReceintAddresses: () => void;
}

/**
 * 
 * For function parameters we use the `Parameters` utility type to extract the types of the `set` and `get` functions. 
 * becoz named function addressState can't be assigned type in TypeScript  
 * and we can't use const at the end of file:
 * 
 *      const addressState: StateCreator<AddressState> = (set, get) => ({
 * 
 */
function addressState( set: Parameters<StateCreator<AddressState>>[0], get: Parameters<StateCreator<AddressState>>[1]){
    return {
        address: "",
        receintAddresses: [],
        setAddress: (a: string) => set({ address: a }),
        updateReceintAddresses: () => { 
            const { receintAddresses, address } = get();
            if( receintAddresses.find(a => a.includes(address)) ) 
                return;
            const ra = [address, ...receintAddresses];
            if( ra.length > 10) 
                ra.pop();
            set({ receintAddresses: ra });
        }        
    }
}

// const addressState: StateCreator<AddressState> = (set, get) => ({

// });

type AdditionalInfo = {
    comment: string;
    setComment: (c: string) => void;
}

function additionalInfoState(set: Parameters<StateCreator<AdditionalInfo>>[0]){
    return {
        comment: "",
        setComment: (c: string) => set({ comment: c })
    }
}