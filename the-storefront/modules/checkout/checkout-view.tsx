"use client"

import { CartEmpty, CartTotals } from "@cart/components";
import { TCartStore, useCartState } from "@cart/data";
import { CustomerSignUpOrSignIn } from "@customer/components/customer-signup-or-signin";
import { TCustomerStore, useCustomerStore } from "@customer/data";
import { BackToCartBtn } from "./checkout-view-button";
import { ShippingView } from "modules/shipping/components/shipping-view";
import { TShippingStore, shippingStore } from "modules/shipping/data/state";
import { i18nGeneral } from "config-and-i18n";
import { useI18n } from "config-and-i18n/react";



type Props = {
    useCart?: TCartStore;
    useCustomer?: TCustomerStore;
    useShipping?: TShippingStore;
    lang?: string;
};


export function CheckoutView({  
    useCart = useCartState, 
    useCustomer = useCustomerStore,
    useShipping = shippingStore,
    lang = "ua",
} : Props ){
    const cartEmpty = useCart( s => (s?.cart?.lines.length ?? 0) == 0  )
    const cartId = useCart( s => s.cart?.id );
    const logedIn = useCustomer( s => !!s.customerId );
    

    if(cartEmpty) {
        return (
            <div className="border-b border-[#ededed] md:py-[80px] py-[50px]">
                <div className="container">
                    <CartEmpty lang={lang} />                    
                </div>
            </div>
        );
    }

    return (
        <div className="border-b border-[#ededed] md:py-8 py-6">
            <div className="container">
                <div className="grid grid-cols-12 md:gap-8 gap-6">
                    <div className="col-span-12">
                        <BackToCartBtn lang={lang}/>
                    </div>
                    <div className="xl:col-span-7 lg:col-span-6 col-span-12">
                        <CustomerSignUpOrSignIn lang={lang}/>
                        <ShippingView 
                            If={logedIn}
                            lang={lang} 
                            cartId={cartId}
                            shippingStore={useShipping}
                        />
                    </div>

                    <div className="xl:col-span-5 lg:col-span-6 col-span-12">
                        <CartTotals lang={lang}/>
                        <div className="max-w-[400px]  m-auto mt-8">
                            <PlaceOrderBtn 
                                lang={lang} 
                                useShipping={useShipping}
                                onClick={() => { console.log('Place order') }}
                            />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


type Props2 = {
    lang: string;
    useShipping: TShippingStore;
    onClick: () => void;
}
export function PlaceOrderBtn({ lang, useShipping, onClick }: Props2){
    const i18n = useI18n(lang, i18nGeneral );
    const readyShipping = useShipping.useShipping( s => s.readyToSaveShipping()) 
    return (
        <input
            type="button"
            value={i18n.place_order}
            className="my-primary-button"
            disabled={!readyShipping}
            onClick={() => onClick()}
        />
    );
}