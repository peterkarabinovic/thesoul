"use client"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { useI18n } from "config-and-i18n/react";
import { TNpWarehouseStore } from "../data/state";
import { i18nShipping } from "config-and-i18n";
import { Autocomplete } from "components/autocomplete";
import { TextArea } from "components";


type Props = {
    If: boolean
    lang: string
    useWareShipping: TNpWarehouseStore
}

export function ShippingToWarehouse( { If, lang, useWareShipping }: Props ){

    const city = useWareShipping(s => s.city)
    const cityList = useWareShipping(s => s.cityList);
    const cityQuery = useWareShipping(s => s.cityQuery);
    const searchCity = useWareShipping(s => s.searchCity);
    const selectCity = useWareShipping(s => s.selectCity);

    const warehouse = useWareShipping(s => s.warehouse);
    const warehouseList = useWareShipping(s => s.warehouseList);
    const searchWarehouse = useWareShipping(s => s.searchWarehouse);
    const selectWarehouse = useWareShipping(s => s.selectWarehouse);
    const isWarehouseDisabled = useWareShipping(s => s.isWarehouseDisabled());

    const comment = useWareShipping(s => s.comment);
    const setComment = useWareShipping(s => s.setComment);

    const i18n = useI18n(lang, i18nShipping);

    if(!If)
        return (null);
    
    return (
            <div className="w-full flex flex-col gap-4">
                <div className="my-form-section-title">
                    <CheckCircleIcon className='icon' />
                    <h2>{i18n.nv_shipping_to_warehouse}</h2>
                </div>
                <div className="flex flex-col gap-2 px-4 sm:gap-1">

                    <Autocomplete 
                        title={i18n.city}
                        curSelected={city?.name || cityQuery}
                        items={cityList.map( c => c.name )}
                        placeholder={i18n.input_city}
                        onChangeQeury={s => searchCity(s)}
                        onSelectItem={s => selectCity(cityList.find( c => c.name === s))}
                    />

                    <Autocomplete 
                        title={i18n.novaposhta_weahouse}
                        curSelected={warehouse?.name || ''}
                        items={warehouseList.map( c => c.name )}
                        placeholder=""
                        onChangeQeury={w => searchWarehouse(w)}
                        onSelectItem={w => selectWarehouse(warehouseList.find( it => it.name === w))}
                        disabled={isWarehouseDisabled}
                    />

                    <TextArea 
                        title={i18n.comment}
                        value={comment}
                        onChange={s => setComment(s)}
                    />
                </div>
            </div>
    )
}