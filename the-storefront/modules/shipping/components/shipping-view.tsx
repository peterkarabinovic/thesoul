"use client"

import { TShippingStore, createUseShipping } from "../data/state"
import { ShippingOptions } from "./shipping-options";
import { ShippingCourier } from "./shipping-сourier";
import { ShippingContact } from "./shipping-contact";
import { ShippingToWarehouse } from "./shipping-to-warehouse";

type Props = {
    shippingStore?: TShippingStore;
    cartId?: string;
    lang?: string;
};


export function ShippingView({ cartId, shippingStore = createUseShipping(), lang = "ua" } : Props){
    const options = shippingStore.useShipping( state => state.selectedOption );
    const logedIn = shippingStore.useShipping( state => state.customerPhone.length > 0 );


    return (
        <div className="flex flex-col w-full gap-10">
            
            <ShippingContact 
                If={logedIn}
                lang={lang} 
                shippingStore={shippingStore}
            />

            <ShippingOptions 
                lang={lang} 
                cartId={cartId} 
                shippingStore={shippingStore}
            />

            <ShippingCourier 
                If={options?.dataId === "сourier-delivery"}
                lang={lang} 
                useCourierShipping={shippingStore.useCourierShipping}
            />


            <ShippingToWarehouse 
                If={options?.dataId === "shipping-to-warehouse"}
                lang={lang} 
                useWareShipping={shippingStore.useNpWarehouseShipping}
            />

        </div>
)
}
