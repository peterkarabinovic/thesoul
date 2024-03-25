
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Langs, LocalizedLink, getHeaderConfig } from 'config-and-i18n';
// import OffcanvasMenu from './offcanvas-menu';


type OffcanvasCompsProps = {
    lang: string
    offcanvas: boolean
    showOffcanvas: () => void
}

export async function OffcanvasComps({ lang, offcanvas, showOffcanvas }: OffcanvasCompsProps) {
    const headerItems = await getHeaderConfig(lang as Langs);
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
                                    <LocalizedLink
                                        lang={lang}
                                        href={`${items.path}`}
                                        className="text-[#999999] font-normal transition-all hover:text-primary block"
                                    >
                                        {items.text}
                                    </LocalizedLink>
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
                                        <LocalizedLink
                                            lang={lang}
                                            href={item?.path}
                                            className="transition-all hover:text-primary"
                                        >
                                            {item.socialIcon}
                                        </LocalizedLink>
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

