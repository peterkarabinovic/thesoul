import { create, UseBoundStore, StoreApi, StateCreator } from 'zustand'
import { AsyncResult, pipe } from 'commons';
import { readThesoulCookie } from 'lib/thesoul-cookie';
import { Cart } from 'lib/medusa/types';
import { useCustomerStore } from "@customer/data"
import * as R from './requests';


export type TCartState = {
    cart: Cart | null;
    cartId: string | null;
    processedVariants: string[];
    addItem: (variant_id: string, quantity: number) => Promise<void>;
    updateItem: (variant_id: string, quantity: number) => Promise<void>;
    deleteVariant: (variant_id: string) => Promise<void>;
    variantQuantity: (variant_id: string) => number;
    retriveCartIdFromCookie: () => void
}

export type TCartStore = UseBoundStore<StoreApi<TCartState>>;

export const useCartStateProto: StateCreator<TCartState> = (set, get) => ({

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


    updateItem: async (variant_id, quantity) => {
        const { cart, processedVariants } = get();
        quantity = Math.max(0, quantity);
        if (cart === null || processedVariants.includes(variant_id))
            return;
        const item = cart.lines?.find((item) => item.variant_id === variant_id);
        if (item == null)
            return;
        set(() => ({ processedVariants: [...processedVariants, variant_id] }));
        pipe(
            quantity == 0 ? R.deleteLineItem(cart.id, item.id) : R.updateItem(cart.id, item.id, quantity),
            AsyncResult.tap(cart => set({ cart })),
            AsyncResult.tapError((error) => console.error('updateItem line iten', error)),
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

    retriveCartIdFromCookie: () => {
        const { cartId } = readThesoulCookie();
        if( cartId ) {
            if(cartId !== get().cartId)
                pipe(
                    R.retrieveCart(cartId),
                    AsyncResult.tap(cart => set({ cart, cartId })),
                    AsyncResult.tapError( () => set({ cart: null, cartId: null }) )
                );
        }
        else {
            set({ cart: null, cartId: null });
        }
    }
});

export const useCartState = create( useCartStateProto );



// Initilize the store if cookie exists
useCartState.getState().retriveCartIdFromCookie();

// Listent to singIn/SingUp
useCustomerStore.subscribe( 
    state => state.customerId, 
    () => useCartState.getState().retriveCartIdFromCookie() 
);
