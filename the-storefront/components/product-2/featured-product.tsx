import Image from 'next/image';
import Link from 'next/link';
import { Product } from 'lib/medusa/types';
import { formatPrice } from 'lib/medusa/helpers';

type ProductProps = {
  product: Pick<Product, 'title' | 'description' | 'images' | 'priceRange' | 'id'>;
};

export function FeaturedProduct({ product }: ProductProps) {
  return (
    <div className="aspect-3/4 sm:aspect-2/1 relative w-full">
      <Image
        className="object-contain object-center"
        layout="fill"
        objectFit="cover"
        alt={product.title}
        src={product.images![0]?.url || ''}
        priority={true}
      ></Image>
      <div className="absolute p-4 text-light sm:p-8">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="hidden w-2/3 text-base sm:block">{product.description}</p>
        <p className="font-mediu mt-1 text-2xl text-light-900">
          {formatPrice(product.priceRange.maxVariantPrice)}
        </p>
      </div>
    </div>
  );
}

export function ProductListItem({ product }: ProductProps ) {
  return (
    <Link 
            className="overflow-hidden group"
            href={`/product/${product.id}`}
        >
        <div className='aspect-3/4 relative w-full  bg-red'>
            <Image
                className="object-center group-hover:opacity-75 rounded-lg"
                layout="fill"
                objectFit="cover"
                alt={product.title}
                src={product.images![0]?.url || ''}
                priority={true}
            ></Image>
      </div>
      <h3 className="mt-4 text-sm text-primary-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-primary">
        {formatPrice(product.priceRange.maxVariantPrice)}
      </p>
    </Link>
  );
}
