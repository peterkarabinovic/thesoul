import { notFound } from "next/navigation"
import { ProductBrief, RequestError } from "lib/data"
import { Result } from "lib/result"
import { groupBy } from "lib/utils";
import { FeaturedProduct, ProductListItem } from "./product";


// type ProductView = Pick<Product, 'title' | 'description' | 'images' | 'priceRange'|'updatedAt'| 'collection_id' | 'tags' | 'id' >

type ProductListProps = {
    getProductListQuery: () => Promise<Result<ProductBrief[], RequestError>>
}

export async function ProductList( {getProductListQuery}: ProductListProps ){

    const productsRes = await getProductListQuery();
    if(!productsRes.success) {
        console.error(productsRes.error);
        return notFound();
    }

    const products = productsRes.data
        .sort( (a,b) => a.updatedAt > b.updatedAt ? -1 : 1 );

    const groups = Object.values( groupBy(products, p => p.collection_id || 'none') );

    // merge group with neibours if its size less then 4
    const mergedGroups = groups.reduce( (acc, group) => {
        const lastGroup = acc[acc.length - 1];
        if ( lastGroup && (group.length < 4 || lastGroup.length < 4) ) {
                lastGroup.push(...group);
        } else {
            acc.push(group);
        }
        return acc;
    }, [] as ProductBrief[][]);

    // find feaured product for each group
    const featuredProducts = mergedGroups.map( group => {
        let index = group.findIndex( p => p.tags?.includes('featured') );
        index = index > -1 ? index : 0;
        return {
            featured: group[index],
            rest: group.filter( (p,i) => i !== index ) 
        };
    });


    return (
        // <div className="space-y-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="w-full">
            {featuredProducts.map( (group, i) => (
                <div key={i} className="w-full pb-4">
                    <FeaturedProduct product={group.featured!} />
                    <div className="mx-auto p-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 
                                    lg:grid-cols-3 sm:max-w-4xl sm:p-16 lg:max-w-7xl md:gap-x-16">
                    {group.rest.map( product => (
                        <ProductListItem key={product.id} product={product} />
                    ))}

                    </div>
                </div>    
            ))}
        </div>
    )
}