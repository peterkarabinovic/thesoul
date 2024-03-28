import { Product } from "data/data-types"
import { Carousel } from 'components/carousel';
import { AddToCartBtn } from "modules/cart/components/add-to-cart-btn"
import { VariantPrice } from './variant-price';
import { VariantSelector } from './variant-selector'
import { i18nGeneral } from "config-and-i18n";

// Tailwind Related Stuff
const soldOut = `bg-black text-white block leading-[28px] absolute top-[15px] right-[15px] px-[15px] z-[1]`;
const bestSeller = `bg-[#f14705] text-[14px] text-white block rounded-full absolute top-[15px] left-[15px] w-[45px] h-[45px] leading-[45px] text-center z-[1]`;
const productOffer = `bg-[#98d8ca] text-[14px] text-white block rounded-full absolute top-[70px] left-[15px] w-[45px] h-[45px] leading-[45px] text-center z-[1]`;
// const qtybutton = `cursor-pointer text-center absolute w-[24px] leading-[23px]`;
// const qtyButtonWrap = `relative inline-flex border border-[#dddddd]`;
// const addtoCartBtn = `bg-black text-white px-[42px] h-[46px] leading-[44px]`;

type Props = {
    product: Product,
    lang: string
}

export async function MainContent({ product, lang }: Props ) {
    const discountPrice: number | undefined = undefined;
    const soldOutSticker = undefined
    const bestSellerSticker = undefined;
    const offerSticker = undefined;

    const i18n = await i18nGeneral(lang);

    // const [quantityCount, setQuantityCount] = useState(1);

    // const addToCartHandler = () => {
        // dispatch(
        //     cartActions.addItemToCart({
        //         id,
        //         title,
        //         price,
        //         quantity: quantityCount,
        //         totalPrice,
        //         image: `/images/products/${product?.slug}/${product?.xsImage}`,
        //         slug: `/products/${product?.slug}`,
        //     })
        // );
    // };


    return (
        <div className="product-detail border-b border-[#ededed] md:py-[90px] py-8">
            <div className="md:container">
                <div className="grid grid-cols-12 lg:gap-x-12 max-md:gap-y-[25px]">
                    <div className="lg:col-span-6 col-span-12">
                        <div className="product-detail-img relative">
                            {soldOutSticker && (
                                <span
                                    className={`${
                                        soldOutSticker ? `${soldOut}` : ''
                                    }`}
                                >
                                    {soldOutSticker}
                                </span>
                            )}
                            {bestSellerSticker && (
                                <span
                                    className={`${
                                        bestSellerSticker ? `${bestSeller}` : ''
                                    }`}
                                >
                                    {bestSellerSticker}
                                </span>
                            )}
                            {offerSticker && (
                                <span
                                    className={`${
                                        offerSticker ? `${productOffer}` : ''
                                    }`}
                                >
                                    {offerSticker}
                                </span>
                            )}
                            <div className="w-full">
                                <Carousel images={product.images || []} fullWidth={true} />
                            </div>                            
                        </div>
                    </div>
                    <div className="lg:col-span-6 col-span-12 container">
                        <div className="product-detail-content">
                            <h3 className="mb-2 text-heading">{product?.title}</h3>
                            {!discountPrice && (
                                <span className="product-price text-[30px] font-medium leading-[42px] text-primary mb-[25px]">
                                    <VariantPrice product={product}/>
                                </span>
                            )}
                            {discountPrice && (
                                <div className="product-price-wrap flex mb-4">
                                    <span className="product-price text-[30px] leading-[42px] text-primary block">
                                        <VariantPrice product={product}/>
                                    </span>
                                    <span className="product-price text-[30px] leading-[42px] text-primary block relative before:content-['-'] before:mx-[10px]">
                                        {/* ${discountPrice.toFixed(2)} */}
                                    </span>
                                </div>
                            )}

                            <p className="text-[16px] leading-[24px] lg:max-w-[450px]">
                                {product.description}
                            </p>
                            <div className="flex py-[30px] place-content-center md:place-content-start">
                                <VariantSelector product={product} />
                            </div>
                            <div className="flex md:py-8 place-content-center md:place-content-start">
                                <div
                                    className={`${
                                        soldOutSticker
                                            ? `cursor-not-allowed`
                                            : ''
                                    }`}
                                >
                                    <AddToCartBtn 
                                            lang={lang}
                                            product={product} 
                                            i18n_add_to_cart={i18n.add_to_cart}
                                            i18n_go_to_cart={i18n.go_to_cart}
                                        />

                                </div>
                            </div>
                            <div className="other-info">
                                {/* <div className="sku-wrap font-medium">
                                    <span>SKU:</span>
                                    <span className="text-[#666666] ml-[5px]">
                                        {product?.sku}
                                    </span>
                                </div> */}
                                {/* <div className="category-wrap font-medium">
                                    <span>Categories:</span>
                                    <span className="text-[#666666] ml-[5px]">
                                        {product?.category}
                                    </span>
                                </div> */}
                                { product.tags && (
                                    <div className="category-wrap font-medium">
                                        <span>Tags:</span>
                                        <span className="text-[#666666] ml-[5px]">
                                            {product.tags.join(", ")}
                                        </span>
                                    </div>
                                )}
                                {/* <div className="social-wrap flex pt-[65px]">
                                    <span className="text-black font-medium">
                                        Share this items :
                                    </span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
