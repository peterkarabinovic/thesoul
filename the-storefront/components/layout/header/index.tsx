import { LogoIcon } from 'components/icons/logo';
import Link from 'next/link';
import MobileMenu from './mobile-menu';
import { CartBtn } from '@cart/components';
const menu = [
  {
    title: 'Для нього',
    path: '/men'
  },
  {
    title: 'Для неї',
    path: '/women'
  },
  {
    title: 'Дітям',
    path: '/kids'
  },
  {
    title: 'Доставка та оплата',
    path: '/delivery'
  },
  {
    title: 'Знаємо хто ми',
    path: '/about'
  }
];

const subTitle = 'магазин подарунків'

export default function Header() {
  return (
    <header className="max-w-full bg-secondary">
      <div className="mx-auto container lg:max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between  sm:space-x-8 lg:space-x-16">
          <MobileMenu menu={menu} className="md:hidden bg-secondary text-neutral pr-4" />
          <Link href="/">
            <LogoIcon className="h-6 w-auto fill-neutral sm:h-8" />
          </Link>
          <span className='pl-4 text-neutral text-lg  overflow-hidden md:hidden'>{subTitle}</span>
          
          <div className="hidden items-center space-x-8 md:flex">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className="text-base font-medium text-light-500 hover:text-light-900"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <Link href="/checkout/cart" className=''>
            <CartBtn />
          </Link>
        </div>
      </div>
    </header>
  );
}
