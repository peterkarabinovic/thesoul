import { create, StateCreator, UseBoundStore, StoreApi } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type TChechoutState = {
    step: "cart" | "shipping" | "payment" | "review";
    processing: boolean;
    shipping_option: string | null;
    shipping_city: string | null;
    shipping_address: string | null;
    shipping_data: Record<string, string | number> | null;
    goto: (step: TChechoutState["step"]) => void;
}

export type TChechoutStore = UseBoundStore<StoreApi<TChechoutState>>;

export const _ChechoutStore: StateCreator<TChechoutState> = (set, get) => ({
    step: "cart",
    processing: false,
    shipping_option: null,
    shipping_city: null,
    shipping_address: null,
    shipping_data: null,
    goto: (step) => set(() => ({ step }))
});

export const useChechoutState = create(
    persist<TChechoutState>(
        _ChechoutStore,
        {
            name: 'checkout-state',
            storage: createJSONStorage(() => localStorage),
        }
    )
)