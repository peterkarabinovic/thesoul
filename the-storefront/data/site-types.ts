
export type HeaderItems = {
    headerLogo: {
        src: string;
        alt: string;
    }

    languageTitle?: string;
    languageList?: {
        id: string;
        text: string;
        path: string;
    }[];

    contactInfoTitle: string;
    contactInfo: string;

    socialTitle?: string;
    socialList?: {
        id: string;
        path: string;
        socialIcon: string;
    }[];

    homeBoxedMenu: {
        id: string;
        path: string;
        title: string;
        holderCName: string;
        submenuCName?: string;
        headerSubmenu?: {
            id: string;
            submenuTitle: string;
            submenuPath: string;
            cName?: string
        }[]
        megamenuCName?: string;
        headerMegamenu?: {
            id: string;
            groupName: string;
            groupItems: {
                id: string;
                megamenuTitle: string;
                megamenuPath: string;
            }[]
        } []
    }[];

    headerNumberInfo?: {
        id: string;
        numberUrl: string;
        numberInText: string;
    }[];
}



export type HeroItem = {
    id: string;
    heroBG: string;
    title: string;
    subtitle: string;
    desc: string;
}