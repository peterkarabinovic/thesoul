"use client"

import { TShippingStore, shippingStore } from "../data/state"
import { ShippingOptions } from "./shipping-options";
import { ShippingCourier } from "./shipping-сourier";
import { ShippingContact } from "./shipping-contact";
import { ShippingToWarehouse } from "./shipping-to-warehouse";
import { ShippingToDoor } from "./shipping-to-door";

type Props = {
    If: boolean;
    useShipping?: TShippingStore;
    cartId?: string;
    lang?: string;
};


export function ShippingView({ If, cartId,  useShipping = shippingStore, lang = "ua" } : Props){
    const options = useShipping.useShipping( state => state.selectedOption );

    if(!If)
        return (null);

    return (
        <div className="flex flex-col w-full gap-8">
            
            <ShippingContact 
                If={true}
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
