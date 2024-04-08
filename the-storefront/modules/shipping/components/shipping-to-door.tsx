"use client"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { useI18n } from "config-and-i18n/react";
import { TNpDoorStore } from "../data/state";
import { i18nShipping } from "config-and-i18n";
import { Autocomplete } from "components/autocomplete";
import { InputField, TextArea } from "components";


type Props = {
    If: boolean
    lang: string
    useDoorShipping: TNpDoorStore
}

export function ShippingToDoor( { If, lang, useDoorShipping }: Props ){

    const city = useDoorShipping(s => s.city)
    const cityList = useDoorShipping(s => s.cityList);
    const cityQuery = useDoorShipping(s => s.cityQuery);
    const searchCity = useDoorShipping(s => s.searchCity);
    const selectCity = useDoorShipping(s => s.selectCity);

    const address = useDoorShipping(s => s.address);
    const setAddress = useDoorShipping(s => s.setAddress);

    const comment = useDoorShipping(s => s.comment);
    const setComment = useDoorShipping(s => s.setComment);

    const i18n = useI18n(lang, i18nShipping);

    if(!If)
        return (null);
    
    return (
            <div className="w-full flex flex-col gap-4">
                <div className="my-form-section-title">
                    <CheckCircleIcon className='icon' />
                    <h2>{i18n.nv_shipping_to_door}</h2>
                </div>
                <div className="flex flex-col gap-2 sm:gap-1 px-4 sm:px-6 ">

                    <Autocomplete 
                        title={i18n.city}
                        curSelected={city?.name || cityQuery}
                        items={cityList.map( c => c.name )}
                        placeholder={i18n.input_city}
                        onChangeQeury={s => searchCity(s)}
                        onSelectItem={s => selectCity(cityList.find( c => c.name === s))}
                    />

                    <InputField
                        type="text"
                        title={i18n.address}
                        value={address}
                        onChange={s => setAddress(s)}
                        disabled={!city}
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