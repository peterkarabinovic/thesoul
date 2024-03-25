import { LocalizedLink } from 'config-and-i18n';


type BreadcrumbsProps = {
    parents: {
        title: string;
        path: string;
    }[];
    lastTitle: string;
    lang: string;
}

export function Breadcrumb({ lang, parents, lastTitle }: BreadcrumbsProps) {
    return (
        <div className="breadcrumb bg-[#f4f5f7] py-[80px]">
            <div className="container">
                <div className="flex lm:flex-row flex-col items-center">
                    <div className="lm:basis-1/2 w-full">
                        <h1 className="text-[36px] lm:text-start text-center">
                            {lastTitle}
                        </h1>
                    </div>
                    <div className="lm:basis-1/2 w-full">
                        <ul className="breadcrumb-list flex lm:justify-end justify-center uppercase text-[14px]">
                            { parents.map((item, index) => (
                                <li key={index} className='relative after:pr-[15px] after:ml-[15px] after:content-["/"] text-secondary'>
                                    <LocalizedLink 
                                        lang={lang}
                                        href={item.path}
                                    >
                                        {item.title}
                                    </LocalizedLink>
                                </li>
                            ))}
                            <li>
                                <span className="text-[#777777] font-medium">
                                    {lastTitle}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}



