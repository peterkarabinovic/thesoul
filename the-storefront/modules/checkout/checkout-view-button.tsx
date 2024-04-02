import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { LocalizedLink } from "components";
import { i18nGeneral } from 'config-and-i18n';
import { TShippingStore } from 'modules/shipping/data/state';


export async function BackToCartBtn( {lang}: { lang: string} ) {
    const i18n = await i18nGeneral(lang);
    return (
        <LocalizedLink
            lang={lang}
            href="/cart"
            className="my-secondary-button"
        >
            <ArrowLeftIcon className="mr-[5px] h-6 w-6" />
            {i18n.go_to_cart}
        </LocalizedLink>

    )
}

