"use client"
import { useRouter } from "next/navigation";
import { CartEmpty, CartTotals } from "@cart/components";
import { TCartStore,  useCartState } from "@cart/data";
import { CustomerSignUpOrSignIn } from "@customer/components/customer-signup-or-signin";
import { BackToCartBtn } from "./checkout-view-button";
import { ShippingView } from "modules/shipping/components/shipping-view";
import { PlaceOrderBtn } from './checkout-place-order-button';
import { TCustomerStore, useCustomerStore } from "@customer/data";


type Props = {
    lang?: string;
    useCart?: TCartStore
    useCustomer?: TCustomerStore
};


export function CheckoutView({ 
    lang = "ua",
    useCart = useCartState,
    useCustomer = useCustomerStore
} : Props ){
    const router = useRouter();
    const cartStoreReady = useCart( s => s.storeReady );
    const customerStoreReady = useCustomer( s => s.storeReady );
    const cartId = useCart( s => s.cart?.id ); 
    const cartEmpty = useCart( s => (s?.cart?.lines.length ?? 0) == 0  )
    const customerId = useCustomer(s => s.customerId)

    if(!cartStoreReady || !customerStoreReady)
        return (null);

    if(cartEmpty) {
        return (
            <div className="border-b border-[#ededed] md:py-[80px] py-[50px]">
                <div className="container">
                    <CartEmpty lang={lang} />                    
                </div>
            </div>
        );
    }

    const handleOrderPlacementCompleted = () => {
        router.push(`/${lang}/checkout/success`);
    }

    return (
        <div className="border-b border-[#ededed] md:py-8 py-6">
            <div className="container">
                <div className="grid grid-cols-12 md:gap-8 gap-6">
                    <div className="col-span-12">
                        <BackToCartBtn lang={lang}/>
                    </div>
                    <div className="xl:col-span-7 lg:col-span-6 col-span-12">
                        <CustomerSignUpOrSignIn 
                            lang={lang}
                            customerId={customerId}
                        />
                        <ShippingView 
                            If={!!customerId}
                            lang={lang} 
                            cartId={cartId}
                        />
                    </div>

                    <div className="xl:col-span-5 lg:col-span-6 col-span-12">
                        <CartTotals 
                            lang={lang}
                        />
                        <div className="max-w-[400px]  m-auto mt-8">
                            <PlaceOrderBtn 
                                lang={lang}
                                cartId={cartId || ""}
                                onPlacementCompleted={ handleOrderPlacementCompleted } 
                            />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

