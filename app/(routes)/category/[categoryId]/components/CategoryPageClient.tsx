"use client"

import { useState, useMemo } from 'react';
import { Product, Color, Size, Category } from "@/types";
import Filter from "./filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./mobile-filters";

interface CategoryPageClientProps {
    products: Product[];
    sizes: Size[];
    colors: Color[];
    category: Category;
    searchParams: {
        colorId: string;
        sizeId: string;
        sortBy: string;
    };
}

const CategoryPageClient: React.FC<CategoryPageClientProps> = ({ 
    products, 
    sizes, 
    colors, 
    category,
    searchParams 
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });

        // Sort products based on sortBy parameter
        if (searchParams.sortBy === 'price-low') {
            filtered = filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (searchParams.sortBy === 'price-high') {
            filtered = filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }

        return filtered;
    }, [products, searchTerm, searchParams.sortBy]);

    return (
        <div className="bg-white dark:bg-slate-900">
            <div className="px-4 pb-24 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                    {/* Mobile Filters */}
                    <MobileFilters sizes={sizes} colors={colors} />
                    
                    {/* Desktop Filters */}
                    <div className="hidden lg:block">
                        <Filter
                            valueKey="sizeId"
                            name="Sizes"
                            data={sizes}
                        />
                        <Filter
                            valueKey="colorId"
                            name="Colors"
                            data={colors}
                        />
                    </div>
                    
                    <div className="mt-6 lg:col-span-4 lg:mt-0">
                        {/* Search Bar */}
                        <div className="mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder={`Search ${category.name} products...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mb-4">
                            <div className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-800 px-3 py-2 rounded-lg border dark:border-slate-700 inline-block">
                                Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredAndSortedProducts.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{products.length}</span> products
                                {searchTerm && (
                                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                        (filtered by &quot;{searchTerm}&quot;)
                                    </span>
                                )}
                                {searchParams.sortBy && searchParams.sortBy !== 'default' && (
                                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                        (sorted by {searchParams.sortBy === 'price-low' ? 'price: low to high' : 'price: high to low'})
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredAndSortedProducts?.length === 0 ? (
                            <NoResults />
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {filteredAndSortedProducts.map(item => (
                                    <ProductCard key={item.id} data={item} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPageClient;
