"use client"
import { useState } from 'react';
import { UserIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { OffcanvasComps } from './offcanvas-comps';

import { CartBtn } from '@cart/components';
import { LocalizedLink, i18nGeneral } from 'config-and-i18n';
import { I18nProvider } from 'config-and-i18n';


type HeaderRightProps = {
    lang: string;
};

export function HeaderRight({ lang }: HeaderRightProps) {
    const [offcanvas, setOffcanvas] = useState(false);
    const showOffcanvas = () => setOffcanvas(!offcanvas);

    return (
        <>
            <div className="flex justify-end">
                <div className="user-item md:mr-[35px] sm:mr-[25px] mr-[15px]">
                    <LocalizedLink
                        lang={lang}
                        href="/auth"
                        className="text-2xl hover:text-primary transition-all"
                    >
                        <UserIcon className='w-6 h-6'/>
                    </LocalizedLink>
                </div>
                <div className="minicart-item md:mr-[35px] sm:mr-[25px] mr-[15px]">
                    <I18nProvider lang={lang} func={i18nGeneral}>
                        {
                            (i18n) => (
                                <LocalizedLink 
                                    lang={lang}
                                    href="/cart" 
                                    title={i18n.cart}
                                    className="text-2xl hover:text-primary transition-all"
                                >
                                    <CartBtn />
                                </LocalizedLink>
        
                            )
                        }
                    </I18nProvider>
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
                lang={lang}
                offcanvas={offcanvas}
                showOffcanvas={showOffcanvas}
            />
        </>
    );
}