"use client"
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { i18n_got_to_home_page, i18n_checkout } from "i18n"
import { TCartStore, useCartState } from '@cart/data';
import { CartDetails, CartEmpty, CartTotals } from "@cart/components";
import { cartConf } from "config-data/cart"
import Link from 'next/link';

type Props = {
    useCart?: TCartStore;
};


export function CartView({ useCart = useCartState } : Props){

    const cartEmpty = useCart( s => (s?.cart?.lines.length ?? 0) == 0  )

    const rawHtmlClasses = [
        "[&>h1]:text-2xl [&>h1]:mb-4",
        "[&>h2]:text-xl [&>h2]:mb-3",
        "[&>h3]:text-lg [&>h3]:mb-2",
        "[&>ul]:list-disc [&>ul]:px-4 [&>ul]:pt-4",
        "[&>ul>li]:mb-[5px] [&>ul>li]:last:mb-0",
        "[&>p]:text-base [&>p]:leading-[24px]"
    ].join(' ');
 
    if(cartEmpty) {
        return (
            <div className="cart border-b border-[#ededed] lg:py-[90px] md:py-[80px] py-[50px]">
                <div className="container">
                    <CartEmpty />                    
                </div>
            </div>
        );
    }

    return (
        <div className="cart border-b border-[#ededed] lg:py-[90px] md:py-[80px] py-[50px]">
            <div className="container">
                <div className="flex flex-col w-full gap-8">
                    <div className="w-full">
                        <CartDetails useCart={useCart}/>
                    </div>
                    <HomeAndClearButtons />
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
                            <CartTotals useCart={useCart} />
                            <div className='flex md:flex-row-reverse gap-4 mt-8 max-w-[400px] md:ml-auto m-auto'>
                                <Link
                                    href="/checkout"
                                    className=" bg-secondary text-white h-[46px] leading-[46px] w-full text-center px-[42px] transition-all hover:bg-primary"
                                >
                                    {i18n_checkout}
                                </Link>                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function HomeAndClearButtons({ useCart = useCartState } : Props){
    const clearCart = useCart( s => s.clearCart );
    return (
        <div className="group-btn flex justify-between">
            <Link
                href="/"
                className="hidden tiny:inline-flex items-center bg-secondary text-white h-[46px] md:px-[40px] sm:px-[20px] px-[10px] transition-all hover:bg-primary"
            >
                <ArrowLeftIcon className="mr-[5px] h-6 w-6" />
                {i18n_got_to_home_page}
            </Link>
            <div className="btn-wrap">
                <button
                    onClick={clearCart}
                    type="button"
                    className="inline-flex items-center border border-secondary text-secondary h-[46px] md:px-[40px] sm:px-[20px] px-[10px] transition-all hover:bg-secondary hover:text-white"
                >
                    Clear Cart
                </button>
            </div>
        </div>
    );
}