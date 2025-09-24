"use client"

import { useState } from 'react';
import { Category } from '@/types';
import { X } from 'lucide-react';
import Image from 'next/image';
import LoadingLink from '@/components/ui/loading-link';

interface CategoriesModalProps {
    categories: Category[];
    isOpen: boolean;
    onClose: () => void;
}

const CategoriesModal: React.FC<CategoriesModalProps> = ({ categories, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white dark:bg-slate-900 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">All Categories</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-300"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <LoadingLink
                                key={category.id}
                                href={`/category/${category.id}`}
                                className="group block"
                                onClick={onClose}
                                loadingText={`Loading ${category.name}...`}
                            >
                                <div className="relative h-32 w-full rounded-lg overflow-hidden">
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
                                        <h3 className="text-white text-sm font-bold text-center px-2">
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>
                            </LoadingLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesModal;
