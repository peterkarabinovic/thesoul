import { create,  StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { AsyncResult, pipe } from 'commons';
import { i18n_unable_access_store } from 'i18n';
import { City, Warehouse } from "nv-request-types"
import { debounce } from 'lib/utils';
import * as R from "./requests"
import { useCustomerStore } from '@customer/data';


type TShipping = CommonState & {
    options: R.ShippingOption[];
    selectedOption?: R.ShippingOption
    firstName: string;
    lastName: string;
    phone: string;
    useAnotherContact: boolean;
    additionalInfo: string;
    setUseAnotherContact: (b: boolean) => void;
    setAdditionalInfo: (info: string) => void;
    loadOptions: (cartId: string) => void;
    selectOption: (option: R.ShippingOption) => void;
    readyToSaveShipping: () => boolean;
    saveShipping: (cartId: string) => Promise<void>;
} 

export const shippingState: StateCreator<TShipping> = (set, get) => ({
    processing: false,
    globalError: null,
    options: [],
    selectedOption: undefined,
    firstName: "",
    lastName: "",
    phone: "",
    useAnotherContact: false,
    additionalInfo: "",

    setUseAnotherContact: function(useAnotherContact) {
        set({ useAnotherContact });
        if(!useAnotherContact) {
            const { customer } = useCustomerStore.getState();
            set({ firstName: customer.firstName, lastName: customer.lastName, phone: customer.phone });    
        }
        else {
            set({ firstName: "", lastName: "", phone: "" });
        }
    },

    setAdditionalInfo: (info) => set({ additionalInfo: info }),
    
    loadOptions: function (cartId)  {
        set({ processing: true, globalError: null });
        pipe(
            R.shippingOptions(cartId),
            AsyncResult.tap(res => set({ options: res }) ),
            AsyncResult.tapError(err => { console.error('loadOptions', err) }),
            AsyncResult.then(() => set({ processing: false })),
            AsyncResult.then(() => this.setUseAnotherContact( get().useAnotherContact))
        );
    },

    selectOption: (option) => set({ selectedOption: option }),

    readyToSaveShipping: () => {
        const { selectedOption, firstName, lastName, phone } = get();
        if(firstName.trim().length == 0 || lastName.trim().length == 0 || phone.trim().length == 0)
            return false;
        switch(selectedOption?.dataId) {
            case "shipping-to-warehouse": {
                const { city, warehouse } = useNpWarehouseState.getState();
                return Boolean(city?.id && warehouse?.id);
            }
            case "shipping-to-door": {
                const { city, address } = useNpDoorState.getState();
                return Boolean(city?.id && address && address.length > 0);
            }
            case "сourier-delivery": {
                const { address } = useCourierShippingState.getState();
                return !!address && address.trim().length > 0;
            }
        }
        return false;
    },

    saveShipping: (cartId) => {
        const { selectedOption, additionalInfo, phone, firstName, lastName } = get();
        if (!selectedOption)
            return Promise.reject("No selected option");

        const address_part = { phone, first_name: firstName, last_name: lastName, metadata: { additionalInfo } }
        const d = (() => {
            switch(selectedOption.dataId){
                case "shipping-to-warehouse": {
                    const { city, warehouse } = useNpWarehouseState.getState();
                    return {
                        shipping_address: {
                            city: city?.name || "",
                            address_1: warehouse?.name || "",
                            ...address_part
                        },
                        data: {
                            cityRef: city?.id,
                            warehouseRef: warehouse?.id
                        }
                    }
                }
                case "shipping-to-door": {
                    const { city, address, updateReceintAddresses } = useNpDoorState.getState();
                    updateReceintAddresses();
                    return {
                        shipping_address: {
                            city: city?.name || "",
                            address_1: address || "",
                            ...address_part
                        },
                        data: {
                            cityRef: city?.id
                        }
                    }
                }
                case "сourier-delivery": {
                    const { address, desirableTime, updateReceintAddresses } = useCourierShippingState.getState();
                    updateReceintAddresses();
                    return {
                        shipping_address: {
                            address_1: address,
                            ...address_part,
                            metadata: { desirableTime, additionalInfo }
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
    }
});



// ####################################################################################
// #
// #    Courier Shipping
// #
// ####################################################################################z

type TCourierShippingState = AddressState & {
    desirableTime: string;
    setDesirableTime: (t: string) => void;
}

const courierShippingState: StateCreator<TCourierShippingState> = (set, get, _) => ({
    ...addressState(set, get, _),
    desirableTime: "",
    setDesirableTime: (t: string) => set({ desirableTime: t }),
});


export const useCourierShippingState = create(
    persist<TCourierShippingState>(
        courierShippingState,
        {
            name: 'courier-shipping-state',
            storage: createJSONStorage(() => localStorage),
        }
    )
);


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
    selectCity: (city: City) => void;
}


const npCityState: StateCreator<NpCity> = (set, get) => ({
    globalError: null,
    processing: false,
    city: undefined,
    cityQuery: "",
    cityList: [],
    searchCity: debounce((q: string) => {
        set({ processing: true, cityQuery: q });
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

    selectCity: (city) =>  set({ city })
});



type NpWarehouse = NpCity & {
    warehouse?: Warehouse;
    warehouseQuery: string;
    warehouseList: Warehouse[];
    searchWarehouse: (q: string) => void;
    selectWarehouse: (warehouse: Warehouse) => void;
}

const npWarehouseState: StateCreator<NpWarehouse> = (set, get, _) => ({
    ...npCityState(set, get, _),
    warehouse: undefined,
    warehouseQuery: "",
    warehouseList: [],
    searchWarehouse: debounce((q: string) => {
        const { warehouseQuery, city } = get();
        if (warehouseQuery.trim() == q.trim())
            return;
        if (!city)
            return;
        set({ processing: true, globalError: null });
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

    selectWarehouse: (warehouse) => set({ warehouse })
});


export const useNpWarehouseState = create(
    persist<NpWarehouse>(
        npWarehouseState,
        {
            name: 'shipping-to-warehouse-state',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// ####################################################################################
// #
// #    Nova Poshta Shipping To Door
// #
// ####################################################################################
type NpDoor = NpCity & AddressState;

const npDoorState: StateCreator<NpDoor> = (set, get, _) => ({
    ...npCityState(set, get, _),
    ...addressState(set, get, _),
});

export const useNpDoorState = create(
    persist<NpDoor>(
        npDoorState,
        {
            name: 'shipping-to-door-state',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

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
    setAdress: (a: string) => void;
    updateReceintAddresses: () => void;
}

const addressState: StateCreator<AddressState> = (set, get) => ({
    address: "",
    receintAddresses: [],
    setAdress: (a: string) => set({ address: a }),
    updateReceintAddresses: () => { 
        const { receintAddresses, address } = get();
        if( receintAddresses.find(a => a.includes(address)) ) 
            return;
        const ra = [address, ...receintAddresses];
        if( ra.length > 10) 
            ra.pop();
        set({ receintAddresses: ra });
    }
});
