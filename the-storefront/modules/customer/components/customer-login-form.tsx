'use client';

import { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { usePhoneInput } from 'react-international-phone';
import {
  i18n_login,
  i18n_phone,
  i18n_otp_sent,
  i18n_send_otp,
  i18n_resend_otp
} from 'i18n';
import { useCustomerStore } from '../data/state';
import { classes } from './customer-form';

export function CustomerLoginForm() {

  const [otpCode, setOtpCode] = useState<string | undefined>(undefined); //
  const globalError = useCustomerStore((state) => state.globalError);
  const processing = useCustomerStore((state) => state.processing);
  const otp = useCustomerStore((state) => state.otp);
  const confirmOtp = useCustomerStore((state) => state.confirmOtp);
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

  return (
    <div className="m-auto flex w-full max-w-72 flex-col gap-4">
      {/* <h1 className="text-center text-xl font-bold">{i18n_login}</h1> */}
      {globalError && <div className="text-xs text-error">{globalError}</div>}
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

      <button
        className="btn btn-primary float-right"
        disabled={!isPhoneValid || countdownInProgress}
      >
        {otp ? i18n_resend_otp : i18n_send_otp}
      </button>

      {otp && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-info">{i18n_otp_sent.replace('{phone}', otp.phoneSentTo)}</p>

          <div className="text-right">
            {processing 
                ? <div className="float-right skeleton h-6 w-10"></div>
                : <span className="countdown font-mono text-sm text-info">
                    <span style={{ '--value': mins } as any }></span>:<span style={{ '--value': secs } as any  }></span>
                  </span>
            }
          </div>

        <OtpInput
            value={otpCode}
            onChange={ v => handleOtpChange(v) }
            numInputs={4}
            renderInput={(props) => processing ? <div className='skeleton h-12 w-12'></div>  : <input {...props}/>}
            containerStyle="flex justify-center gap-2"
            inputStyle="text-center text-2xl border border-neutral-300 text-neutral-500 rounded-sm h-12 w-12 "
            skipDefaultStyles={true}
        />
        </div>
      )}
    </div>
  );
}

function useCoundown(otpSentAt?: number) {
  const [secLeft, setLeftSec] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!otpSentAt) {
        setLeftSec(0);
        return;
      }
      const seconds = 5 * 60 - Math.round((Date.now() - otpSentAt) / 1000);
      if (seconds < 0) {
        setLeftSec(0);
      } else setLeftSec(seconds);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpSentAt]);

  return {
    mins: Math.floor(secLeft / 60),
    secs: secLeft % 60
  };
}
