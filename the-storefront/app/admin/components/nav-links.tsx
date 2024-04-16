'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  UserGroupIcon,
  ShoppingCartIcon,
  GiftIcon,
} from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Товар', href: '/admin/products', icon: GiftIcon },
  { name: 'Замовлення', href: '/admin/orders', icon: ShoppingCartIcon },
  { name: 'Клиенты', href: '/admin/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
                "flex h-[48px] grow items-center justify-center text-primary gap-2 p-3 text-sm font-medium hover:bg-gray-200 hover:text-secondary md:flex-none md:justify-start md:p-2 md:px-3",
                {
                    'bg-gray-200 text-secondary': pathname === link.href,
                }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
