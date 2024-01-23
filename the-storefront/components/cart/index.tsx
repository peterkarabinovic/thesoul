import { useCartState, TCartState } from "lib/data"
import { Checkout } from "../checkout"
import { CartDetails } from "./cart-details"
import { CartEmpty } from "./cart-empty"


type CartProps = {
    useCart?: TCartState;
};

export function Cart({ useCart = useCartState }: CartProps ) {

  const cart = useCart( state => state.cart )

  if( !cart || cart.lines.length === 0 )
    return <CartEmpty/>

  return (
    <Checkout step="cart" 
              canGoNext={true}
              useCart={useCart}>
        <CartDetails useCart={useCart} />
    </Checkout>
  );
}