import Link from 'next/link';
import React from 'react'
import CommonConf from "config-and-i18n/common.json"

/**
 * LocalizedLink - wrapper NextJS Link and tunes href with lang
 */

type Props = { 
    href: string, 
    lang: string, 
    className?: string, 
    title?: string,
    children?: React.ReactNode 
}

export function LocalizedLink({ href, lang, className, children, title }: Props ) {
    const { defaultLocale } = CommonConf;
    href = lang === defaultLocale ? href : `/${lang}${href}`;
    return (
        <Link 
            title={title}
            href={href} 
            className={className}
        >
            {children && children }
        </Link>
    )
}