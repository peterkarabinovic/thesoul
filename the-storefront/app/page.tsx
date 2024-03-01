import { i18_site_description} from "i18n"
import { heroItems } from "./_config/hero"
import { HeroOne } from "../components/hero"
import { FeaturedProduct } from "modules/product-2/featured-product";
import { productListQuery } from "modules/product-2/requests";

export const runtime = 'edge';

export const metadata = {
  description: i18_site_description,
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
        <HeroOne heroItems={heroItems} />           
        <FeaturedProduct getProductListQuery={productListQuery}/>
    </>
  );
}
