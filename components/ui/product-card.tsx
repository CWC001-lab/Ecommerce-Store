"use client"

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart, Minus } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import PreviewModal from './../preview-modal';
import usePreviewModal from "@/hooks/use-preview-modal";
import { MouseEventHandler } from 'react';
import useCart from "@/hooks/use-cart";

interface ProductCard {
    data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
    const cart = useCart();
    const previewModal = usePreviewModal();
    const router = useRouter();
    
    // Check if item is already in cart
    const isInCart = cart.items.some(item => item.product.id === data.id);
    
    const handleClick = () => {
        router.push(`/product/${data?.id}`)
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data);
    }

    const onRemoveFromCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.removeItem(data.id);
    }

    return ( 
        <div onClick={handleClick} className="p-3 space-y-4 bg-white dark:bg-slate-800 border dark:border-slate-700 cursor-pointer group rounded-xl">
            {/* Images and Actions */}
            <div className="relative bg-gray-100 dark:bg-slate-700 aspect-square rounded-xl">
                <Image
                    fill
                    src={data?.images?.[0]?.url}
                    alt="Images"
                    className="object-cover rounded-md aspect-square" />
                <div className="absolute w-full px-6 transition opacity-0 group-hover:opacity-100 bottom-5">
                    <div className="flex justify-center gap-x-6">
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-gray-600" />}/>
                        <IconButton
                            onClick={isInCart ? onRemoveFromCart : onAddToCart}
                            icon={
                                isInCart ? 
                                <Minus size={20} className="text-red-600" /> : 
                                <ShoppingCart size={20} className="text-gray-600" />
                            }/>
                    </div>
                </div>
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
            {/* Price */}
            <div className="flex items-center justify-between">
                <Currency value={data?.price} />
            </div>
        </div>
    );
}

export default ProductCard;