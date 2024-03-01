import { useState } from 'react';
import Link from 'next/link';
import * as T from "data/site-types"
// import { IoCaretDownOutline } from 'react-icons/io5';

type OffcanvasMenuProps = {
    headerItems: T.HeaderItems;
}


export function OffcanvasMenu( {headerItems}: OffcanvasMenuProps) {

    const [submenuOpenId, setSubmenuOpenId] = useState<Record<string,boolean>>({});

    const showSubmenuClickHandler = (id:string) =>
        setSubmenuOpenId((prevData) => ({
            [id]: !prevData[id],
        }));

    const [levelTwoOpenId, setLevelTwoOpenId] = useState<Record<string,boolean>>({});

    const showLevelTwoClickHandler = (id:string) =>
        setLevelTwoOpenId((prevData) => ({
            [id]: !prevData[id],
        }));

    return (
        <ul className="offcanvas-menu-items pt-[75px]">
            {headerItems.homeBoxedMenu.map((item) => {
                const { submenuCName = "" } = item;
                const submenu = item?.headerSubmenu;

                return (
                    <li
                        key={item.id}
                        className={`${submenuCName}${
                            submenuOpenId[item.id.toString()] ? ' active' : ''
                        } mb-[15px] last:mb-0`}
                    >
                        <span
                            onClick={
                                submenu
                                    ? () => showSubmenuClickHandler(item.id)
                                    : () => {}
                            }
                            className={`${
                                submenu ? 'menu-expand' : ''
                            } font-medium cursor-pointer flex justify-between items-center transition-all hover:text-[#666666]`}
                        >
                            {item.title}
                            <IoCaretDownOutline className="menu-icon" />
                        </span>
                        {submenu && (
                            <ul className="submenu pl-[10px] mt-[15px]">
                                {submenu?.map((submenuItem) => (
                                    <li
                                        key={submenuItem.id}
                                        className={`${submenuItem.cName}${
                                            levelTwoOpenId[
                                                submenuItem.id.toString()
                                            ]
                                                ? ' active'
                                                : ''
                                        } mb-[15px] last:mb-0`}
                                        onClick={
                                            submenuItem.levelTwo
                                                ? () =>
                                                      showLevelTwoClickHandler(
                                                          submenuItem.id
                                                      )
                                                : () => {}
                                        }
                                    >
                                        {submenu && !submenuItem.levelTwo && (
                                            <Link
                                                href={`${submenuItem.link}`}
                                                className="flex justify-between items-center transition-all hover:text-[#666666]"
                                            >
                                                {submenuItem.text}
                                            </Link>
                                        )}
                                        {submenu && submenuItem.levelTwo && (
                                            <span className="font-medium cursor-pointer flex justify-between items-center transition-all hover:text-[#666666]">
                                                {submenuItem.text}
                                                <IoCaretDownOutline className="sub-icon" />
                                            </span>
                                        )}
                                        {submenuItem.levelTwo && (
                                            <ul className="level-two mt-[15px]">
                                                {submenuItem.levelTwo.map(
                                                    (levelTwoItem) => (
                                                        <li
                                                            key={
                                                                levelTwoItem.id
                                                            }
                                                            className="mb-[5px] last:mb-0"
                                                        >
                                                            <Link
                                                                href={
                                                                    levelTwoItem.link
                                                                }
                                                                className="transition-all hover:text-[#666666]"
                                                            >
                                                                {
                                                                    levelTwoItem.text
                                                                }
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

