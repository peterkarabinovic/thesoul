import Link from 'next/link';
import { i18n_cart, i18n_checkout, i18n_shipping, i18n_payment, i18_goto_payment } from 'i18n';
import { TStore, TCartState, useCartState } from 'lib/data';
import { CartTotals } from "./cart/cart-totals"
import clsx from 'clsx';

type CheckoutProps = {
  children: React.ReactNode;
  step: TStore["checkout"]["step"];
  canGoNext: boolean;
  useCart?: TCartState;
};

export function Checkout({ children, step, canGoNext, useCart = useCartState }: CheckoutProps) {

  const stepIndex = ["cart", "shipping", "payment"].indexOf(step)

  const stepClasses = (position: number) => {
    return clsx("step text-neutral-500 text-sm", stepIndex >= position ? "step-primary" : "" )
  }
    
  return (
    <div className="container mx-auto lg:max-w-6xl">
      <div className="flex flex-col md:flex-row gap-7">

        <div className="md:basis-2/3">
          <ul className="steps w-full mb-4">
            <li className={stepClasses(0)}>{i18n_cart}</li>
            <li className={stepClasses(1)}>{i18n_shipping}</li>
            <li className={stepClasses(2)}>{i18n_payment}</li>
          </ul>

          {children}
        </div>

        <div className="md:basis-1/3 md:pt-24">
            <CartTotals useCart={useCart} />
        </div>

      </div>

      <div className='flex flex-row-reverse justify-between mt-7 md:pr-7 md:w-2/3'>
        { step === 'cart' 
            ? <Link className={clsx('btn btn-primary', !canGoNext ? "btn-disabled" : "")} href="/shipping">{i18n_checkout}</Link>
            : step === 'shipping'
                ? <Link className={clsx('btn btn-primary', !canGoNext ? "btn-disabled" : "")} href="/payment">{i18_goto_payment}</Link>
                : null
        }
        
      </div>

    </div>
  );
}
