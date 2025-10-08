import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

interface ProductPageProps {
    params: {
        productId: string
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
    const product = await getProduct(params.productId);
    
    if (!product) {
        return (
            <div className="bg-white dark:bg-slate-900">
                <Container>
                    <div className="px-4 py-10 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h1>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">The product you&apos;re looking for doesn&apos;t exist.</p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    
    const suggestProducts = await getProducts({ categoryId: product?.category?.id })
    return ( 
        <div className="bg-white dark:bg-slate-900">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {/* Gallery */}
                        <Gallery images={product.images || []} />
                        <div className="px-4 mt-0 sm:mt-16 sm:px-0 lg:mt-0">
                            {/* Info */}
                            <Info data={product} />
                        </div>
                    </div>
                    <hr className="my-10"/>
                    <ProductList title="Related Items" items={suggestProducts} useGrouping={true} />
                </div>
            </Container>
        </div>
     );
}
 
export default ProductPage;