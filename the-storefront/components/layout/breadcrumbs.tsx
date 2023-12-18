import Link from "next/link";

type BreadcrumbsProps = {
    parents: {
        title: string;
        path: string;
    }[];
    lastTitle: string;
}

export function Breadcrumbs({ parents, lastTitle }: BreadcrumbsProps){

    return (
        <ul className="p-2 flex items-center justify-start space-x-1 text-dark text-sm overflow-x-auto">
            
            {parents.map((item) => (
                
                <li key={item.title} className="flex items-center">
                    <Link
                        href={item.path}
                        className="font-light  hover:underline"
                    >
                        {item.title}
                    </Link>
                    <span className="font-serif opacity-30 px-1.5">/</span>
                </li>
            ))}
            <li>
                <span className="font-light">
                    {lastTitle}
                </span>
            </li>    
        </ul>
    );
}