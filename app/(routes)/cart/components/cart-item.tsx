"use client"
import Currency from '@/components/ui/currency';
import IconButton from '@/components/ui/icon-button';
import useCart from '@/hooks/use-cart';
import { X, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { Product } from '@/types';

interface CartItemProps {
    data: {
        product: Product;
        quantity: number;
    };
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {

    const cart = useCart();

    const onRemove = () => {
        cart.removeItem(data.product.id);
    }

    const onIncreaseQuantity = () => {
        cart.addItem(data.product);
    }

    const onDecreaseQuantity = () => {
        if (data.quantity > 1) {
            cart.updateQuantity(data.product.id, data.quantity - 1);
        } else {
            cart.removeItem(data.product.id);
        }
    }

    return (
        <li className='flex py-6 border-b border-slate-200 dark:border-slate-700'>
            <div className='relative w-24 h-24 overflow-hidden rounded-md sm:h-48 sm:w-48'>
                <Image
                    fill
                    src={data.product.images[0].url}
                    alt=""
                    className='object-cover object-center'
                />
            </div>
            <div className='relative flex flex-col justify-between flex-1 ml-4 sm:ml-6'>
                <div className='absolute top-0 right-0 z-10'>
                    <IconButton onClick={onRemove} icon={<X size={15} className="text-red-600 dark:text-red-400" />} />
                </div>
                <div className='relative pr-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                    <div className='flex justify-between'>
                        <p className='text-lg font-semibold text-black dark:text-slate-100'>
                            {data.product.name}
                        </p>
                    </div>
                    <div className='flex flex-col mt-1 text-sm gap-2'>
                        <div className='flex items-center gap-2'>
                            <span className='text-gray-500 dark:text-slate-400'>Color:</span>
                            <div className='flex items-center gap-1'>
                                <div 
                                    className='w-4 h-4 rounded-full border border-gray-300'
                                    style={{ backgroundColor: data.product.color.value }}
                                />
                                <span className='text-slate-700 dark:text-slate-300'>{data.product.color.name}</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-gray-500 dark:text-slate-400'>Size:</span>
                            <span className='text-slate-700 dark:text-slate-300'>{data.product.size.name}</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-between mt-4'>
                        <div className='flex flex-col'>
                            <Currency value={data.product.price} />
                            {data.quantity > 1 && (
                                <span className='text-sm text-slate-500 dark:text-slate-400'>
                                    Total: <Currency value={parseFloat(data.product.price) * data.quantity} />
                                </span>
                            )}
                        </div>
                        <div className='flex items-center gap-x-2 border border-slate-300 dark:border-slate-600 rounded-lg'>
                            <button
                                onClick={onDecreaseQuantity}
                                className='p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l-lg transition-colors text-slate-700 dark:text-slate-300'
                            >
                                <Minus size={14} />
                            </button>
                            <span className='px-3 py-1 text-sm font-medium text-slate-900 dark:text-slate-100'>
                                {data.quantity}
                            </span>
                            <button
                                onClick={onIncreaseQuantity}
                                className='p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-lg transition-colors text-slate-700 dark:text-slate-300'
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CartItem;