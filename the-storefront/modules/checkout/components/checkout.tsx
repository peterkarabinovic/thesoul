import { useCartState, TCartStore } from "@cart/data"
import { CartDetails, CartEmpty } from "@cart/components"

import { CheckoutSteps } from "./checkout-steps"
import { TChechoutStore, useChechoutState } from "../data"


type CheckoutProps = {
    useCart?: TCartStore;
    useCheckout?: TChechoutStore;
};

export function Checkout({ useCart = useCartState }: CheckoutProps ) {

  const cart = useCart( state => state.cart )

  if( !cart || cart.lines.length === 0 )
    return <CartEmpty/>

  return (
    <CheckoutSteps step="cart" 
              canGoNext={true}
              useCart={useCart}>
        <CartDetails useCart={useCart} />
    </CheckoutSteps>
  );
}