import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeaderOne } from "components/header"
import { Breadcrumb } from "components/breadcrumb"
import { productQuery } from "modules/product-2/requests"
import { ProductDetails } from "modules/product-2/product-details"
import { i18nGeneral } from 'config-and-i18n';


export const runtime = 'edge';


type ProductPageType = {
    params: { handle: string, lang: string };
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

    const i18n = await i18nGeneral(params.lang);
  
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
        <HeaderOne lang={params.lang} transparent={false} leftArrow={true}/>
        <Breadcrumb lang={params.lang} parents={[{ path: "/", title: i18n.home}]} lastTitle={product.title} />
        <ProductDetails lang={params.lang} product={product}/>
      </>
    );
  }
  
