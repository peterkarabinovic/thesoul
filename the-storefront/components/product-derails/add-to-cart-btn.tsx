'use client';

import { add_to_cart } from 'i18n';
import { Product } from 'lib/data/types';
import { TCartState, useCartState } from "lib/data"
import { useSelectedVariant } from 'lib/data';

type AddToCartBtnProps = {
  product: Pick<Product, "variants">,
  useCart?: TCartState;
};

export function AddToCartBtn({ product, useCart = useCartState }: AddToCartBtnProps) {

  const [selectedVariant] = useSelectedVariant();  
  const { id: variantId } = product.variants[selectedVariant] || { id: '0' };
  const loading = useCart( state => state.processedVariants.includes(variantId) );
  const count = useCart( state => state.variantQuantity(variantId) );  
  const addItem = useCart( state => state.addItem );
  const removeItem = useCart( state => state.removeItem );

  if (count === 0 || loading )
    return (
        <button className="btn btn-secondary w-full rounded-xl" onClick={() => !loading && addItem(variantId, 1) }>
          { loading ? <span className="loading loading-ring loading-md" /> : add_to_cart }
        </button>
    );

  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-secondary">
      <button className="btn btn-secondary rounded-xl" onClick={() => removeItem(variantId)}>
        -
      </button>
      <span className="rounded-xl bg-secondary px-2">{count}</span>
      <button className="btn btn-secondary rounded-xl" onClick={() => addItem(variantId, 1)}>
        +
      </button>
    </div>
  );
}
