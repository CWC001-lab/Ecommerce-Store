"use client"

import { useState } from 'react';
import Container from "@/components/ui/container";
import FeaturedProducts from "@/components/FeaturedProducts";
import Carousel from "@/components/Carousel";
import AboutUs from "@/components/AboutUs";
import FeaturedBrands from "@/components/FeaturedBrands";
import CategoriesModal from "@/components/CategoriesModal";
import Image from "next/image";
import LoadingLink from "@/components/ui/loading-link";
import { Product, Category } from "@/types";

interface HomePageClientProps {
    products: Product[];
    categories: Category[];
}

const HomePageClient: React.FC<HomePageClientProps> = ({ products, categories }) => {
    const [showCategoriesModal, setShowCategoriesModal] = useState(false);
    
    return (
        <div className="space-y-10">
            {/* Full-width carousel */}
            <Carousel />
            
            {/* About section - moved before categories */}
            <Container>
                <AboutUs />
            </Container>
            
            {/* Categories section with adjusted width */}
            {categories && categories.length > 0 && (
                <div className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold">Shop by Category</h2>
                            <button 
                                onClick={() => setShowCategoriesModal(true)}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                View All Categories
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.slice(0, 4).map((category) => (
                                <LoadingLink 
                                    key={category.id} 
                                    href={`/category/${category.id}`}
                                    loadingText={`Loading ${category.name}...`}
                                >
                                    <div className="relative h-48 w-full cursor-pointer">
                                        {category.billboard?.imageUrl ? (
                                            <Image
                                                src={category.billboard.imageUrl}
                                                alt={category.name}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                className="rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                                        )}
                                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                                            <h3 className="text-white text-xl font-bold text-center">
                                                {category.name}
                                            </h3>
                                        </div>
                                    </div>
                                </LoadingLink>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            {/* Products section with wider width */}
            <Container wide>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col gap-y-8">
                        <FeaturedProducts products={products} categories={categories} />
                    </div>
                    {/* <FeaturedBrands /> */}
                </div>
            </Container>

            {/* Categories Modal */}
            <CategoriesModal 
                categories={categories}
                isOpen={showCategoriesModal}
                onClose={() => setShowCategoriesModal(false)}
            />
        </div>
    );
};

export default HomePageClient;
