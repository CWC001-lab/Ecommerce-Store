"use client"
import { useState, useMemo, useEffect } from 'react';
import { Product, Category } from "@/types";
import { GroupedProduct, groupProductsByVariant } from "@/lib/utils";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import GroupedProductCard from "@/components/ui/grouped-product-card";

interface FeaturedProductsProps {
    products: Product[];
    categories: Category[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, categories }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');
    const [displayedProducts, setDisplayedProducts] = useState(20);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !selectedCategory || product.category.id === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        // Sort products based on selected option
        if (sortBy === 'price-low') {
            filtered = filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortBy === 'price-high') {
            filtered = filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }

        // Group products by name and image
        const groupedProducts = groupProductsByVariant(filtered);
        
        // Sort grouped products based on selected option
        if (sortBy === 'price-low') {
            groupedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortBy === 'price-high') {
            groupedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }

        return groupedProducts;
    }, [products, searchTerm, selectedCategory, sortBy]);

    // Reset displayed products when filters change
    useEffect(() => {
        setDisplayedProducts(20);
    }, [searchTerm, selectedCategory, sortBy]);

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        // Simulate loading delay
        setTimeout(() => {
            setDisplayedProducts(prev => Math.min(prev + 10, filteredAndSortedProducts.length));
            setIsLoadingMore(false);
        }, 500);
    };

    const visibleProducts = filteredAndSortedProducts.slice(0, displayedProducts);
    const hasMoreProducts = displayedProducts < filteredAndSortedProducts.length;

    return (
        <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Products</h3>
            
            {/* Search and Filters */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-slate-600">
                <div className="space-y-6">
                    {/* Search Bar */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                    </div>
                    
                    {/* Filters Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Filter by Category
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 appearance-none cursor-pointer text-gray-900 dark:text-white"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Sort by Price */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Sort by Price
                            </label>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'default' | 'price-low' | 'price-high')}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 appearance-none cursor-pointer text-gray-900 dark:text-white"
                                >
                                    <option value="default">Default Order</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        {/* Clear Filters */}
                        {(searchTerm || selectedCategory || sortBy !== 'default') && (
                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('');
                                        setSortBy('default');
                                    }}
                                    className="w-full px-6 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-600 hover:border-gray-300 dark:hover:border-slate-500 transition-all duration-200 shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center justify-center gap-2"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-800 px-3 py-2 rounded-lg border dark:border-slate-700">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{visibleProducts.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredAndSortedProducts.length}</span> products
                    {filteredAndSortedProducts.length !== products.length && (
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            (from {products.length} total)
                        </span>
                    )}
                </div>
                {visibleProducts.length > 0 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {visibleProducts.length === filteredAndSortedProducts.length ? 'All results displayed' : 'Partial results'}
                    </div>
                )}
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts?.length === 0 ? (
                <NoResults />
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {visibleProducts.map((item: GroupedProduct) => (
                            <div key={item.id}>
                                <GroupedProductCard data={item} />
                            </div>
                        ))}
                    </div>

                    {/* See More Button */}
                    {hasMoreProducts && (
                        <div className="flex justify-center pt-6">
                            <button
                                onClick={handleLoadMore}
                                disabled={isLoadingMore}
                                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 shadow-sm font-medium flex items-center gap-2"
                            >
                                {isLoadingMore ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                        See More Products
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* End of Results Message */}
                    {!hasMoreProducts && filteredAndSortedProducts.length > 0 && (
                        <div className="text-center py-6">
                            <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 px-4 py-2 rounded-lg inline-block border dark:border-slate-700">
                                You&apos;ve reached the end of the results
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FeaturedProducts;
