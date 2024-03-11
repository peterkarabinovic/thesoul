import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { i18n_home } from "i18n"
import { HeaderOne } from "components/header"
import { Breadcrumb } from "components/breadcrumb"
import { productQuery } from "modules/product-2/requests"
import { ProductDetails } from "modules/product-2/product-details"


export const runtime = 'edge';


type ProductPageType = {
    params: { handle: string };
}

export async function generateMetadata({ params: { handle } }: ProductPageType): Promise<Metadata> {
  const res = await productQuery(handle);

  if (!res.success) 
    return notFound();

  const product = res.data;  
  const { url, altText: alt } = product.images[0] || {};

  return {
    title: product.title,
    description: product.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
            //   width,
            //   height,
              alt
            }
          ]
        }
      : null
  };
}



export default async function ProductPage({ params }: ProductPageType ) {
    const res = await productQuery(params.handle);
  
    if (!res.success) {
      console.error("ProductPage", res.error);
      return notFound();
    }
  
    const product = res.data;
    const productJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: (product.images[0] || {}).url,
      offers: {
        '@type': 'AggregateOffer',
        availability: product.available
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        priceCurrency: product.priceRange.currencyCode,
        highPrice: product.priceRange.high,
        lowPrice: product.priceRange.low
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
        <HeaderOne transparent={false} leftArrow={true}/>
        <Breadcrumb parents={[{ path: "/", title: i18n_home}]} lastTitle={product.title} />
        <ProductDetails product={product} />
      </>
    );
  }
  
