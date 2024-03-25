import Link from 'next/link';
import React from 'react'
import CommonConf from "./common.json"


/**
 *   I18nProvider - headless component for providing Client Component with i18n data
 *  Client componnts can't be async functions 
 */
type Func = (lang: string) => Promise<any>;

type PromiseType<F extends Func> = ReturnType<F> extends PromiseLike<infer U> ? U : ReturnType<F>;

interface I18nProps<FN extends Func> 
{
    lang: string;
    func: FN;
    children:  (i18n: PromiseType<FN>) => React.ReactNode;
}

export async function I18nProvider<FN extends Func>( { lang, func, children }: I18nProps<FN>){

    const i18n = await func(lang);

    return (
        <>{children(i18n)}</>
    )
}


/**
 * I18nLink - wrapper NextJS Link and tunes href with lang
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