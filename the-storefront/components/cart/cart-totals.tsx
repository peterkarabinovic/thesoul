import { totlal, total_cost, shipping_cost, shipping_not_calculated, price_for_quantity } from 'i18n';
import { TCartState } from "lib/data"
import { formatPrice } from 'lib/medusa/helpers';

type CartTotalsProps = {
    useCart: TCartState;
};

export function CartTotals({ useCart }: CartTotalsProps) {
  const cart = useCart(state => state.cart);
  const processing = useCart( state => state.processedVariants.length > 0 );  

  if (!cart || cart.lines.length === 0) return null;

  const {
    totalQuantity,
    cost: { shippingAmount, totalAmount, subtotalAmount }
  } = cart;

//   const taxExists = parseInt(totalTaxAmount.amount) > 0;

  return (
    <div className="w-full bg-base-200 p-4 rounded-xl">
      <h1 className="text-lg font-medium text-base-content sm:text-2xl">{totlal}</h1>
      <div className="pt-4 text-neutral-500 text-sm">
        <div className="flex items-center justify-between">
          <span>{price_for_quantity.replace('{quantity}', String(totalQuantity))}</span>
          { processing 
            ? <span className="loading loading-ring loading-sm" />
            : <span className="text-right">{formatPrice(subtotalAmount)}</span>
          }
        </div>
      </div>
      <div className="pt-4 text-neutral-500  text-sm">
        <div className="flex items-center justify-between">
          <span>{shipping_cost}</span>
          <span className="max-w-24 text-right">{shippingAmount ? formatPrice(shippingAmount) : shipping_not_calculated }</span>
        </div>
      </div>
      <div className="pt-4 mt-4 text-neutral-500 text-sm border-t-2 border-base-300">
        <div className="flex items-center justify-between">
          <span>{total_cost}</span>
          { processing 
          ? <span className="loading loading-ring loading-md" />
          : <span className="max-w-24 text-right text-lg font-medium text-base-content sm:text-2xl">{formatPrice(totalAmount)}</span>
         }
        </div>
      </div>
    </div>
  );
}