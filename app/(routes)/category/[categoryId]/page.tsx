import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import CategoryPageClient from "./components/CategoryPageClient";

export const revalidate = 0;

interface CategoryPageProps {
    params: {
        categoryId: string;
    },
    searchParams: {
        colorId: string;
        sizeId: string;
        sortBy: string;
    }
}

const CategoryPage:React.FC<CategoryPageProps> = async ({ params, searchParams }) => {
    const products = await getProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId
    })
    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(params.categoryId)
    
    if (!category) {
        return (
            <div className="bg-white dark:bg-slate-900">
                <Container>
                    <div className="px-4 pb-24 sm:px-6 lg:px-8">
                        <div className="text-center py-16">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Category Not Found</h1>
                            <p className="text-gray-600 dark:text-gray-300">The category you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    
    return ( 
        <div className="bg-white dark:bg-slate-900">
            <Container>
                <Billboard data={category.billboard} />
                <CategoryPageClient 
                    products={products}
                    sizes={sizes}
                    colors={colors}
                    category={category}
                    searchParams={searchParams}
                />
            </Container>
        </div>
    );
}

export default CategoryPage;