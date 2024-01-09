'use client';

import { Product } from 'lib/data/types';
import { useSelectedVariant } from 'lib/data';
import { formatPrice } from 'lib/medusa/helpers';

type Props = {
    product: Pick<Product, "variants">,
}

export function VariantPrice({ product }: Props) {

    const [ selectedVariant ] = useSelectedVariant();

    const variant = product.variants[selectedVariant];
    if( !variant )
        return null;

    return (
        <h1 className="text-3xl font-medium text-base-content">{formatPrice(variant.price)}</h1>
    )
}