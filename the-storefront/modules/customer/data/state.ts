import { create } from 'zustand'
import { AsyncResult, pipe } from 'commons';
import { i18n_user_with_phone_already_exists, i18n_unable_access_store } from 'i18n'
import * as Requsets from "./requests"
import * as T from "./type"


export type TCustomerState = {
    customer: T.TCustomer,
    customerErrors: T.TCustomerErrors,
    globalError?: string, 
    processing: boolean,
    logedIn: () => boolean,
    sendToServer: (cus: T.TCustomer) => void,
} 

const initState = {
    customer: {
        firstName: '',
        lastName: '',
        phone: '',
        telegram: '',
    },
    customerErrors: {},

    globalError: undefined,
    
    processing: false,
};

export const useCustomerStore = create<TCustomerState>( (set, get) => ({
    ...initState,
    
    logedIn: () => get().customer.firstName.length > 0,
    
    sendToServer: (cus) => {
        set({ processing: true });
        const logedIn = get().logedIn();
        
        pipe(
            logedIn ? Requsets.update(cus) : Requsets.singUp(cus),
            AsyncResult.tapError((error) => console.error('Customer sendToServer', error)),
            AsyncResult.tapError(() => set(() => ({ globalError: i18n_unable_access_store }))),
            AsyncResult.tap( res => {
                if("error" in res) {
                    switch(res.error.name) {
                        case "invalidInput": {
                            const errors = res.error.fieldErrors;
                            set( () => ({ customerErrors: errors}) );
                            break;
                        }
                        case "userWithPhoneAlreadyExists":
                            set(() => ({ globalError: i18n_user_with_phone_already_exists }));
                            break;
                        case "unknownError":
                            set(() => ({ globalError: i18n_unable_access_store }));
                            break;
                    }
                }
                else {
                    set({ globalError: undefined, customerErrors: {}, customer: cus });
                }
            }),
            AsyncResult.then(() => set({ processing: false} )),
        );
    }
}));

export function readyToSend(original: T.TCustomer, ui: T.TCustomer): boolean {
    const isEquals = JSON.stringify(original) === JSON.stringify(ui);
    return !isEquals 
        && ui.firstName.length > 0
        && ui.lastName.length > 0
        && ui.phone.length > 11 
}


// Initilize the store if cookie exists, it means we are loged in.
if( "document" in global ){

    ( async () => {

        const cookie = document.cookie || '';
        if( cookie.includes('thesoul=s') ) {
            const d = await Requsets.me();
            if( d.success && !("error" in d.data)) {
                useCustomerStore.setState({ customer: d.data });
                return;
            }    
        }
        useCustomerStore.setState(initState);

    })().catch( er => console.error(er));
}