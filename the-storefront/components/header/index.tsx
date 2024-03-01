'use client'

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as T from "data/site-types"
import { HeaderMenu } from './header-menu';
import { HeaderRight } from './header-right';

type HeaderOneProps = {
    headerItems: T.HeaderItems
    headerContainer?: string
}

export function HeaderOne({ headerItems, headerContainer="container" }: HeaderOneProps) {
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
            className="flex items-center lg:px-[20px] h-[90px] w-full absolute top-0 z-30"
        >
            <div className={headerContainer}>
                <div className="grid grid-cols-12">
                <div className="lg:col-span-4 col-span-6 self-center">
                    <div className='flex'>
                        <Link href="/" className="block">
                            <Image src={headerItems.headerLogo.src} 
                                    alt={headerItems.headerLogo.alt}
                                    width={120}
                                    height={30}
                            />
                        </Link>
                    </div>
        
                </div>
                <div className="lg:col-span-4 hidden lg:block">
                    <HeaderMenu
                        headerItems={headerItems}
                        differentPositionCName="home-collection-megamenu-holder flex justify-center"
                    />
                </div>
                <div className="lg:col-span-4 col-span-6 self-center">
                    <HeaderRight headerItems={headerItems} />
                </div>
                </div>
            </div>
        </header>
    );
}

