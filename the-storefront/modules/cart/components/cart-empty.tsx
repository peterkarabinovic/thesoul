import Link from 'next/link';
import { i18n_got_to_home_page, i18n_cart_is_empty } from 'i18n';

export function CartEmpty(){
    return (
        <div className="flex flex-col items-center justify-center text-center h-96 mx-auto lg:p-8 lg:max-w-6xl">
            <div className='text-lg text-neutral-500'>{i18n_cart_is_empty}</div>
            <Link className='btn btn-primary mt-4' href="/">{i18n_got_to_home_page}</Link>
        </div>
    );

}