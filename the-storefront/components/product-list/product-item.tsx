import Image from 'next/image';
import Link from 'next/link';
import { ProductBrief } from 'lib/data/types';
import { formatPrice } from 'lib/medusa/helpers';

type ProductProps = {
  product: Pick<ProductBrief, "handle" | "title" | "featuredImageSrc" | "description" | "price">;
};

export function FeaturedProduct({ product }: ProductProps) {
  return (
    <Link href={`/product/${product.handle}`} className="">
      <div className="relative aspect-3/4 w-full sm:aspect-2/1">
        <Image
          className="object-cover object-center"
          fill={true}
          alt={product.title}
          src={product.featuredImageSrc}
          priority={true}
        ></Image>
        <div className="absolute p-4 text-light sm:p-8">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="hidden w-2/3 text-base sm:block">{product.description}</p>
          <p className="font-mediu mt-1 text-2xl text-light-900">{formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}

export function ProductListItem({ product }: ProductProps) {
  return (
    <Link className="group overflow-hidden" href={`/product/${product.handle}`}>
      <div className="bg-red relative aspect-3/4  w-full">
        <Image
          className="rounded-lg object-cover object-center group-hover:opacity-75"
          fill={true}
          alt={product.title}
          src={product.featuredImageSrc}
          priority={true}
        ></Image>
      </div>
      <h3 className="mt-4 text-sm text-dark-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-dark-500">{formatPrice(product.price)}</p>
    </Link>
  );
}
