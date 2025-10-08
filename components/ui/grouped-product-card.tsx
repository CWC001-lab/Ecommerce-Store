"use client"

import { GroupedProduct, getProductPriceRange, getAvailableSizes, getAvailableColors } from "@/lib/utils";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart, Minus } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import PreviewModal from './../preview-modal';
import usePreviewModal from "@/hooks/use-preview-modal";
import { MouseEventHandler, useState } from 'react';
import useCart from "@/hooks/use-cart";
import { VariantSelector } from "@/components/ui/variant-selector";

interface GroupedProductCardProps {
    data: GroupedProduct;
}

const GroupedProductCard: React.FC<GroupedProductCardProps> = ({ data }) => {
    const cart = useCart();
    const previewModal = usePreviewModal();
    const router = useRouter();
    const [variantModalOpen, setVariantModalOpen] = useState(false);
    
    // Check if any variant is in cart
    const isInCart = data.variants.some(variant => 
        cart.items.some(item => item.product.id === variant.id)
    );
    
    // const handleClick = () => {
    //     router.push(`/product/${data?.id}`)
    // }


    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data.variants[0]);
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        if (data.hasVariants) {
            setVariantModalOpen(true);
        } else {
            cart.addItem(data.variants[0]);
        }
    }

    const onRemoveFromCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        // Remove all variants from cart
        data.variants.forEach(variant => {
            cart.removeItem(variant.id);
        });
    }

    const handleVariantAddToCart = (selections: { variant: any; quantity: number }[]) => {
        // Add all selected variants to cart
        selections.forEach(selection => {
            cart.addItem(selection.variant, selection.quantity);
        });
    }

    const handleVariantRemoveFromCart = () => {
        // Remove all variants from cart
        data.variants.forEach(variant => {
            cart.removeItem(variant.id);
        });
    }

    const availableSizes = getAvailableSizes(data.variants);
    const availableColors = getAvailableColors(data.variants);
    const priceRange = getProductPriceRange(data.variants);

    return ( 
        <>
            <div className="p-3 space-y-4 bg-white dark:bg-slate-800 border dark:border-slate-700 cursor-pointer group rounded-xl">
                {/* Images and Actions */}
                <div className="relative bg-gray-100 dark:bg-slate-700 aspect-square rounded-xl">
                    <Image
                        fill
                        src={data?.images?.[0]?.url}
                        alt="Images"
                        className="object-cover rounded-md aspect-square" />
                    
                </div>
                
                {/* Description */}
                <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {data?.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {data.category.name}
                    </p>
                </div>
                
                {/* Variant Info */}
                {data.hasVariants && (
                    <div className="space-y-2">
                        {/* Available Sizes */}
                        {availableSizes.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {availableSizes.slice(0, 4).map((size) => (
                                    <span 
                                        key={size.id}
                                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 rounded-md text-gray-700 dark:text-gray-300"
                                    >
                                        {size.name}
                                    </span>
                                ))}
                                {availableSizes.length > 4 && (
                                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 rounded-md text-gray-700 dark:text-gray-300">
                                        +{availableSizes.length - 4} more
                                    </span>
                                )}
                            </div>
                        )}
                        
                        {/* Available Colors */}
                        {availableColors.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {availableColors.slice(0, 4).map((color) => (
                                    <span 
                                        key={color.id}
                                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 rounded-md text-gray-700 dark:text-gray-300"
                                    >
                                        {color.name}
                                    </span>
                                ))}
                                {availableColors.length > 4 && (
                                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 rounded-md text-gray-700 dark:text-gray-300">
                                        +{availableColors.length - 4} more
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                )}
                
                {/* Price */}
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-black dark:text-white">
                        {priceRange}
                    </span>
                    {data.hasVariants && (
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                            {data.variants.length} variants
                        </span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <div className="mt-3">
                    <button
                        onClick={isInCart ? onRemoveFromCart : onAddToCart}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors border ${
                            isInCart 
                                ? 'bg-white dark:bg-black text-black dark:text-white border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800' 
                                : 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-200'
                        }`}
                    >
                        {isInCart ? 'Remove from Cart' : (data.hasVariants ? 'Choose Options' : 'Add to Cart')}
                    </button>
                </div>
            </div>

            {/* Variant Selector Modal */}
            <VariantSelector
                isOpen={variantModalOpen}
                onClose={() => setVariantModalOpen(false)}
                product={data.variants[0]}
                variants={data.variants}
                onAddToCart={handleVariantAddToCart}
                isInCart={isInCart}
                onRemoveFromCart={handleVariantRemoveFromCart}
            />
        </>
    );
}

export default GroupedProductCard;
