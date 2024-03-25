import { ShoppingCartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { LocalizedLink, i18nGeneral } from 'config-and-i18n';


export async function CartEmpty({lang}: {lang: string}){

    const i18n = await i18nGeneral(lang);
    return (
        <div className="empty-cart flex flex-col items-center">
            <span className="icon">
                <ShoppingCartIcon className='md:w-40 md:h-40 w-24 h-24 text-secondary' />
            </span>
            <p className="md:text-[20px]   text-heading">{i18n.cart_is_empty}</p>
            <div className="btn-wrap pt-[25px]">
                <LocalizedLink
                    lang={lang}
                    href="/"
                    className="inline-flex items-center bg-secondary text-white h-[46px] px-[42px] transition-all hover:bg-gray-400"
                >
                    <ArrowLeftIcon className="mr-[5px] h-4 w-4" />
                    {i18n.go_to_home_page}
                </LocalizedLink>
            </div>
        </div>
    );
}