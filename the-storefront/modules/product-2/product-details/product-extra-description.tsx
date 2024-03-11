import { marked } from 'marked';
import { Product } from "data/data-types"

type Props = {
    product: Product
}

export function ProductExtraDescription({ product }: Props ){

    if( !product.extra_md )
        return (null);

    const rawHtmlClasses = [
        "[&>h1]:text-[30px] [&>h1]:mb-[14px]",
        "[&>h2]:text-[24px] [&>h2]:mb-[10px]",
        "[&>h3]:text-[20px] [&>h3]:mb-[7px]",
        "[&>ul]:list-disc [&>ul]:px-4 [&>ul]:pt-4",
        "[&>ul>li]:mb-[5px] [&>ul>li]:last:mb-0",
        "[&>p]:pt-4 [&>p]:text-[16px] [&>p]:leading-[24px]"
    ].join(' ');

    return (
        <div className="product-detail-content container">
            <div className="description-wrap border-b border-[#dddddd] py-[30px]">
                <div className="grid grid-cols-12 lm:gap-x-[30px] max-sm:gap-y-[30px]">
                    <div className="md:col-span-7 col-span-12 self-center">
                        <div 
                            className={rawHtmlClasses}
                            dangerouslySetInnerHTML={{ __html: marked.parse(product.extra_md) }}
                        >

                        </div>
                    </div>
                    {/* <div className="lm:col-span-5 col-span-12">
                        <img
                            className="w-full"
                            src={`/images/products/${product?.slug}/${product?.mdImage}`}
                            alt={product?.altImage}
                        />
                    </div> */}
                </div>
            </div>
        </div>        
    )

}