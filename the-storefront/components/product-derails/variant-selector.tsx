'use client';

import { useSelectedVariant } from 'lib/data';
import { Product } from 'lib/data/types';

type Props = {
    product: Pick<Product, "variants">,
}

export function VariantSelector({ product }: Props){

    const [ selectedVariant, selectVariant ] = useSelectedVariant();

    if(product.variants.length === 1)
        return (
            <div className='pb-4 gap-4 flex border-primary border-b-2 flex-wrap'/>
        );

    return (
        <div className='pb-4 gap-4 flex border-primary border-b-2 flex-wrap'>
            { product.variants.map( (v,i) => (
                i == selectedVariant 
                ? <div key={i} className="px-4 flex items-center  bg-primary text-neutral-content rounded-lg font-medium">{v.title}</div>
                : <button key={i} className="btn btn-outline btn-primary" onClick={() => selectVariant(i)}>{v.title}</button>
            ))}
        </div>        
    )    

}