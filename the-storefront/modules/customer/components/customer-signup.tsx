'use client';

import { useState } from 'react';
import { usePhoneInput } from 'react-international-phone';
import clsx from 'clsx';
import {
  i18n_first_name,
  i18n_last_name,
  i18n_phone,
  i18n_optional,
  i18n_save_customer,
  i18n_username_telegram,
  i18n_login,
  i18n_user_with_phone_already_exists
} from 'i18n';
import { customerConf } from "config-data/customer"
import { useCustomerStore, readyToSend } from '../data/state';
import { InputField } from 'components/input';

export function CustomerSingUp() {
  const customer = useCustomerStore((state) => state.customer);
  const processing = useCustomerStore((state) => state.processing);
  const errors = useCustomerStore((state) => state.fieldErrors);
  const globalError = useCustomerStore((state) => state.globalError);
  const userWithPhoneAlreadyExists = useCustomerStore((state) => state.userWithPhoneAlreadyExists);
  const singUp = useCustomerStore((state) => state.sendToServer);

  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [telegram, setTelegram] = useState(customer.telegram);

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
      {globalError && <div className="text-xs text-blue-500">{globalError}</div>}
      { userWithPhoneAlreadyExists && <div className="text-xs text-blue-500">
            {i18n_user_with_phone_already_exists}
            <a href="/login" className="text-blue-500 underline">{i18n_login}</a>
        </div>}
      <div className='flex flex-col md:flex-row gap-4'>
        <InputField
          type="text"
          title={i18n_first_name}
          value={firstName}
          placeholder={i18n_first_name}
          onChange={(s) => setFirstName(s)}
          disabled={processing}
          error={errors.firstName}
        />

        <InputField
          type="text"
          title={i18n_last_name}
          value={lastName}
          placeholder={i18n_last_name}
          onChange={(s) => setLastName(s)}
          disabled={processing}
          error={errors.lastName}
        />
        </div>
        <div>
            <div className='flex flex-col w-full gap-[5px] mb-4'>
                <label className='my-label'>{i18n_phone}</label>
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
        subtitle={i18n_optional}
        value={telegram}
        placeholder={i18n_username_telegram}
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
          <span className={clsx({ invisible: processing })}>{i18n_save_customer}</span>
          <span
            className={clsx('loading loading-ring loading-sm absolute', { invisible: !processing })}
          />
        </button>
      </div>
    </div>
  );
}
