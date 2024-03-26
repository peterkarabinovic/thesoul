'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Product } from 'data/data-types';
import { useClientOnly } from 'lib/react-utils';
import { TCartStore, useCartState } from "../data"
import { useSelectedVariant } from 'modules/product-2/state-sel-variant';

type AddToCartBtnProps = {
  product: Pick<Product, "variants">,
  useCart?: TCartStore;
  i18n_add_to_cart: string;
};

export function AddToCartBtn({ product, i18n_add_to_cart, useCart = useCartState }: AddToCartBtnProps) {
  const isClient = useClientOnly();  
  const [selectedVariant] = useSelectedVariant();  
  const { id: variantId } = product.variants[selectedVariant] || { id: '0' };
  const loading = useCart( state => state.processedVariants.includes(variantId) );
  const qt = useCart( state => state.variantQuantity(variantId) );  
  const addItem = useCart( state => state.addItem );
  const updateItem = useCart( state => state.updateItem );

  const clazz = `bg-secondary text-white px-[42px] h-[46px] leading-[44px] text-center flex justify-center items-center`;
  const minPlusClazz = 'border border-secondary text-secondary text-center hover:bg-secondary hover:text-white leading-[38px] text-xl h-[46px]'


  if(!isClient)
    return (null);

  if (qt === 0 )
    return (
        <button 
            type='button'
            className={`${clazz} min-w-[208px]`} onClick={() => !loading && addItem(variantId, 1) }
        >
          { loading ? <ArrowPathIcon className='h-4 w-4 animate-spin text-white' /> : i18n_add_to_cart }
        </button>
    );

  return (
    <div className="flex max-w- items-center">
      <button className={`${minPlusClazz} w-[46px]`} onClick={() => updateItem(variantId, qt - 1)}>
        —
      </button>
      <button 
        className={`${clazz} w-[116px]`} 
        onClick={() => addItem(variantId, 1)}
      >
        { loading ? <ArrowPathIcon className='h-4 w-4 animate-spin text-white' /> : qt }
      </button>
      <button className={`${minPlusClazz} w-[46px]`} onClick={() => addItem(variantId, 1)}>
      +
      </button>
    </div>
  );
}
