import * as T from "../data/type"
import { i18nCustomer } from "config-and-i18n"
import { LocalizedLink } from 'components';

type CustomerGreetingProps = {
    customer: T.TCustomer,
    linkToProfile: string
    lang: string
}

export async function CustomerGreeting({ lang, customer, linkToProfile}: CustomerGreetingProps){
    const i18n = await i18nCustomer(lang);
    return (
        <div className="text-sm">
            {i18n.greeting
                .replace("{firstName}", customer.firstName)
                .replace("{lastName}", customer.lastName) } 
                <LocalizedLink
                    lang={lang}
                    className="transition-all hover:text-primary underline" 
                    href={linkToProfile}
                >
                    {i18n.in_you_profile}
                </LocalizedLink>
        </div>
    );
}