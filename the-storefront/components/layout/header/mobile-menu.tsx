'use client'

import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type MobileMenuProps = {
  menu: {
    title: string;
    path: string;
  }[];
  className?: string;
};

export default function MobileMenu({ menu, className = '' }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
//   const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);
  const togleMobileMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => setIsOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const clazz = twMerge('rounded-md p-2 bg-primary text-light', className);

  return (
    <>
      <button type="button" className={clazz} onClick={togleMobileMenu}>
        <span className="sr-only">Open menu</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        {/* <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg> */}
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className={"fixed bottom-0 left-0 right-0 top-0 flex h-full w-9/12 flex-col pb-6 shadow-lg " + className} >
              <div className="pl-4 pt-4">
                <button
                  className={"mb-4 flex h-11 w-11 items-center justify-center float-right transition-colors " + className }
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6 text-light" />
                </button>

                {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map( item => (
                      <li
                        className="py-2 text-xl transition-colors bg-primary text-light hover:text-light-500"
                        key={item.title}
                      >
                        <Link href={item.path} onClick={closeMobileMenu}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>

    </>
  );
}
