import CommonConf from "config-and-i18n/common.json"
import { HeaderOne } from "components/header"
import { HeroOne } from "components/hero"
import { FeaturedProduct } from "modules/product-2/product-list";
import { productListQuery } from "modules/product-2/requests";

export const runtime = 'edge';

export const metadata = {
  description: CommonConf.site_description,
  openGraph: {
    type: 'website'
  }
};

type HomePageType = {
    searchParams: { lang: string };
}
export default async function HomePage({ searchParams: {lang} }: HomePageType) {
  return (
    <>
        <HeaderOne lang={lang}/>
        <HeroOne lang={lang}/>           
        <FeaturedProduct getProductListQuery={productListQuery} lang={lang}/>
    </>
  );
}
