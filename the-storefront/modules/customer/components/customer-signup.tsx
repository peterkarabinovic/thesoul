'use client';

import { useState } from 'react';
import { usePhoneInput } from 'react-international-phone';
import clsx from 'clsx';
import { customerConf } from "config-data/customer"
import { useCustomerStore, readyToSend } from '../data/state';
import { InputField } from 'components/input';

import { i18nCustomer, i18nGeneral} from "config-and-i18n"
import { useI18n } from 'config-and-i18n/react';

type Props = {
    lang: string
}

export function CustomerSingUp( {lang}: Props  ) {
  const customer = useCustomerStore((state) => state.customer);
  const processing = useCustomerStore((state) => state.processing);
  const errors = useCustomerStore((state) => state.fieldErrors);
  const globalError = useCustomerStore((state) => state.globalError);
  const userWithPhoneAlreadyExists = useCustomerStore((state) => state.userWithPhoneAlreadyExists);
  const singUp = useCustomerStore((state) => state.sendToServer);

  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [telegram, setTelegram] = useState(customer.telegram);

  const i18n_customer = useI18n(lang, i18nCustomer);
  const i18n_general = useI18n(lang, i18nGeneral);


  const { inputValue, phone, handlePhoneValueChange } = usePhoneInput({
    defaultCountry: 'ua',
    disableCountryGuess: true,
    disableDialCodeAndPrefix: true,
    forceDialCode: true,
    value: customer.phone
  });

  const isReadytoSend = readyToSend(customer, {
    firstName,
    lastName,
    phone,
    telegram
  });

  return (
    <div className="m-auto flex w-full flex-col gap-4">
      {globalError && <div className="text-xs text-blue-500">{globalError(i18n_general)}</div>}
      { userWithPhoneAlreadyExists && <div className="text-xs text-blue-500">
            {i18n_customer.user_with_phone_already_exists}
            <a href="/login" className="text-blue-500 underline">{i18n_customer.login}</a>
        </div>}
      <div className='flex flex-col md:flex-row gap-4'>
        <InputField
          type="text"
          title={i18n_customer.first_name}
          value={firstName}
          placeholder={i18n_customer.first_name}
          onChange={(s) => setFirstName(s)}
          disabled={processing}
          error={errors.firstName}
        />

        <InputField
          type="text"
          title={i18n_customer.last_name}
          value={lastName}
          placeholder={i18n_customer.last_name}
          onChange={(s) => setLastName(s)}
          disabled={processing}
          error={errors.lastName}
        />
        </div>
        <div>
            <div className='flex flex-col w-full gap-[5px] mb-4'>
                <label className='my-label'>{i18n_customer.phone}</label>
                <div className="flex flex-row w-full">
                    <div
                        className={clsx('my-phone-code  text-center', customerConf.phoneCode == "+30" ? "w-14" : "w-16" )}
                    >
                        {customerConf.phoneCode}
                    </div>
                    <input
                        type="tel"
                        placeholder="(95) 999-99-99"
                        className={'my-input'}
                        value={inputValue}
                        onChange={handlePhoneValueChange}
                        disabled={processing}
                    />
                    </div>
            </div>
      </div>

      <InputField
        If={customerConf.needTelegram}
        type="text"
        title="Telegram"
        subtitle={i18n_general.optional}
        value={telegram}
        placeholder={i18n_customer.username_telegram}
        onChange={(s) => setTelegram(s)}
        disabled={processing}
        error={errors.telegram}
      />

      <div className="mt-4">
        <button
          className={clsx('reletive float-right my-primary-button')}
          onClick={() => singUp({ firstName, lastName, phone, telegram })}
          disabled={!isReadytoSend}
        >
          <span className={clsx({ invisible: processing })}>{i18n_customer.save_customer}</span>
          <span
            className={clsx('loading loading-ring loading-sm absolute', { invisible: !processing })}
          />
        </button>
      </div>
    </div>
  );
}
