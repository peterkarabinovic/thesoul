import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartState, TCartState } from "lib/data/state-cart"

export function CartBtn( {useCart = useCartState}: { useCart: TCartState } ) {

    const cart = useCart( state => state.cart );
    if(!cart || cart.lines.length === 0)
        return null;

    cart.totalQuantity

    return (
        <div className="indicator">
            <ShoppingCartIcon className=" text-neutral-500 w-6 h-6" />
            <span className="badge badge-sm indicator-item">{cart.totalQuantity}</span>
      </div>
    )
}