'use client';
import {  i18n_nv_shipping_to_warehouse, i18n_nv_shipping_to_door} from "i18n"
import { useEffect } from 'react';
import { TChechoutStore, useChechoutState } from '../data';
import { CustomerSignUpOrSignIn } from '@customer/components/customer-signup-or-signin';
import { NovaposhtaShippingForm } from './nv-shipping-form';

type ShippingFormProps = {
  useCheckout?: TChechoutStore;
};

const SHIPPING_NAMES: Record<string,string> = {
    "shipping-to-warehouse": i18n_nv_shipping_to_warehouse, 
    "shipping-to-door": i18n_nv_shipping_to_door    
}

export function SippingForm({ useCheckout = useChechoutState }: ShippingFormProps) {
  const logedIn = useCheckout((state) => state.logedIn);
  const shippingOptions = useCheckout((state) => state.shippingOptions);
  const selectedOption = useCheckout((state) => state.selectedOption);
  const selectOption = useCheckout((state) => state.selectOption);

  useEffect(() => {
    useCheckout.getState().loadShippingOptions();
  },[useCheckout]);

  if (!logedIn)
    return (
      <div className="w-full">
        <CustomerSignUpOrSignIn />
      </div>
    );

  return (
    <div className="flex w-full flex-col gap-4">
      {shippingOptions.length > 1 && (
        <div>
          {shippingOptions.map((opt) => (
            <label key={opt.id} className="label cursor-pointer justify-start">
              <input type="radio" className="radio"
                checked={opt.id == selectedOption?.id}
                onChange={() => selectOption(opt)}
              />
              <span className="label-text ml-4 text-neutral block text-sm">{SHIPPING_NAMES[opt.id]}</span>
            </label>
          ))}
        </div>
      )}
      <div>
        <NovaposhtaShippingForm/>
      </div>
    </div>
  );
}
