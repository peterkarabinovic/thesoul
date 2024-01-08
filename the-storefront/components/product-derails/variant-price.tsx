'use client';

import { Product } from 'lib/data/types';
import { TUseCartState, useCartState } from "lib/data"
import { formatPrice } from 'lib/medusa/helpers';

type Props = {
    product: Pick<Product, "variants">,
    useCart?: TUseCartState
}

export function VariantPrice({ product, useCart = useCartState}: Props) {

    const selectedVariant = useCart( state => state.selectedVariant );

    const variant = product.variants[selectedVariant];
    if( !variant )
        return null;

    return (
        <h1 className="text-3xl font-medium text-base-content">{formatPrice(variant.price)}</h1>
    )
}