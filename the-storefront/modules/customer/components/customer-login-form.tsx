'use client';

import { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { usePhoneInput } from 'react-international-phone';
import clsx from 'clsx';
import { customerConf } from "config-data/customer"
import {
  i18n_phone,
  i18n_otp_sent,
  i18n_send_otp,
  i18n_resend_otp
} from 'i18n';
import { useCustomerStore } from '../data/state';

export function CustomerLoginForm() {

  const [otpCode, setOtpCode] = useState<string | undefined>(undefined); //
  const globalError = useCustomerStore((state) => state.globalError);
  const processing = useCustomerStore((state) => state.processing);
  const otp = useCustomerStore((state) => state.otp);
  const confirmOtp = useCustomerStore((state) => state.confirmOtp);
  const logIn = useCustomerStore((state) => state.logIn);
  const {mins, secs} = useCoundown(otp?.sentAt);

  const { inputValue, phone, handlePhoneValueChange } = usePhoneInput({
    defaultCountry: 'ua',
    disableCountryGuess: true,
    disableDialCodeAndPrefix: true,
    forceDialCode: true
  });

  const isPhoneValid = phone.length > 12;
  const countdownInProgress = secs > 0 || mins > 0;

  const handleOtpChange = (v:string) => {
    if(isNaN(Number(v))) 
        return
    if(v.length === 4 && v !== otpCode) {
        confirmOtp(v)
    }
    setOtpCode(v);
  }

  const handleReSendOtp = () => {
    if(!isPhoneValid || countdownInProgress)
        return;
    logIn(phone);
    setOtpCode(undefined);
  }

  return (
    <div className="m-auto flex w-full flex-col gap-4">
      {/* <h1 className="text-center text-xl font-bold">{i18n_login}</h1> */}
      {globalError && <div className="text-xs text-error">{globalError}</div>}
      <div className='flex flex-col w-full gap-[5px]'>
        <label className={'my-label'}>{i18n_phone}</label>
        <div className="flex flex-row">
          <div
            className={clsx('my-phone-code text-center', customerConf.phoneCode == "+30" ? "w-14" : "w-16" )}
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

      <button
        className="my-primary-button float-right"
        disabled={!isPhoneValid || countdownInProgress}
        onClick={handleReSendOtp}
      >
        {otp ? i18n_resend_otp : i18n_send_otp}
      </button>

      {otp && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-info">{i18n_otp_sent.replace('{phone}', otp.phoneSentTo)}</p>

          <div className="text-right">
            {processing 
                ? <div className="float-right animate-pulse h-6 w-10 bg-gray-300 rounded-md"></div>
                : <span className="font-mono text-sm text-secondary">
                    <span>{mins}</span>:<span>{String(secs).padStart(2, '0')}</span>
                  </span>
            }
          </div>

        <OtpInput
            value={otpCode}
            onChange={ v => handleOtpChange(v) }
            numInputs={4}
            renderInput={(props) => processing ? <div className='skeleton h-12 w-12'></div>  : <input {...props}/>}
            containerStyle="flex justify-center gap-2"
            inputStyle="text-center text-2xl border border-primary text-primary h-12 w-12 "
            skipDefaultStyles={true}
        />
        </div>
      )}
    </div>
  );
}

function useCoundown(sentAt?: number) {
  const [secLeft, setLeftSec] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!sentAt) {
        setLeftSec(0);
        return;
      }
      const seconds = 5 * 60 - Math.round((Date.now() - sentAt) / 1000);
      if (seconds < 0) {
        setLeftSec(0);
      } else setLeftSec(seconds);
    }, 1000);
    return () => clearInterval(interval);
  }, [sentAt]);

  return {
    mins: Math.floor(secLeft / 60),
    secs: secLeft % 60
  };
}
