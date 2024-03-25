'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image';

import { HeaderMenu } from './header-menu';
import { HeaderRight } from './header-right';
import clsx from 'clsx';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import HeaderConf from 'config-and-i18n/en/header.json';
import { LocalizedLink } from 'config-and-i18n';


type HeaderOneProps = {
    headerContainer?: string,
    transparent?: boolean,
    leftArrow?: boolean,
    lang: string
}

export function HeaderOne({ headerContainer="container", transparent = true, leftArrow = false, lang }: HeaderOneProps) {

    // Header Sticky Activation
    const header = useRef<HTMLElement>(null);
    useEffect(() => {
        window.addEventListener('scroll', isSticky);

        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, []);

    const isSticky = () => {
        const scrollTop = window.scrollY;

        scrollTop >= 90
            ? header.current?.classList.add('is-sticky')
            : header.current?.classList.remove('is-sticky');
    };
    //   End Here

    return (
        <header
            ref={header}
            className={clsx("flex items-center lg:px-[20px] h-[90px] w-full top-0 z-30", 
                transparent ? "absolute" : ""
            )}
        >
            <div className={headerContainer}>
                <div className="grid grid-cols-12">
                    <div className="lg:col-span-4 col-span-6 self-center">
                        <LocalizedLink 
                            lang={lang}
                            href="/" 
                            className="flex"
                        >
                            { leftArrow && <ArrowLeftIcon className='mr-2 w-5 h-5 stroke-2 block lg:hidden'/> }
                            <Image src={HeaderConf.headerLogo.src} 
                                    alt={HeaderConf.headerLogo.alt}
                                    width={120}
                                    height={30}
                            />
                        </LocalizedLink>
                    </div>
                <div className="lg:col-span-4 hidden lg:block">
                    <HeaderMenu
                        lang={lang}
                        differentPositionCName="home-collection-megamenu-holder flex justify-center"
                    />
                </div>
                <div className="lg:col-span-4 col-span-6 self-center">
                    <HeaderRight lang={lang} />
                </div>
                </div>
            </div>
        </header>
    );
}

