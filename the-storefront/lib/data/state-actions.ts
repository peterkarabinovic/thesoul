import { create, StateCreator, UseBoundStore, StoreApi } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AsyncResult, pipe } from '../result';
import { Cart } from './types';
import * as R from './requests';

export type TStore = {
    cart: Cart | null;
    cartId: string | null;
    selectedVariant: number;
    processedVariants: string[];
    addItem: (variant_id: string, quantity: number) => Promise<void>;
    removeItem: (variant_id: string) => Promise<void>;
    deleteVariant: (variant_id: string) => Promise<void>;
    variantQuantity: (variant_id: string) => number;
    selectVariant: (variantIndex: number) => void;
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
export type TUseCartState =  UseBoundStore<StoreApi<TStore>>;

export const CartStateLogic: StateCreator<TStore> = (set, get) => ({

    cart: null,
    cartId: null,
    selectedVariant: 0,
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

    selectVariant: (variantIndex) => set(() => ({ selectedVariant: variantIndex })),
});


export const useCartState = create(
    persist<TStore>(

        CartStateLogic
    ,

        // Persistance storage
        {
            name: 'state-store',
            storage: createJSONStorage<TStore>(() => ({
                getItem: key => {
                    if (key === "selectedVariant") {
                        const params = new URLSearchParams(location.hash.slice(1))
                        return params.get("variant") ?? '0'
                    }
                    return JSON.parse(localStorage.getItem(key) as string)
                },
                setItem: (key, value) => {
                    if (key === "selectedVariant") {
                        const params = new URLSearchParams(location.hash.slice(1))
                        params.set("variant", value.toString())
                        location.hash = params.toString()
                        return;
                    }
                    localStorage.setItem(key, value)
                },
                removeItem: key => {
                    if (key === "selectedVariant") {
                        const params = new URLSearchParams(location.hash.slice(1))
                        params.delete("variant")
                        location.hash = params.toString()
                        return;
                    }
                    localStorage.removeItem(key)
                },
            })),

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
