'use client';

import { Product } from 'lib/data/types';
import { TUseCartState, useCartState } from "lib/data"

type Props = {
    product: Pick<Product, "variants">,
    useCart?: TUseCartState
}

export function VariantSelector({ product, useCart = useCartState}: Props){

    const selectVariant = useCart( state => state.selectVariant );
    const selectedVariant = useCart( state => state.selectedVariant );

    if(product.variants.length === 1)
        return null;

    return (
        <div className='pb-4 gap-4 grid grid-cols-3 border-primary border-b-2'>
            { product.variants.map( (v,i) => (
                i == selectedVariant 
                ? <div key={i} className="flex items-center justify-center bg-primary text-base-content rounded-lg">{v.title}</div>
                : <button key={i} className="btn btn-outline btn-primary" onClick={() => selectVariant(i)}>{v.title}</button>
            ))}
        </div>        
    )    

}