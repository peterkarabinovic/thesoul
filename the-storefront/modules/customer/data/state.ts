import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { AsyncResult, Result, pipe } from 'commons';
import { TI18nGeneral, TI18nCustomer } from 'config-and-i18n'; 
import * as Requsets from "./requests"
import * as T from "./type"
import { readThesoulCookie } from 'lib/thesoul-cookie';


export type TCustomerState = {
    customerId: string | null
    customer: T.TCustomer,
    fieldErrors: T.TCustomerErrors,
    globalError?: (i18n: any) => string,
    userWithPhoneAlreadyExists?: boolean, 
    processing: boolean,
    otp?: {
        sentAt: number, //  timestamp of otp sent
        phoneSentTo: string, 
    },
    singedUpAt?: number | null, //  timestamp of otp sent
    singUpRecently: () => boolean,
    sendToServer: (cus: T.TCustomer) => void,
    logIn: (phone: string) => void,
    confirmOtp: (otp: string) => void,
    logOut: () => void,
    retriveCustomIdFromCookie: () => void
} 

const initState = {
    customerId: null,
    customer: {
        firstName: '',
        lastName: '',
        phone: '',
        telegram: '',
    },
    fieldErrors: {},
    globalError: undefined,
    userWithPhoneAlreadyExists: false,
    processing: false
};

export const useCustomerStore = create( 
    subscribeWithSelector<TCustomerState>( (set, get) => ({
        ...initState,
        
        singUpRecently: () => get().customer.firstName.length > 0 && (Date.now() - (get().singedUpAt || 0)) < 1000 * 60 * 5,
        
        sendToServer: (cus) => {
            set({ processing: true, fieldErrors: {}, userWithPhoneAlreadyExists: false });
            const singedUp = !!get().customerId; 
            
            pipe(
                singedUp ? Requsets.update(cus) : Requsets.singUp(cus),
                AsyncResult.tapError((error) => console.error('Customer sendToServer', error)),
                AsyncResult.tapError(() => set(() => ({ globalError: (i18n:TI18nGeneral) => i18n.unable_access_store }))),
                AsyncResult.tap( res => {
                    if("error" in res) {
                        switch(res.error.name) {
                            case "invalidInput": {
                                const errors = res.error.fieldErrors;
                                set( () => ({ fieldErrors: errors}) );
                                break;
                            }
                            case "userWithPhoneAlreadyExists":
                                set(() => ({ userWithPhoneAlreadyExists: true }));
                                break;
                            case "unknownError":
                                set(() => ({ globalError: (i18n:TI18nGeneral) => i18n.unable_access_store }));
                                break;
                        }
                    }
                    else {
                        set({ 
                            globalError: undefined, 
                            fieldErrors: {}, 
                            customer: cus, 
                            customerId: res.customerId, 
                            singedUpAt: !singedUp ? Date.now() : get().singedUpAt 
                        });
                    }
                }),
                AsyncResult.then(() => set({ processing: false} )),
            );
        },

        logIn: (phone) => {
            set({ processing: true, globalError: undefined, otp: undefined});
            pipe(
                Requsets.logIn(phone),
                AsyncResult.tapError((error) => {
                    console.error('Customer logIn', error);
                    set({ globalError: (i18n:TI18nGeneral) => i18n.unable_access_store })
                }),
                AsyncResult.tap( res => {
                    if("error" in res) {
                        switch(res.error.name) {
                            case "invalidInput": {
                                const errors = Object.values(res.error.fieldErrors).join('\n');
                                set({ globalError: () => errors});
                                break;
                            }
                            case "userWithPhoneNotExists": {
                                const _phone = res.error.phone;
                                set({ globalError: (i18n: TI18nCustomer) =>  i18n.no_useraccount_for_phone.replace('{phone}', _phone)});
                                break;
                            }
                            case "unknownError":
                                set({ globalError: (i18n:TI18nGeneral) => i18n.unable_access_store });
                                break;
                        }
                    } else { 
                        set({ otp: { sentAt: Date.now(), phoneSentTo: phone } });
                    }
                }),
                AsyncResult.then(() => set({ processing: false} ))
            );
        },
        
        confirmOtp: (otpCode) => {
            const phone = get().otp?.phoneSentTo;
            if(!phone) 
                return;
            set({ processing: true, globalError: undefined });
            pipe(
                Requsets.confirmOtp(otpCode, phone),
                AsyncResult.chain( async res => {
                    if( "error" in res ) {
                        switch(res.error.name) {
                            case "invalidInput": {
                                const errors = Object.values(res.error.fieldErrors).join('\n');
                                set({ globalError: () => errors});
                                break;
                            }
                            case "userWithPhoneNotExists": {
                                const _phone = res.error.phone;
                                set({ globalError: (i18n: TI18nCustomer) =>  i18n.no_useraccount_for_phone.replace('{phone}', _phone)});
                                break;
                            }
                            case "unknownError":
                                set({ globalError: (i18n:TI18nGeneral) => i18n.unable_access_store });
                                break;   
                        }
                        return Result.of(undefined);
                    }
                    else  {
                        return pipe(
                            Requsets.me(),
                            AsyncResult.tap( customer => {
                                if( !("error" in customer))
                                    set({ customer, customerId: res.customerId });
                                return Result.of(undefined);
                            })
                        )
                    }
                }),
                AsyncResult.tapError((error) => {
                    console.error('Customer logIn', error);
                    set({ globalError: (i18n:TI18nGeneral) => i18n.unable_access_store })
                }),
                AsyncResult.then(() => set({ processing: false} ) )
            )

        },
        logOut: () => {},

        retriveCustomIdFromCookie: async () => {
            const { customerId } = readThesoulCookie();
            if( customerId ) {
                const d = await Requsets.me();
                if( d.success && !("error" in d.data)) {
                    set({ customer: d.data, customerId });
                    return;
                }    
            }
            set(initState);
        }
    }))
);

export function readyToSend(original: T.TCustomer, ui: T.TCustomer): boolean {
    const isEquals = JSON.stringify(original) === JSON.stringify(ui);
    return !isEquals 
        && ui.firstName.length > 0
        && ui.lastName.length > 0
        && ui.phone.length > 11 
}


// Initilize the store if cookie exists, it means we are loged in.
useCustomerStore.getState().retriveCustomIdFromCookie();
