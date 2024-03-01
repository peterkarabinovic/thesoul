'use client'

import { useCartState, TCartStore } from '@cart/data';
import { CartDetails, CartEmpty } from '@cart/components';
import { CartTotals } from '@cart/components';
import { CheckoutSteps, CheckoutButtons } from './checkout-steps';
import { ChechoutStep, TChechoutStore, useChechoutState } from '../data';
import { SippingForm } from './shipping-form';

type CheckoutProps = {
  step: ChechoutStep
  useCheckout?: TChechoutStore;
  useCart?: TCartStore;
};

export function CheckoutPage({step, useCheckout = useChechoutState, useCart = useCartState }: CheckoutProps) {
  
  const cartEmpty = useCheckout((state) => state.cartEmpty);
  const canGoNext = useCheckout((state) => state.canGoNext);

  if (cartEmpty)
    return (
      <div className="page-container">
        <CartEmpty />
      </div>
    );

  return (
    <div className="page-container px-4">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-0 md:basis-2/3">
          <CheckoutSteps step={step} />
          {
            step === 'cart' && <CartDetails useCart={useCart}/>
          }
          {
            step === 'shipping' && <SippingForm useCheckout={useCheckout} />
          }
        
        </div>
        <div className="md:basis-1/3 md:pt-24">
          <CartTotals useCart={useCart} />
        </div>
      </div>
      <div className='mt-7 md:pr-7 md:w-2/3'>
        <CheckoutButtons step={step} canGoNext={canGoNext(step)} />
      </div>
    </div>
  );
}
