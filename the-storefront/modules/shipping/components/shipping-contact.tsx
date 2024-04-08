"use client"
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { i18nCustomer, i18nShipping } from "config-and-i18n";
import { useI18n } from "config-and-i18n/react";
import { TShippingStore } from "../data/state"
import { InputField, CheckboxInput } from "components";
import { PhoneInput } from "components/phone-input";

import customerConf from "config-and-i18n/common.json"

type Props = {
    If: boolean
    shippingStore: TShippingStore;
    lang: string;
}

export function ShippingContact({ If, lang, shippingStore  }: Props ){
    const processing = shippingStore.useShipping( state => state.processing );
    const customerFirstName = shippingStore.useShipping( state => state.customerFirstName );
    const customerLastName = shippingStore.useShipping( state => state.customerLastName );
    const customerPhone = shippingStore.useShipping( state => state.customerPhone );
    const anotherFirstName = shippingStore.useShipping( state => state.anotherFirstName );
    const anotherLastName = shippingStore.useShipping( state => state.anotherLastName );
    const anotherPhone = shippingStore.useShipping( state => state.anotherPhone );
    const useAnother = shippingStore.useShipping( state => state.useAnotherContact );
    const setUseAnotherContact = shippingStore.useShipping( state => state.setUseAnotherContact );
    const setAnother = shippingStore.useShipping( state => state.setAnotherContact );

    const firstName = useAnother ? anotherFirstName : customerFirstName;
    const lastName = useAnother ? anotherLastName : customerLastName;
    const phone = useAnother ? anotherPhone : customerPhone;

    const i18n = {...useI18n(lang, i18nShipping), ...useI18n(lang, i18nCustomer)};
    const setContact = ({phone=anotherPhone, fName=anotherFirstName, lName=anotherLastName }={}) => {
        useAnother &&  setAnother(fName, lName, phone);
    }

    if(!If)
        return (null);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="my-form-section-title">
                <CheckCircleIcon className='icon' />
                    <h2>{i18n.recipient}</h2>
            </div>            
            <div className="px-4 sm:px-6 w-full flex flex-col gap-4">
                <div className='flex flex-col md:flex-row gap-4'>
                    <InputField
                        type="text"
                        title={i18n.first_name}
                        value={firstName}
                        placeholder={i18n.first_name}
                        onChange={(s) => setContact({fName:s})}
                        disabled={processing || !useAnother}
                    />

                    <InputField
                        type="text"
                        title={i18n.last_name}
                        value={lastName}
                        placeholder={i18n.last_name}
                        onChange={(s) =>  setContact({lName:s}) }
                        disabled={processing || !useAnother}
                    />
                </div>
                <PhoneInput
                    phone={phone}
                    onChange={(s) => setContact({phone:s}) }
                    i18nPhone={i18n.phone}
                    phoneCode={customerConf.phoneCode}
                    disabled={processing || !useAnother}
                />

                <CheckboxInput
                    title={i18n.use_another_recipient}
                    checked={useAnother}
                    onChange={checked => setUseAnotherContact(checked)}
                />
            </div>
        </div>
    )
}