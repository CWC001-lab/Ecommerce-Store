"use client"
import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";

const CartPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const cart = useCart();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null
    }

    return ( 
        <div className="bg-white dark:bg-slate-900">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-black dark:text-slate-100">Shopping Cart</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {cart?.items?.length === 0 && <p className="text-neutral-500 dark:text-slate-400">No items added to cart</p>}
                            <ul>
                                {cart?.items?.filter(item => item?.product?.id).map(item => (
                                    <CartItem
                                        key={item.product.id}
                                        data={item}
                                    />
                                ))}
                            </ul>
                        </div>
                        <Summary />
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default CartPage;