"use client"

import { TShippingStore, createUseShipping } from "../data/state"
import { ShippingOptions } from "./shipping-options";
import { ShippingCourier } from "./shipping-сourier";




type Props = {
    shippingStore?: TShippingStore;
    cartId?: string;
    lang?: string;
};


export function ShippingView({ cartId, shippingStore = createUseShipping(), lang = "ua" } : Props){
    const options = shippingStore.useShipping( state => state.selectedOption );

    // const rawHtmlClasses = [
    //     "[&>h1]:text-2xl [&>h1]:mb-4",
    //     "[&>h2]:text-xl [&>h2]:mb-3",
    //     "[&>h3]:text-lg [&>h3]:mb-2",
    //     "[&>ul]:list-disc [&>ul]:px-4 [&>ul]:pt-4",
    //     "[&>ul>li]:mb-[5px] [&>ul>li]:last:mb-0",
    //     "[&>p]:text-base [&>p]:leading-[24px]"
    // ].join(' ');
 console.log("ShippingView: RENDER")
    return (
        <div className="flex flex-col w-full gap-8">
            <ShippingOptions lang={lang} cartId={cartId} shippingStore={shippingStore}/>
            {
                options?.dataId === "сourier-delivery" && (
                    <ShippingCourier lang={lang} useCourierShipping={shippingStore.useCourierShipping}/>
                )
            }
        </div>
)
}
