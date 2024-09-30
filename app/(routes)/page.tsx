import Container from "@/components/ui/container";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Carousel from "@/components/Carousel";

export const revalidate = 0;

const HomePage = async () => {
    const products = await getProducts({ isFeatured: true })
    return (
        <Container>
            <div className="space-y-10">
                <Carousel />
                <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
                    <ProductList title="Featured Products" items={products} />
                </div>
            </div>
        </Container>
    )
}

export default HomePage;