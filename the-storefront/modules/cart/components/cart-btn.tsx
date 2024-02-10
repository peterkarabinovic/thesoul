'use client'

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartState, TCartStore } from "../data"

export function CartBtn( {useCart = useCartState}: { useCart?: TCartStore } ) {

    const totalQuantity = useCart( state => state.cart?.totalQuantity || 0 );
    if(totalQuantity === 0)
        return null;


    return (
        <div className="indicator align-bottom">
            <ShoppingCartIcon className=" text-neutral-500 w-6 h-6" />
            <span className="badge badge-sm indicator-item">{totalQuantity}</span>
      </div>
    )
}