'use client';

import { i18n_add_to_cart } from 'i18n';
import { Product } from 'data/types';
import { TCartStore, useCartState } from "../data"
import { useSelectedVariant } from '../../products/data/state-sel-variant';

type AddToCartBtnProps = {
  product: Pick<Product, "variants">,
  useCart?: TCartStore;
};

export function AddToCartBtn({ product, useCart = useCartState }: AddToCartBtnProps) {

  const [selectedVariant] = useSelectedVariant();  
  const { id: variantId } = product.variants[selectedVariant] || { id: '0' };
  const loading = useCart( state => state.processedVariants.includes(variantId) );
  const qt = useCart( state => state.variantQuantity(variantId) );  
  const addItem = useCart( state => state.addItem );
  const updateItem = useCart( state => state.updateItem );

  if (qt === 0 || loading )
    return (
        <button className="btn btn-neutral-content w-full max-w-72 rounded-xl" onClick={() => !loading && addItem(variantId, 1) }>
          { loading ? <span className="loading loading-ring loading-md" /> : i18n_add_to_cart }
        </button>
    );

  return (
    <div className="flex w-full max-w-72 items-center justify-between rounded-xl bg-neutral-content">
      <button className="btn btn-neutral-content rounded-xl" onClick={() => updateItem(variantId, qt - 1)}>
        -
      </button>
      <button className="btn btn-ghost min-w-44 text-md" onClick={() => addItem(variantId, 1)}>
      {qt}
      </button>
      <button className="btn btn-neutral-content rounded-xl" onClick={() => addItem(variantId, 1)}>
      +
      </button>
    </div>
  );
}
