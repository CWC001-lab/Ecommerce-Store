"use client"

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler, useState } from "react";
import { VariantSelector } from "@/components/ui/variant-selector";
import { getAvailableSizes, getAvailableColors, getProductPriceRange } from "@/lib/utils";

interface InfoProps {
    data: Product & { variants?: Product[] };
}

const Info: React.FC<InfoProps> = ({ data }) => {
    const cart = useCart();
    const [variantModalOpen, setVariantModalOpen] = useState(false);
    
    // Use variants from data structure (exactly like GroupedProductCard)
    const variants = data.variants || [];
    const hasVariants = data.hasVariants && variants.length > 0;
    
    // Check if any variant is in cart (like GroupedProductCard)
    const isInCart = variants.length > 0 ? 
        variants.some(variant => cart.items.some(item => item.product.id === variant.id)) :
        cart.items.some(item => item.product.id === data.id);
    
    const cartItem = cart.items.find(item => item.product.id === data.id);

    // Get available sizes, colors, and price range (exactly like GroupedProductCard)
    const availableSizes = hasVariants ? getAvailableSizes(variants) : [];
    const availableColors = hasVariants ? getAvailableColors(variants) : [];
    const priceRange = hasVariants ? getProductPriceRange(variants) : null;

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        if (hasVariants) {
            setVariantModalOpen(true);
        } else {
            cart.addItem(data);
        }
    };

    const onRemoveFromCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        if (hasVariants) {
            // Remove all variants from cart (like GroupedProductCard)
            variants.forEach(variant => {
                cart.removeItem(variant.id);
            });
        } else {
            cart.removeItem(data.id);
        }
    };

    const onIncreaseQuantity = () => {
        cart.addItem(data);
    };

    const onDecreaseQuantity = () => {
        if (cartItem && cartItem.quantity > 1) {
            cart.updateQuantity(data.id, cartItem.quantity - 1);
        } else {
            cart.removeItem(data.id);
        }
    };

    const handleVariantAddToCart = (selections: { variant: Product; quantity: number }[]) => {
        // Add all selected variants to cart
        selections.forEach(selection => {
            cart.addItem(selection.variant, selection.quantity);
        });
    };

    const handleVariantRemoveFromCart = () => {
        // Remove all variants from cart (like GroupedProductCard)
        variants.forEach(variant => {
            cart.removeItem(variant.id);
        });
    };

    return ( 
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">{data.name}</h1>
            <div className="flex items-end justify-between mt-3">
                <p className="text-2xl text-gray-900 dark:text-slate-100">
                    {hasVariants && priceRange ? (
                        <span className="text-green-600 dark:text-green-400 font-bold">
                            {priceRange}
                        </span>
                    ) : (
                        <Currency value={data?.price} />
                    )}
                </p>
                {hasVariants && (
                    <span className="text-xs text-blue-600 dark:text-blue-400">
                        {variants.length} variants
                    </span>
                )}
            </div>
            <hr className="my-4 border-slate-200 dark:border-slate-700" />
            
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black dark:text-slate-100">Size:</h3>
                    <div className="text-slate-600 dark:text-slate-300">
                        {data?.size?.value}
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black dark:text-slate-100">Color:</h3>
                    <div className="w-6 h-6 border border-gray-600 dark:border-slate-400 rounded-full" style={{ backgroundColor: data?.color?.value }}/>
                </div>
            </div>

            {/* Available Variants - Exactly like GroupedProductCard */}
            {hasVariants && (
                <div className="mt-6 space-y-4">
                    <h3 className="font-semibold text-black dark:text-slate-100">Available Options:</h3>
                    {variants.length > 0 && (
                        <>
                            {/* Available Sizes */}
                            {availableSizes.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Sizes:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {availableSizes.map((size) => (
                                            <span 
                                                key={size.id}
                                                className="px-3 py-1 text-sm bg-gray-100 dark:bg-slate-700 rounded-md text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-600"
                                            >
                                                {size.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Available Colors */}
                            {availableColors.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Colors:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {availableColors.map((color) => (
                                            <div 
                                                key={color.id}
                                                className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-slate-700 rounded-md text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-600"
                                            >
                                                <div 
                                                    className="w-4 h-4 rounded-full border border-gray-300"
                                                    style={{ backgroundColor: color.value }}
                                                />
                                                <span>{color.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            <div className="flex items-center mt-10 gap-x-4">
                {isInCart ? (
                    <div className="flex items-center gap-x-4">
                        <div className="flex items-center gap-x-2 border border-slate-300 dark:border-slate-600 rounded-lg">
                            <button
                                onClick={onDecreaseQuantity}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l-lg transition-colors"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                                {cartItem?.quantity || 1}
                            </span>
                            <button
                                onClick={onIncreaseQuantity}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-lg transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                        <Button onClick={onRemoveFromCart} className="flex items-center gap-x-2 bg-red-600 hover:bg-red-700">
                            Remove
                            <Minus />
                        </Button>
                    </div>
                ) : (
                    <Button onClick={onAddToCart} className="flex items-center gap-x-2">
                        {hasVariants ? "Choose Options" : "Add To Cart"}
                        <ShoppingCart />
                    </Button>
                )}
            </div>

            {/* Variant Selector Modal - Exactly like GroupedProductCard */}
            <VariantSelector
                isOpen={variantModalOpen}
                onClose={() => setVariantModalOpen(false)}
                product={variants.length > 0 ? variants[0] : data}
                variants={variants}
                onAddToCart={handleVariantAddToCart}
                isInCart={isInCart}
                onRemoveFromCart={handleVariantRemoveFromCart}
            />
        </div>
     );
}
 
export default Info;