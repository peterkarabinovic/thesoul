import { ProductList } from 'modules/products/components/product-list'; 
import { productListQuery } from "modules/products/data/requests";

export const runtime = 'edge';

export const metadata = {
  description: `Знайди у магазині подарунків TheSoul широкий вибір подарункових комплектів для будь-якого випадку - від свят і днів народження до особливих життєвих подій`,
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <ProductList getProductListQuery={productListQuery}/>
  );
}
