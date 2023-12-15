import { LogoIcon } from 'components/icons/logo';
import Link from 'next/link';
import MobileMenu from './mobile-menu';
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
    <header className="max-w-full bg-primary">
      <div className="mx-auto max-w-full border-b border-accent px-4 py-4  sm:max-w-4xl sm:px-8 lg:max-w-7xl">
        <div className="flex items-center justify-start  sm:space-x-8 sm:justify-center">
          <MobileMenu menu={menu} className="sm:hidden bg-primary text-light pr-4" />
          <LogoIcon className="h-6 w-auto fill-light sm:h-8" />
          <span className='pl-4 text-light text-lg  overflow-hidden sm:hidden'>{subTitle}</span>
          <div className="hidden items-center space-x-4 md:flex">
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
        </div>
      </div>
    </header>
  );
}
