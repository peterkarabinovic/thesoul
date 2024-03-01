import Link from 'next/link';
import clsx from 'clsx';
import { i18n_cart, i18n_checkout, i18n_shipping, i18n_payment, i18_goto_payment } from 'i18n';
import { ChechoutStep } from '../data/state';


export function CheckoutSteps({ step }: { step: ChechoutStep}) {

    const stepIndex = ["cart", "shipping", "payment"].indexOf(step)
    const stepClasses = (position: number) => {
      return clsx("step text-neutral-500 text-sm", {
        "step-primary": stepIndex >= position,
        // "cursor-pointer": stepIndex > position
      })
    }
  
    return (
        <div className="w-full">
          <ul className="steps w-full mb-6">
            <li className={stepClasses(0)}>{i18n_cart}</li>
            <li className={stepClasses(1)}>{i18n_shipping}</li>
            <li className={stepClasses(2)}>{i18n_payment}</li>
          </ul>
        </div>
    );
}

export function CheckoutButtons({ step, canGoNext }: { step: ChechoutStep, canGoNext: boolean }) {
    return (
        <div className='w-full'>
            <div className='flex flex-row-reverse justify-between'>
                { step === 'cart' 
                    ? <Link className={clsx('btn btn-primary', !canGoNext ? "invisible" : "")} href="/checkout/shipping">{i18n_checkout} &#8594;</Link>
                    : step === 'shipping'
                        ? <Link className={clsx('btn btn-primary', !canGoNext ? "invisible" : "")} href="/checkout/payment">{i18_goto_payment} &#8594;</Link>
                        : null
                }
                {
                    step === 'shipping' ?
                        <Link className='btn ' href="/checkout/cart">&#8592; {i18n_cart}</Link>
                        : step === 'payment' ? 
                            <Link className='btn ' href="/checkout/shipping">&#8592; {i18n_shipping}</Link>
                            : null
                }
            </div>
        </div>
    )
}
