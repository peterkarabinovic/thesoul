import { create } from "zustand"
import { CartStateLogic, TStore } from "lib/data"



export const useCartState = create<TStore>((set, get, _) => {
    const logic = CartStateLogic(set, get, _);
    return {
        ...logic,
        addItem: async (variant_id, quantity) => {
            const { cart, processedVariants } = get();
            if (processedVariants.includes(variant_id))
                return;
            set(() => ({ processedVariants: [...processedVariants, variant_id] }));
            setTimeout(() => {
                const _cart = cart || {
                    id: 'test_cart',
                    totalQuantity: 0,
                    lines: [],
                    cost: {
                        subtotalAmount: { amount: "1000", currencyCode: "uah" },
                        totalAmount: { amount: "1000", currencyCode: "uah" },
                        totalTaxAmount: { amount: "1000", currencyCode: "uah" }
                    }
                };
                const lineItem = _cart.lines.find(item => item.variant_id === variant_id) || {
                    id: `test-${variant_id}`,
                    variant_id,
                    cost: { totalAmount: { amount: "1000", currencyCode: "uah" } },
                    quantity: 0
                };
                lineItem.quantity += quantity;
                if (!_cart.lines.includes(lineItem)) {
                    _cart.lines.push(lineItem);
                }
                set(() => ({
                    cart: _cart,
                    processedVariants: processedVariants.filter((id) => id !== variant_id)
                }));
            }, 1000)
        },

        removeItem: async (variant_id) => {
            const { cart, processedVariants } = get();
            if (cart === null || processedVariants.includes(variant_id))
                return;
            set(() => ({ processedVariants: [...processedVariants, variant_id] }));
            setTimeout(() => {
                const lineItem = cart.lines.find(item => item.variant_id === variant_id)
                if (lineItem)
                    lineItem.quantity -= 1;
                set(() => ({
                    cart: { ...cart },
                    processedVariants: processedVariants.filter((id) => id !== variant_id)
                }));
            }, 1000);
        },

        deleteVariant: async (variant_id) => {
            const { cart, processedVariants } = get();
            if (cart === null || processedVariants.includes(variant_id))
                return;
            set(() => ({ processedVariants: [...processedVariants, variant_id] }));
            setTimeout(() => {
                set(() => ({
                    cart: {
                        ...cart,
                        lines: cart.lines.filter(item => item.variant_id !== variant_id)
                    },
                    processedVariants: processedVariants.filter((id) => id !== variant_id)
                }));
            }, 1000)
        }
    }
})