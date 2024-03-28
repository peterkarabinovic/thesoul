"use client"
import { useEffect } from "react" 
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { i18nShipping } from "config-and-i18n";
import { useI18n } from "config-and-i18n/react";
import { TShippingStore } from "../data/state"

type Props = {
    shippingStore: TShippingStore;
    cartId?: string;
    lang: string;
}

export function ShippingOptions({ lang, shippingStore, cartId }: Props ){

    const loadOptions = shippingStore.useShipping( state => state.loadOptions );
    const options = shippingStore.useShipping( state => state.options );
    const selectedOption = shippingStore.useShipping( state => state.selectedOption );
    const selectOption = shippingStore.useShipping( state => state.selectOption );
    const i18n = useI18n(lang, i18nShipping)
    

    useEffect(() =>  {
            if(cartId)
                loadOptions(cartId)
        },
        [loadOptions, cartId]
    );

    if( selectedOption && options.length === 1 )
        return (null);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="my-form-section-title">
                <CheckCircleIcon className='icon' />
                    <h2>{i18n.shipping_options}</h2>
            </div>
            <div className="flex flex-col gap-2 px-4 sm:gap-1">
                { options.map( (option) => (

                    <label key={option.id} className="flex" htmlFor={option.dataId}>
                        <input 
                            type="radio" 
                            id={option.dataId} 
                            value={option.id} 
                            checked={selectedOption?.dataId === option.dataId}
                            onChange={() => selectOption(option)}
                        />
                        <span className="ml-2">
                            {option.name}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    )
}