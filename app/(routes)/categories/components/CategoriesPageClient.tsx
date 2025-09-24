"use client"

import { useState } from 'react';
import { Category } from "@/types";
import LoadingLink from "@/components/ui/loading-link";
import Image from "next/image";

interface CategoriesPageClientProps {
    categories: Category[];
}

const CategoriesPageClient: React.FC<CategoriesPageClientProps> = ({ categories }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">All Categories</h1>
                    <p className="text-gray-600 dark:text-gray-300">Browse our complete collection of product categories</p>
                </div>

                {/* Search Bar */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-slate-700 mb-8">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <div className="text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border dark:border-slate-700 shadow-sm inline-block">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredCategories.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{categories.length}</span> categories
                    </div>
                </div>

                {/* Categories Grid */}
                {filteredCategories.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-gray-500 dark:text-gray-400 text-lg">No categories found matching your search.</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredCategories.map((category) => (
                            <LoadingLink
                                key={category.id}
                                href={`/category/${category.id}`}
                                loadingText={`Loading ${category.name}...`}
                                className="block"
                            >
                                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                                    <div className="relative h-48 w-full">
                                        {category.billboard?.imageUrl ? (
                                            <Image
                                                src={category.billboard.imageUrl}
                                                alt={category.name}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                className=""
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                                        )}
                                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <h3 className="text-white text-xl font-bold text-center px-4">
                                                {category.name}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Category</span>
                                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </LoadingLink>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriesPageClient;
