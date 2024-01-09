import { usePathname, useRouter, useSearchParams } from "next/navigation";



export function useSelectedVariant() {

    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const selectedVariant = parseInt(searchParams.get('sv') || '0');


    function setectVariant(variantIndex: number) {
        const params = new URLSearchParams(searchParams);
        if (variantIndex === 0)
            params.delete('sv');
        else
            params.set('sv', variantIndex.toString());
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return [ selectedVariant, setectVariant ] as const;
}