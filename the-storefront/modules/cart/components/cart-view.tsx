
"use client"
import { TCartStore, useCartState  } from '@cart/data';
import { CartDetails, CartEmpty, CartTotals } from ".";
import { cartConf } from "config-data/cart"
import { CheckoutButton, HomeAndClearButtons } from "./cart-view-buttons"


type Props = {
    lang?: string;
    useCart?: TCartStore
};


export const dynamic = 'force-dynamic'
export const revalidate = 0


export function CartView({ lang = "ua", useCart = useCartState } : Props){

    const cartEmpty = useCart( s => (s?.cart?.lines.length ?? 0) == 0  )
 
    if(cartEmpty) {
        return (
            <div className="cart border-b border-[#ededed] lg:py-[90px] md:py-[80px] py-[50px]">
                <div className="container">
                    <CartEmpty lang={lang} />                    
                </div>
            </div>
        );
    }

    const rawHtmlClasses = [
        "[&>h1]:text-2xl [&>h1]:mb-4",
        "[&>h2]:text-xl [&>h2]:mb-3",
        "[&>h3]:text-lg [&>h3]:mb-2",
        "[&>ul]:list-disc [&>ul]:px-4 [&>ul]:pt-4",
        "[&>ul>li]:mb-[5px] [&>ul>li]:last:mb-0",
        "[&>p]:text-base [&>p]:leading-[24px]"
    ].join(' ');

    return (
        <div className="cart border-b border-[#ededed] md:py-8 py-6">
            <div className="container">
                <div className="flex flex-col w-full md:gap-8 gap-6">
                    <HomeAndClearButtons lang={lang} />
                    <CartDetails lang={lang}/>
                    <div className='flex md:flex-row flex-col gap-4'>
                        <div className='md:basis-2/3 w-full py-7'>
                        {
                            cartConf.infoHtml && (
                                <div className={rawHtmlClasses}
                                    dangerouslySetInnerHTML={{ __html: cartConf.infoHtml }}
                                />
                            )
                        }
                        </div>
                        <div className="md:basis-1/3 w-full">
                            <CartTotals 
                                lang={lang} 
                            />
                            <div className='flex md:flex-row-reverse gap-4 mt-8 max-w-[400px] md:ml-auto m-auto'>
                                <CheckoutButton 
                                    lang={lang} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
