"use client"

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler } from "react";

interface InfoProps {
    data: Product;
}
const Info: React.FC<InfoProps> = ({ data }) => {
    const cart = useCart();
    
    // Check if item is already in cart
    const isInCart = cart.items.some(item => item.product.id === data.id);
    const cartItem = cart.items.find(item => item.product.id === data.id);

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data);
    };

    const onRemoveFromCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.removeItem(data.id);
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

    return ( 
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">{data.name}</h1>
            <div className="flex items-end justify-between mt-3">
                <p className="text-2xl text-gray-900 dark:text-slate-100">
                    <Currency value={data?.price} />
                </p>
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
                        Add To Cart
                        <ShoppingCart />
                    </Button>
                )}
            </div>
        </div>
     );
}
 
export default Info;