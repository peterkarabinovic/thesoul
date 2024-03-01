import { useState } from 'react';
import Link from 'next/link';
import {i18n_cart} from "i18n"
import { UserIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { OffcanvasComps } from './offcanvas-comps';

import * as T from "data/site-types"
import { CartBtn } from '@cart/components';

type HeaderRightProps = {
    headerItems: T.HeaderItems;
};

export function HeaderRight({ headerItems }: HeaderRightProps) {
    const [offcanvas, setOffcanvas] = useState(false);
    const showOffcanvas = () => setOffcanvas(!offcanvas);


    return (
        <>
            <div className="flex justify-end">
                <div className="user-item md:mr-[35px] sm:mr-[25px] mr-[15px]">
                    <Link
                        href="/auth"
                        className="text-2xl hover:text-primary transition-all"
                    >
                        <UserIcon className='w-6 h-6'/>
                    </Link>
                </div>
                <div className="minicart-item md:mr-[35px] sm:mr-[25px] mr-[15px]">
                    <Link href="/checkout/cart" 
                        title={i18n_cart}
                          className="text-2xl hover:text-primary transition-all">
                        <CartBtn />
                    </Link>
                </div>
                <div className="menu-item lg:hidden">
                    <button
                        type="button"
                        className="text-2xl hover:text-primary transition-all"
                        onClick={showOffcanvas}
                    >
                        <Bars3Icon className='w-6 h-6'/>
                    </button>
                </div>
            </div>

            <OffcanvasComps
                headerItems={headerItems}
                offcanvas={offcanvas}
                showOffcanvas={showOffcanvas}
            />
        </>
    );
}