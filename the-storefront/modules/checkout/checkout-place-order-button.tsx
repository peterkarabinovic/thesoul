"use client"

import { i18nGeneral } from "config-and-i18n";
import { useI18n } from "config-and-i18n/react";
import { TShippingStore, shippingStore } from "modules/shipping/data/state";

type Props = {
    lang: string;
    cartId: string;
    useShipping?: TShippingStore;
    onPlacementCompleted: () => void;
}

export function PlaceOrderBtn({ lang, cartId, useShipping = shippingStore, onPlacementCompleted }: Props){
    const i18n = useI18n(lang, i18nGeneral );
    const readyShipping = useShipping.useShipping( s => s.readyToSaveShipping());
    const saveShipping = useShipping.useShipping( s => s.saveShipping);

    const handleOnClick = () => {
        if(readyShipping){
            saveShipping(cartId)
                .then( () => onPlacementCompleted() )
        }
    }

    return (
        <input
            type="button"
            value={i18n.place_order}
            className="my-primary-button"
            disabled={!readyShipping}
            onClick={handleOnClick}
        />
    );
}