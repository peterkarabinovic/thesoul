import { i18_site_description} from "i18n"
import { heroItems } from "config-data/hero"
import { headerItems } from "config-data/header"
import { HeaderOne } from "components/header"
import { HeroOne } from "components/hero"
import { FeaturedProduct } from "modules/product-2/product-list";
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
        <HeaderOne headerItems={headerItems} />
        <HeroOne heroItems={heroItems} />           
        <FeaturedProduct getProductListQuery={productListQuery}/>
    </>
  );
}
