"use client"

import { CartEmpty, CartTotals } from "@cart/components";
import { TCartStore, useCartState } from "@cart/data";
import { CustomerSignUpOrSignIn } from "@customer/components/customer-signup-or-signin";
import { TCustomerState, useCustomerStore } from "@customer/data";
import { ShippingView } from "modules/shipping/components/shipping-view";




type Props = {
    useCart?: TCartStore;
    useCustomer?: TCustomerState;
    lang?: string;
};


export function CheckoutView({  
    useCart = useCartState, 
    lang = "ua",
} : Props ){

    const cartEmpty = useCart( s => (s?.cart?.lines.length ?? 0) == 0  )
    const cartId = useCart( s => s.cart?.id );
    const logedIn = useCustomerStore( s => !!s.customerId );
 
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
        <div className="border-b border-[#ededed] md:py-[80px] py-[50px]">
            <div className="container">
                <div className="grid grid-cols-12 lg:gap-x-6 max-md:gap-y-8">
                    
                    <div className="xl:col-span-7 lg:col-span-6 col-span-12">
                        <CustomerSignUpOrSignIn lang={lang}/>
                        { logedIn && <ShippingView lang={lang} cartId={cartId}/> }
                    </div>

                    <div className="xl:col-span-5 lg:col-span-6 col-span-12">
                        <CartTotals lang={lang}/>
                    </div>

                </div>
            </div>
        </div>
    )
}
