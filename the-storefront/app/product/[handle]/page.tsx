import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { productQuery } from "lib/data/requests"
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { ProductDetails } from "components/product-derails"
import Footer from 'components/layout/footer';


export const runtime = 'edge';


type ProductPageType = {
    params: { handle: string };
}

export async function generateMetadata({ params: { handle } }: ProductPageType): Promise<Metadata> {
  const res = await productQuery(handle);

  if (!res.success) 
    return notFound();

  const product = res.data;  
  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: ProductPageType ) {
  const res = await productQuery(params.handle);

  if (!res.success) return notFound();

  const product = res.data;
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.maxVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <ProductDetails product={product}/>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

