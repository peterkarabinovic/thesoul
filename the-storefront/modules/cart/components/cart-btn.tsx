'use client'

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartState, TCartStore } from "../data"

export function CartBtn( {useCart = useCartState}: { useCart?: TCartStore } ) {

    const totalQuantity = useCart( state => state.cart?.totalQuantity || 0 );
    // if(totalQuantity === 0)
    //     return null;

// Tailwind Related Stuff
    const badge =
        'bg-primary text-white text-[12px] text-center absolute bottom-[15px] right-[-10px] h-[-10px] leading-[20px] rounded-[20px] px-[6px] transition-all group-hover:text-white';

    return (
        <div className="relative group">
            <ShoppingCartIcon className="w-6 h-6" />
            { totalQuantity !== 0 && <span className={badge}>{totalQuantity}</span> }
      </div>
    )
}