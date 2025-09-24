import Container from "@/components/ui/container";
import getProducts from "@/actions/get-products";
import getCategories from "@/actions/get-categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Carousel from "@/components/Carousel";
import AboutUs from "@/components/AboutUs";
import FeaturedBrands from "@/components/FeaturedBrands";
import HomePageClient from "./components/HomePageClient";

export const revalidate = 0;

const HomePage = async () => {
    const products = await getProducts({ isFeatured: true })
    const categories = await getCategories()
    
    return (
        <HomePageClient 
            products={products} 
            categories={categories}
        />
    )
}

export default HomePage;