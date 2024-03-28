
import React from 'react'


type Func = (lang: string) => Promise<any>;

type PromiseType<F extends Func> = ReturnType<F> extends PromiseLike<infer U> ? U : ReturnType<F>;

// 
export function useI18n<FN extends Func>(lang: string, providerFunc: FN) {
    
    const [i18n, setI18n] = React.useState<PromiseType<FN>>(new Proxy({}, {get: () => ""} ) as PromiseType<FN>);

    React.useEffect(() => {
        providerFunc(lang).then(setI18n);
    }, [providerFunc, lang]);

    return i18n;
}


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