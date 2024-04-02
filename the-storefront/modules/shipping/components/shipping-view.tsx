"use client"

import { TShippingStore, createUseShipping } from "../data/state"
import { ShippingOptions } from "./shipping-options";
import { ShippingCourier } from "./shipping-сourier";
import { ShippingContact } from "./shipping-contact";
import { ShippingToWarehouse } from "./shipping-to-warehouse";
import { ShippingToDoor } from "./shipping-to-door";

type Props = {
    If: boolean;
    shippingStore: TShippingStore;
    cartId?: string;
    lang?: string;
};


export function ShippingView({ If, cartId, shippingStore, lang = "ua" } : Props){
    const options = shippingStore.useShipping( state => state.selectedOption );
    const logedIn = shippingStore.useShipping( state => state.customerPhone.length > 0 );

    if(!If)
        return (null);

    return (
        <div className="flex flex-col w-full gap-8">
            
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

            <ShippingToDoor
                If={options?.dataId === "shipping-to-door"}
                lang={lang} 
                useDoorShipping={shippingStore.useNpDoorShipping}
            />

        </div>
)
}
