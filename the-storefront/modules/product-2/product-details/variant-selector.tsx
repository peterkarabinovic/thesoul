'use client';

import { Product } from 'data/data-types';
import { useSelectedVariant } from '../state-sel-variant';

type Props = {
    product: Pick<Product, "variants">,
}

export function VariantSelector({ product }: Props){

    const [ selectedVariant, selectVariant ] = useSelectedVariant();

    const notSelectedClass = "text-primary px-[42px] h-[46px] leading-[44px] text-center flex justify-center items-center"
    // const notSelectedClass = "bg-primary text-white px-[42px] h-[46px] leading-[44px] text-center flex justify-center items-center"
    const selectedClass = "px-[42px] flex items-center  border border-primary text-primary font-medium"

    if(product.variants.length === 1)
        return (
            null
        );

    return (
        <div className='pb-4 gap-4 flex flex-wrap'>
            { product.variants.map( (v,i) => (
                i == selectedVariant 
                ? <div key={i} className={selectedClass}>{v.title}</div>
                : <button key={i} className={notSelectedClass} onClick={() => selectVariant(i)}>{v.title}</button>
            ))}
        </div>        
    )    

}