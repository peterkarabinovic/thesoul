import { Product } from 'lib/data/types';
import { Carousel } from 'components/carousel';
import { AddToCartBtn } from './add-to-cart-btn';
import { VariantSelector } from './variant-selector';
import { VariantPrice } from './variant-price';

type ProductDetailsProps = {
  product: Pick<Product,'title' | 'subtitle' | 'variants' | 'description' | 'images' | 'id' | 'priceRange'>;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-y-4 lg:max-w-6xl lg:grid-cols-2 lg:gap-x-8">
      <div className="w-full">
        <Carousel images={product.images || []} fullWidth={true} />
      </div>
      <div className="w-ful p-4 lg:p-8">
        <div>
          <h2 className="uppercase tracking-widest text-neutral-500 lg:text-base">
            {product.subtitle}
          </h2>
          <h1 className="mb-1 text-3xl font-medium text-base-content">{product.title}</h1>
        </div>
        <div className="grid grid-cols-1 gap-y-4 py-4">
          <span className="leading-relaxed text-primary">Sold Out</span>
          <p className="prose text-neutral-500 lg:prose-xl">{product.description}</p>
        </div>
        <VariantSelector product={product} />
        <div className="grid grid-cols-1 items-center justify-between gap-8 py-8 lg:grid-cols-2 lg:py-8 ">
          <VariantPrice product={product} />
          <AddToCartBtn product={product} />
        </div>
      </div>
    </div>
  );
}
