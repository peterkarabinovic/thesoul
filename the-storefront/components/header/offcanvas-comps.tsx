
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/outline';
// import OffcanvasMenu from './offcanvas-menu';

import * as T from "data/site-types"

type OffcanvasCompsProps = {
    headerItems: T.HeaderItems
    offcanvas: boolean
    showOffcanvas: () => void
}

export function OffcanvasComps({ headerItems, offcanvas, showOffcanvas }: OffcanvasCompsProps) {
    return (
        <div
            className={offcanvas ? 'offcanvas-menu active' : 'offcanvas-menu'}
            onClick={showOffcanvas}
        >
            <div
                className="offcanvas-menu-inner overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="offcanvas-top flex justify-end">
                    <button
                        type="button"
                        className="offcanvas-close-btn text-[32px]"
                        onClick={showOffcanvas}
                    >
                        <XMarkIcon className='h-6 w-6'/>
                    </button>
                </div>
                <div className="offcanvas-setting grid grid-cols-2 pt-[40px]">
                    <div className="language-widget">
                        <h3 className="text-[16px] mb-[15px]">
                            {headerItems?.languageTitle}
                        </h3>
                        <ul>
                            {headerItems?.languageList?.map((items) => (
                                <li
                                    className="mb-[10px] last:mb-0"
                                    key={items.id}
                                >
                                    <Link
                                        href={`${items.path}`}
                                        className="text-[#999999] font-normal transition-all hover:text-primary block"
                                    >
                                        {items.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* <OffcanvasMenu /> */}
                <div className="offcanvas-contact-info pt-[60px]">
                    <h3 className="text-[16px]">
                        {headerItems?.contactInfoTitle}
                    </h3>
                    <p
                        className="text-[#666666] pt-[20px]"
                        dangerouslySetInnerHTML={{
                            __html: headerItems?.contactInfo,
                        }}
                    />
                    <div className="offcanvas-social-link flex justify-between items-center pt-[55px]">
                        <h3 className="text-[16px]">
                            {headerItems?.socialTitle}
                        </h3>
                        <ul className="flex">
                            {headerItems?.socialList?.map((item) => {
                                return (
                                    <li
                                        className="mr-[25px] last:mr-0"
                                        key={item.id}
                                    >
                                        <Link
                                            href={item?.path}
                                            className="transition-all hover:text-primary"
                                        >
                                            {item.socialIcon}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

