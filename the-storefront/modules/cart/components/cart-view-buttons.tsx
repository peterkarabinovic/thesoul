import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { i18nGeneral } from 'config-and-i18n';
import { LocalizedLink } from 'components';


export async function CheckoutButton( {lang}: { lang: string} ) {
    const i18n = await i18nGeneral(lang);
    return (
        <LocalizedLink
            lang={lang}
            href="/checkout"
            className="my-primary-button"
        >
            {i18n.checkout}
        </LocalizedLink>                        

    )
}

type Props = {
    lang: string;
    onClearCart: () => void;
}

export async function HomeAndClearButtons({ lang, onClearCart  } : Props){
    const i18n = await i18nGeneral(lang);
    return (
        <div className="group-btn flex justify-between">
            <LocalizedLink
                lang={lang}
                href="/"
                className="hidden tiny:inline-flex items-center bg-secondary text-white h-[46px] md:px-[40px] sm:px-[20px] px-[10px] transition-all hover:bg-primary"
            >
                <ArrowLeftIcon className="mr-[5px] h-6 w-6" />
                {i18n.go_to_home_page}
            </LocalizedLink>
            <div className="btn-wrap">
                <button
                    onClick={onClearCart}
                    type="button"
                    className="inline-flex items-center border border-secondary text-secondary h-[46px] md:px-[40px] sm:px-[20px] px-[10px] transition-all hover:bg-secondary hover:text-white"
                >
                    {i18n.clear_cart}
                </button>
            </div>
        </div>
    );
}