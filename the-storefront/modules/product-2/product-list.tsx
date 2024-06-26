import { Result } from "commons"
import clsx from 'clsx';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { Carousel } from 'components/carousel';
import { RequestError } from "data/medusa-request"
import { minMax } from 'lib/utils';
import { formatPrice } from "lib/formaters"
import { Product } from "data/data-types"

import { VariantSelector } from "./product-details/variant-selector"
import { AddToCartBtn } from "@cart/components";
import {  i18nGeneral } from "config-and-i18n";
import { LocalizedLink } from 'components';


type FeaturedProductProps = {
    getProductListQuery: () => Promise<Result<Product[], RequestError>>
    lang: string
}

export async function FeaturedProduct({ getProductListQuery, lang }: FeaturedProductProps) {
    const res = await getProductListQuery();
    if(!res.success) {
        return null;
    }

    const i18n = await i18nGeneral(lang);

    const products = res.data;
    const outlineButton =
        'inline-flex items-center border border-secondary text-secondary transition-all hover:bg-secondary hover:text-white leading-[38px] text-[15px] h-[38px] px-[35px]';

    return (
        <>
            { products.map((product, index) => {
                // const variants = product.variants.toSorted( (v1, v2) => v1.price.amount - v2.price.amount);
                // const { min, max } = minMax(variants, v => v.price.amount); 
                // const priceText = formatPrice({ amount: min, currencyCode: variants[0]?.price.currencyCode || 'uah'})
                // const buttonText = min !== max ? `${i18n.from} ${priceText}` : priceText;
                const hasMorInfo = Boolean(product.extra_md);
                return (
                    <div key={index}
                    className={clsx(
                        "featured-product xl:py-[60px] lg:py-[50px] md:py-[40px] py-[25px] relative before:hidden before:md:block before:content-[attr(data-count)] before:absolute before:font-semibold before:xl:text-[80px] before:text-[50px]  before:z-[1]",
                        index % 2 == 1 ? "bg-gray-100 before:text-white" : "before:text-[#F5F4F7]",
                        index % 2 == 1 ? "before:bottom-[75px] before:left-0" : "before:sm:bottom-[30px] before:bottom-[-60px] before:right-0")}
                    data-count={product.title}
                >
                    <div className="lg:container ">
                        <div className={clsx(
                                "flex flex-col lm:gap-x-14 md:space-y-0  group ", 
                                index % 2 == 0 ? "md:flex-row" : "md:flex-row-reverse")}>

                            <div className="px-6 pt-6 md:hidden">
                                <span className="text-[14px] leading-5 font-medium uppercase block mb-[5px] text-[#999999]">
                                        {product.subtitle}
                                    </span>
                                    <h2 className="relative after:bg-primary after:absolute after:left-0 after:bottom-0 after:h-[4px] after:w-[70px] pb-[10px] mb-[30px]">
                                        <LocalizedLink
                                            lang={lang}
                                            href={`/products/${product.handle}`}
                                            className="transition-all hover:text-primary"
                                        >
                                            {product.title}
                                        </LocalizedLink>
                                    </h2>
                            </div>

                            <div className="md:w-1/2 w-full md:pb-0">
                                <Carousel images={product.images || []} fullWidth={true} />
                            </div>
                            <div className="md:w-1/2 w-full lg:px-0 px-6 py-6">
                                <div className="featured-product-content">
                                    <span className="text-[14px] leading-5 font-medium uppercase md:block mb-[5px] text-[#999999] hidden ">
                                        {product.subtitle}
                                    </span>
                                    <h2 className="hidden md:block relative after:bg-primary after:absolute after:left-0 after:bottom-0 after:h-[4px] after:w-[70px] pb-[10px] mb-[30px]">
                                        <LocalizedLink
                                            lang={lang}
                                            href={`/products/${product.handle}`}
                                            className="transition-all hover:text-primary"
                                        >
                                            {product.title}
                                        </LocalizedLink>
                                    </h2>
                                    <p>
                                        {product.description}
                                        { hasMorInfo && (
                                            <LocalizedLink
                                                lang={lang}
                                                href={`/products/${product.handle}`}
                                                className="transition-all hover:text-primary"
                                            >
                                                ..{i18n.more}
                                            </LocalizedLink>
                                        )}
                                    </p>

                                    <div className="flex pt-7 place-content-start">
                                        <VariantSelector product={product} />
                                    </div>
                                    <div className="flex pt-4 place-content-start">
                                        <AddToCartBtn 
                                            lang={lang}
                                            product={product} 
                                            i18n_add_to_cart={i18n.add_to_cart}
                                            i18n_go_to_cart={i18n.go_to_cart}
                                        />
                                    </div>

                                    {/* <div className="mt-4">
                                        <LocalizedLink
                                            ={lang}
                                            href={`/products/${product.handle}`}
                                            className={outlineButton}
                                        >
                                            {buttonText}
                                            <ArrowRightIcon className="ml-[5px] h-6 w-6" />
                                        </LocalizedLink>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
                );
              })
            }
        </>
    );
}

