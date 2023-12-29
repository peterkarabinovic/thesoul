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
    <header className="max-w-full bg-secondary">
      <div className="mx-auto container lg:max-w-6xl px-4 py-4  sm:px-8">
        <div className="flex items-center justify-start  sm:space-x-8 sm:justify-center">
          <MobileMenu menu={menu} className="sm:hidden bg-secondary text-neutral pr-4" />
          <LogoIcon className="h-6 w-auto fill-neutral sm:h-8" />
          <span className='pl-4 text-neutral text-lg  overflow-hidden sm:hidden'>{subTitle}</span>
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
