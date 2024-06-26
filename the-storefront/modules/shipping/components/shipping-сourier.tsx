"use client"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { TCourierShippingStore } from "../data/state"
import { i18nShipping } from "config-and-i18n"
import { useI18n } from "config-and-i18n/react"
import { Autocomplete } from "components/autocomplete"
import { OptionsInput } from "components/options-input"
import { TextArea } from "components/textarea"

type Props = {
    If: boolean
    useCourierShipping: TCourierShippingStore
    lang: string
}

export function ShippingCourier( { If, lang, useCourierShipping }: Props ){

    const address = useCourierShipping(s => s.address);
    const setAddress = useCourierShipping(s => s.setAddress);
    const receintAddresses = useCourierShipping(s => s.receintAddresses);
    const desirableTime = useCourierShipping(s => s.desirableTime);
    const setDesirableTime = useCourierShipping(s => s.setDesirableTime);
    const comment = useCourierShipping(s => s.comment);
    const setComment = useCourierShipping(s => s.setComment);

    const i18n = useI18n(lang, i18nShipping);

    if(!If)
        return (null);
    
    return (
            <div className="w-full flex flex-col gap-4">
                <div className="my-form-section-title">
                    <CheckCircleIcon className='icon' />
                    <h2>{i18n.courier_shipping}</h2>
                </div>
                <div className="flex flex-col gap-5 sm:gap-6 px-4 sm:px-6">

                    <Autocomplete 
                        title={i18n.address}
                        curSelected={address}
                        items={receintAddresses}
                        placeholder={i18n.input_address}
                        onChangeQeury={setAddress}
                        onSelectItem={setAddress}
                    />

                    <OptionsInput
                        title={i18n.desirable_time?.title}
                        subtitle={i18n.optional}
                        selected={desirableTime}
                        options={[""].concat(i18n.desirable_time?.time_options || [])}
                        onSelect={setDesirableTime}
                    />
                    
                    <p className="text-sm text-neutral-500" dangerouslySetInnerHTML={{ __html: i18n.desirable_time?.descriptionHtml }}>
                    </p>

                    <TextArea 
                        title={i18n.comment}
                        value={comment}
                        onChange={setComment}
                    />
                </div>
            </div>
    )
}