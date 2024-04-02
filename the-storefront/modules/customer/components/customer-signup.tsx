'use client';

import { useState } from 'react';
import clsx from 'clsx';
import customerConf from "config-and-i18n/common.json"
import { useCustomerStore, readyToSend } from '../data/state';
import { InputField } from 'components/input';

import { i18nCustomer, i18nGeneral} from "config-and-i18n"
import { useI18n } from 'config-and-i18n/react';
import { PhoneInput } from 'components/phone-input';

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
  const [phone, setPhone] = useState(customer.phone);

  const i18n = {...useI18n(lang, i18nCustomer), ...useI18n(lang, i18nGeneral)};

  const isReadytoSend = readyToSend(customer, {
    firstName,
    lastName,
    phone,
    telegram
  });

  return (
    <div className="m-auto flex w-full flex-col gap-4">
      {globalError && <div className="text-xs text-blue-500">{globalError(i18n)}</div>}
      { userWithPhoneAlreadyExists && <div className="text-xs text-blue-500">
            {i18n.user_with_phone_already_exists}
            <a href="/login" className="text-blue-500 underline">{i18n.login}</a>
        </div>}
      <div className='flex flex-col md:flex-row gap-4'>
        <InputField
          type="text"
          title={i18n.first_name}
          value={firstName}
          placeholder={i18n.first_name}
          onChange={(s) => setFirstName(s)}
          disabled={processing}
          error={errors.firstName}
        />

        <InputField
          type="text"
          title={i18n.last_name}
          value={lastName}
          placeholder={i18n.last_name}
          onChange={(s) => setLastName(s)}
          disabled={processing}
          error={errors.lastName}
        />
        </div>
    
        <PhoneInput
            phoneCode={customerConf.phoneCode}
            onChange={p => setPhone(p)}
            disabled={processing}
            i18nPhone={i18n.phone}
            phone={customer.phone}
        />


      <InputField
        If={customerConf.needTelegram}
        type="text"
        title="Telegram"
        subtitle={i18n.optional}
        value={telegram}
        placeholder={i18n.username_telegram}
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
          <span className={clsx({ invisible: processing })}>{i18n.save_customer}</span>
          <span
            className={clsx('loading loading-ring loading-sm absolute', { invisible: !processing })}
          />
        </button>
      </div>
    </div>
  );
}
