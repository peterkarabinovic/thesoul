import { Product } from "data/data-types"
import { MainContent } from './main-content';
import { ProductExtraDescription } from "./product-extra-description"
// import { ProductDetailTab } from './product-detail-tab';

type Props = {
    product: Product,
    productDetailTabItems?: any 
}

export function ProductDetails({ product, productDetailTabItems }: Props) {
    return (
        <main>
            <MainContent product={product} />
            <ProductExtraDescription product={product} />
            {/* <ProductDetailTab
                product={product}
                productDetailTabItems={productDetailTabItems}
            /> */}
        </main>
    );
}

// ProductDetails.propTypes = {
//     product: PropTypes.instanceOf(Object).isRequired,
//     productDetailTabItems: PropTypes.instanceOf(Object).isRequired,
// };

