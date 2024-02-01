'use client';

import { useState } from 'react';
import { usePhoneInput } from 'react-international-phone';
import {
  i18n_first_name,
  i18n_last_name,
  i18n_phone,
  i18n_optional,
  i18n_save_customer,
  i18n_username_telegram
} from 'i18n';
import { useCustomerStore, readyToSend } from '../data/state';
import { InputField } from 'components/input';
import clsx from 'clsx';

export const classes = {
  input: 'input input-sm input-bordered sm:input-md w-full focus:border-none',
  label: 'label text-neutral block text-sm sm:text-base'
};

export function CustomerForm() {
  const customer = useCustomerStore((state) => state.customer);
  const processing = useCustomerStore((state) => state.processing);
  const errors = useCustomerStore((state) => state.customerErrors);
  const globalError = useCustomerStore((state) => state.globalError);
  const sendToServer = useCustomerStore((state) => state.sendToServer);

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

  const isReadytoSend = !readyToSend(customer, {
    firstName,
    lastName,
    phone,
    telegram
  });

  return (
    <div className="m-auto flex w-full max-w-72 flex-col gap-2">
      {globalError && <div className="text-xs text-error">{globalError}</div>}

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

      <div>
        <label className={classes.label}>{i18n_phone}</label>
        <div className="join w-full">
          <input
            type="text"
            className={classes.input + ' join-item max-w-16 sm:max-w-20'}
            disabled
            value="+380"
          />
          <input
            type="tel"
            placeholder="(95) 999-99-99"
            className={classes.input + ' join-item'}
            value={inputValue}
            onChange={handlePhoneValueChange}
            disabled={processing}
          />
        </div>
      </div>

      <InputField
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
          className={clsx('reletive btn float-right', { 'btn-primary': !processing })}
          onClick={() => sendToServer({ firstName, lastName, phone, telegram })}
          disabled={isReadytoSend}
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
