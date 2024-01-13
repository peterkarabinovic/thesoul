import { cart, checkout, shipping, payment } from 'i18n';
import { TCartState, useCartState } from 'lib/data';
import { CartDetails } from "./cart-details"
import { CartTotals } from "./cart-totals"
import clsx from 'clsx';

type CheckoutProps = {
  useCart?: TCartState;
};

export function Checkout({ useCart = useCartState }: CheckoutProps) {

  const stepClasses = (step: number) => (curStep: string) => {
    const index = ["cart", "shipping", "payment"].indexOf(curStep);
    return clsx("step text-neutral-500 text-sm", index <= step ? "step-primary" : "" )
  }
    
  return (
    <div className="container mx-auto lg:max-w-6xl">

      <div className="flex flex-col md:flex-row gap-7">

        <div className="md:basis-2/3">
          <ul className="steps w-full mb-4">
            <li className="step step-primary text-neutral-500 text-sm">{cart}</li>
            <li className="step step-primary text-neutral-500 text-sm">{shipping}</li>
            <li className="step text-neutral-500 text-sm">{payment}</li>
          </ul>

          <CartDetails useCart={useCart} />
        </div>

        <div className="md:basis-1/3 md:pt-24">
            <CartTotals useCart={useCart} />
        </div>

      </div>

      <div className='flex flex-row-reverse justify-between mt-7 md:w-2/3'>
        <button className='btn btn-primary'>{checkout}</button>
      </div>

    </div>
  );
}
