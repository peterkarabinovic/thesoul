import { create, StateCreator, UseBoundStore, StoreApi } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { AsyncResult, pipe } from '../result';
import { Cart } from './types';
import * as R from './requests';

export type TStore = {
    cart: Cart | null;
    cartId: string | null;
    processedVariants: string[];
    addItem: (variant_id: string, quantity: number) => Promise<void>;
    removeItem: (variant_id: string) => Promise<void>;
    deleteVariant: (variant_id: string) => Promise<void>;
    variantQuantity: (variant_id: string) => number;
}

// I've extracted and exported state logic as CartStateLogic
// so it can be extented in storybook
// in general you don't need to use StateCreator type but config zustand like this:
//
//      export const useCartState = create(
//              persist<TStore>(
//                  (set, get) => ({....})
//              ))
//
export type TCartState = UseBoundStore<StoreApi<TStore>>;

export const CartStateLogic: StateCreator<TStore> = (set, get) => ({

    cart: null,
    cartId: null,
    processedVariants: [],

    addItem: async (variant_id, quantity) => {
        const { cart, processedVariants } = get();
        if (processedVariants.includes(variant_id))
            return;
        set(() => ({ processedVariants: [...processedVariants, variant_id] }));
        pipe(
            cart === null ? R.createCart() : AsyncResult.of(cart),
            AsyncResult.tap(({ id }) => set(() => ({ cartId: id }))),
            AsyncResult.chain(({ id }) => R.addItem(id, variant_id, quantity)),
            AsyncResult.tap(cart => set({ cart })),
            AsyncResult.tapError((error) => console.error('adding item', error)),
            AsyncResult.then(() => set(() => ({ processedVariants: processedVariants.filter((id) => id !== variant_id) })))
        );
    },

    removeItem: async (variant_id) => {
        const { cart, processedVariants } = get();
        if (cart === null || processedVariants.includes(variant_id))
            return;
        const item = cart.lines?.find((item) => item.variant_id === variant_id);
        if (item == null)
            return;
        set(() => ({ processedVariants: [...processedVariants, variant_id] }));
        pipe(
            R.updateItem(cart.id, item.id, item.quantity - 1),
            AsyncResult.tap(cart => set({ cart })),
            AsyncResult.tapError((error) => console.error('removing variant', error)),
            AsyncResult.then(() => set(() => ({ processedVariants: processedVariants.filter((id) => id !== variant_id) })))
        )
    },

    deleteVariant: async (variant_id) => {
        const { cart, processedVariants } = get();
        if (cart === null || processedVariants.includes(variant_id))
            return;
        const item = cart.lines?.find((item) => item.variant_id === variant_id);
        if (item == null)
            return;
        set(() => ({ processedVariants: [...processedVariants, variant_id] }));
        pipe(
            R.deleteLineItem(cart.id, item.id),
            AsyncResult.tap(cart => set({ cart })),
            AsyncResult.tapError((error) => console.error('deleting variant', error)),
            AsyncResult.then(() => set(() => ({ processedVariants: processedVariants.filter((id) => id !== variant_id) })))
        )
    },

    variantQuantity: (variant_id) => {
        const cart = get().cart;
        if (cart == null)
            return 0;
        const item = cart.lines?.find((item) => item.variant_id === variant_id);
        return item?.quantity || 0;

    },
});


export const useCartState = create(
    persist<TStore>(

        CartStateLogic
        ,

        // Persistance storage
        {
            name: 'cart-state',
            storage: createJSONStorage(() => localStorage),

            // don't persist cart, but only cartId
            // on rehydrate, retrieve cart from server
            partialize: state => omitProps(state, 'cart'),
            onRehydrateStorage: () => (state) => {
                const cartId = state?.cartId;
                if (cartId) {
                    pipe(
                        R.retrieveCart(cartId),
                        AsyncResult.tap(cart => useCartState.setState({ cart })),
                        AsyncResult.tapError(() => localStorage?.removeItem('cartId'))
                    );
                }
            }
        }
    )
);


function omitProps<T extends object, K extends keyof T>(obj: T, ...keys: K[]): T {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
}
