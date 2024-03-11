import { i18n_totlal, i18n_total_cost, i18n_shipping_cost, i18n_shipping_not_calculated, i18n_price_for_quantity } from 'i18n';
import { formatPrice } from 'lib/formaters';
import { cartConf } from "config-data/cart"
import { TCartStore, useCartState } from "../data"

type CartTotalsProps = {
    useCart?: TCartStore;
};

export function CartTotals({ useCart = useCartState }: CartTotalsProps) {
  const cart = useCart(state => state.cart);
  const processing = useCart( state => state.processedVariants.length > 0 );  

  if (!cart || cart.lines.length === 0) return null;

  const {
    totalQuantity,
    cost: { shippingAmount, totalAmount, subtotalAmount }
  } = cart;

//   const taxExists = parseInt(totalTaxAmount.amount) > 0;

  return (
    <div className="cart-subtotal max-w-[400px] md:ml-auto m-auto">
        <div className="border border-[#bfbfbf] bg-[#f9f9f9] px-7">
            <div className="content py-7">
                <h2 className="text-lg font-medium text-base-content sm:text-lg">{i18n_totlal}</h2>
                <div className="pt-4 text-neutral-500 text-sm">
                    <div className="flex items-center justify-between">
                    <span>{i18n_price_for_quantity.replace('{quantity}', String(totalQuantity))}</span>
                    { processing 
                        ? <span className="loading loading-ring loading-sm" />
                        : <span className="text-right">{formatPrice(subtotalAmount)}</span>
                    }
                    </div>
                </div>
                { !cartConf.noShipmentCost && 
                    <div className="pt-4 text-neutral-500  text-sm">
                        <div className="flex items-center justify-between">
                        <span>{i18n_shipping_cost}</span>
                        <span className="max-w-24 text-right">{shippingAmount ? formatPrice(shippingAmount) : i18n_shipping_not_calculated }</span>
                        </div>
                    </div>
                }
                <div className="pt-4 mt-4 text-neutral-500 text-sm border-t border-[#bfbfbf]">
                    <div className="flex items-center justify-between">
                    <span>{i18n_total_cost}</span>
                    { processing 
                    ? <span className="loading loading-ring loading-md" />
                    : <span className="max-w-24 text-right text-lg font-medium text-base-content ">{formatPrice(totalAmount)}</span>
                    }
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
}
