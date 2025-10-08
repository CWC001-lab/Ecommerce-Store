import { Product } from "@/types";
import { GroupedProduct, groupProductsByVariant } from "@/lib/utils";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import GroupedProductCard from "@/components/ui/grouped-product-card";

interface ProductListProps {
    title: string;
    items: Product[];
    useGrouping?: boolean; // New prop to enable/disable grouping
}

const ProductList: React.FC<ProductListProps> = ({ title, items, useGrouping = true }) => {
    // Group products by name and image if grouping is enabled
    const groupedItems = useGrouping ? groupProductsByVariant(items) : null;
    const displayItems = useGrouping ? groupedItems : items;
    
    return ( 
        <div className="space-y-4">
            <h3 className="text-3xl font-bold">{title}</h3>
            {displayItems?.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {displayItems?.map((item, index) => (
                    <div key={useGrouping ? (item as GroupedProduct).id : (item as Product).id}>
                        {useGrouping ? (
                            <GroupedProductCard data={item as GroupedProduct} />
                        ) : (
                            <ProductCard data={item as Product} />
                        )}
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default ProductList;