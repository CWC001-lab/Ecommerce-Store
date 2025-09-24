"use client";

import { useState, useEffect } from "react";
import { Color, Size } from '@/types'
import Button from "@/components/ui/button";
import { Plus, X, Check } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useSearchParams, useRouter } from "next/navigation";
import qs from 'query-string';

interface MobileFiltersProps {
    sizes: Size[];
    colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
    const [open, setOpen] = useState(false);
    const [tempFilters, setTempFilters] = useState({
        sizeId: '',
        colorId: '',
        sortBy: 'default'
    });
    
    const searchParams = useSearchParams();
    const router = useRouter();

    // Initialize temp filters with current URL params
    useEffect(() => {
        setTempFilters({
            sizeId: searchParams.get('sizeId') || '',
            colorId: searchParams.get('colorId') || '',
            sortBy: searchParams.get('sortBy') || 'default'
        });
    }, [searchParams]);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    const handleFilterChange = (key: string, value: string) => {
        setTempFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const applyFilters = () => {
        const current = qs.parse(searchParams.toString());
        const query = {
            ...current,
            sizeId: tempFilters.sizeId || null,
            colorId: tempFilters.colorId || null,
            sortBy: tempFilters.sortBy !== 'default' ? tempFilters.sortBy : null
        };

        const url = qs.stringifyUrl({
            url: window.location.pathname,
            query
        }, { skipNull: true });

        router.push(url);
        onClose();
    };

    const clearFilters = () => {
        setTempFilters({
            sizeId: '',
            colorId: '',
            sortBy: 'default'
        });
    };

    const hasActiveFilters = tempFilters.sizeId || tempFilters.colorId || tempFilters.sortBy !== 'default';

    return (
        <>
            <Button className="flex items-center gap-x-2 lg:hidden" onClick={onOpen}>
                Filters
                <Plus size={20} />
            </Button>
            <Dialog open={open} as="div" className="relative z-[60] lg:hidden" onClose={onClose}>
                {/* Background with animation */}
                <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300"/>
                
                {/* Dialog Position with slide-up animation */}
                <div className="fixed inset-0 z-[60] flex items-end justify-center p-0">
                    <Dialog.Panel className="relative w-full bg-white dark:bg-slate-900 rounded-t-2xl shadow-2xl transform transition-all duration-300 ease-out" style={{ height: '75vh' }}>
                        {/* Header - Fixed */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Filters</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-300"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="overflow-y-auto" style={{ height: 'calc(75vh - 80px)' }}>
                            {/* Action Buttons */}
                            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                                <div className="flex gap-3">
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="flex-1 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                    <button
                                        onClick={applyFilters}
                                        className="flex-1 px-4 py-3 text-sm font-medium text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Check size={16} />
                                        Apply Filters
                                    </button>
                                </div>
                            </div>

                            {/* Filters Content */}
                            <div className="p-4 space-y-6 pb-8">
                                {/* Size Filter */}
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Size</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {sizes.map((size) => (
                                            <button
                                                key={size.id}
                                                onClick={() => handleFilterChange('sizeId', tempFilters.sizeId === size.id ? '' : size.id)}
                                                className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                                                    tempFilters.sizeId === size.id
                                                        ? 'bg-slate-600 text-white border-slate-600'
                                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
                                                }`}
                                            >
                                                {size.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Filter */}
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Color</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {colors.map((color) => (
                                            <button
                                                key={color.id}
                                                onClick={() => handleFilterChange('colorId', tempFilters.colorId === color.id ? '' : color.id)}
                                                className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                                                    tempFilters.colorId === color.id
                                                        ? 'bg-slate-600 text-white border-slate-600'
                                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
                                                }`}
                                            >
                                                {color.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Sort Filter */}
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Sort by Price</h3>
                                    <div className="space-y-2">
                                        {[
                                            { value: 'default', label: 'Default Order' },
                                            { value: 'price-low', label: 'Price: Low to High' },
                                            { value: 'price-high', label: 'Price: High to Low' }
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => handleFilterChange('sortBy', option.value)}
                                                className={`w-full px-4 py-3 text-sm rounded-lg border transition-all duration-200 text-left ${
                                                    tempFilters.sortBy === option.value
                                                        ? 'bg-slate-600 text-white border-slate-600'
                                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};

export default MobileFilters;