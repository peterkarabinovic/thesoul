'use client';

import { Product } from 'data/data-types';
import { useSelectedVariant } from '../state-sel-variant';
import { formatPrice } from 'lib/formaters';

type Props = {
    product: Pick<Product, "variants">,
}

export function VariantPrice({ product }: Props) {

    const [ selectedVariant ] = useSelectedVariant();

    const variant = product.variants[selectedVariant];
    if( !variant )
        return null;

    return (
        <>
            {formatPrice(variant.price)}
        </>
    )
}