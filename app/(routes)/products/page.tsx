import Container from "@/components/ui/container";
import getProducts from "@/actions/get-products";
import getCategories from "@/actions/get-categories";
import getColors from "@/actions/get-colors";
import getSizes from "@/actions/get-sizes";
import ProductsPageClient from "./components/ProductsPageClient";

export const revalidate = 0;

const ProductsPage = async () => {
    const products = await getProducts({});
    const categories = await getCategories();
    const colors = await getColors();
    const sizes = await getSizes();
    
    return (
        <ProductsPageClient 
            products={products} 
            categories={categories}
            colors={colors}
            sizes={sizes}
        />
    );
};

export default ProductsPage;
