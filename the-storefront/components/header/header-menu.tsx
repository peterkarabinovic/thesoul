import { Langs, getHeaderConfig } from 'config-and-i18n';
import { LocalizedLink } from 'components';

type HeaderMenuProps = {
    lang: string
    differentPositionCName?: string
}

export async function HeaderMenu({ lang, differentPositionCName="" }: HeaderMenuProps) {
    
    const headerItems = await getHeaderConfig(lang as Langs);

    return (
        <div className={`${differentPositionCName} header-menu`}>
            <nav>
                <ul className="flex justify-center">
                    {headerItems.homeBoxedMenu?.map((menuOne) => (
                        <li
                            className={`${menuOne.holderCName} py-[50px] mr-[55px] last:mr-0`}
                            key={menuOne.id}
                        >
                            <LocalizedLink  
                                lang={lang}
                                href={menuOne.path}
                            >
                                {menuOne.title}
                            </LocalizedLink>
                            {menuOne.submenuCName && !menuOne.megamenuCName && (
                                <ul className={`${menuOne.submenuCName}`}>
                                    {menuOne?.headerSubmenu?.map(
                                        (submenuOne) => (
                                            <li key={submenuOne.id}>
                                                <LocalizedLink
                                                    lang={lang}
                                                    href={`${submenuOne.submenuPath}`}
                                                >
                                                    {submenuOne.submenuTitle}
                                                </LocalizedLink>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                            {menuOne.megamenuCName && !menuOne.submenuCName && (
                                <ul className={`${menuOne.megamenuCName} flex`}>
                                    {menuOne?.headerMegamenu?.map(
                                        (megamenuOne) => (
                                            <li
                                                className="basis-[22%] px-[15px]"
                                                key={megamenuOne.id}
                                            >
                                                <span className="font-medium block mb-[20px]">
                                                    {megamenuOne.groupName}
                                                </span>
                                                <ul>
                                                    {megamenuOne?.groupItems?.map(
                                                        (groupItem) => (
                                                            <li
                                                                className="mb-[10px] last:mb-0"
                                                                key={
                                                                    groupItem.id
                                                                }
                                                            >
                                                                <LocalizedLink
                                                                    lang={lang}
                                                                    href={`${groupItem.megamenuPath}`}
                                                                    className="font-normal transition-all hover:text-primary"
                                                                >
                                                                    {
                                                                        groupItem.megamenuTitle
                                                                    }
                                                                </LocalizedLink>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

