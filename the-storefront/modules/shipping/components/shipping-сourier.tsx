"use client"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { TCourierShippingStore } from "../data/state"
import { InputField } from "components/input"
import { I18nProvider, i18nShipping } from "config-and-i18n"

type Props = {
    courierShippingStore: TCourierShippingStore
    lang: string
}

export function ShippingCourier( { lang, courierShippingStore }: Props ){

    const address = courierShippingStore(s => s.address);
    const setAdress = courierShippingStore(s => s.setAdress);
    const receintAddresses = courierShippingStore(s => s.receintAddresses);
    const desirableTime = courierShippingStore(s => s.desirableTime);
    const setDesirableTime = courierShippingStore(s => s.setDesirableTime);
    const comment = courierShippingStore(s => s.comment);

    return (
        <I18nProvider lang={lang} func={i18nShipping}>
            {(i18n) => (
                <div className="w-full flex flex-col gap-4">
                    <div className="my-form-section-title">
                        <CheckCircleIcon className='icon' />
                        <h2>{i18n.courier_shipping}</h2>
                    </div>
                    <div className="flex flex-col gap-2 px-4 sm:gap-1">

                        <InputField
                            type="text"
                            title={i18n.address}
                            value={address}
                            onChange={setAdress}
                        />

                    </div>
                </div>
            )}
        </I18nProvider>
    )
}