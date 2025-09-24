"use client"

import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import OrderConfirmationModal from '../../../../components/OrderConfirmationModal';

const Summary = () => {
    const searchParams = useSearchParams();
    const items = useCart(state => state.items);
    const removeAll = useCart(state => state.removeAll);
    const totalPrice = items.filter(item => item?.product?.price).reduce((total, item) => total + (Number(item.product.price) * item.quantity), 0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if(searchParams.get('success')) {
            toast.success("Payment completed.");
            removeAll();
        }
        if(searchParams.get("canceled")) {
            toast.error("Something went wrong.");
        }
    }, [searchParams, removeAll]);

    const onCheckout = () => {
        setIsModalOpen(true);
    };

    const handleCheckout = async () => {
        if (!customerName || !customerEmail || !phoneNumber || !address) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsProcessing(true);
        
        try {
            const orderData = {
                customerName,
                customerEmail,
                phoneNumber,
                address,
                items: items.filter(item => item?.product?.id).map(item => ({
                    id: item.product.id,
                    name: item.product.name,
                    quantity: item.quantity,
                    price: parseFloat(item.product.price)
                })),
                totalAmount: totalPrice
            };

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderData);
            
            if (response.data.success) {
                // Check if emails were sent successfully
                const emailStatus = response.data.emailStatus;
                if (emailStatus && emailStatus.customerEmail) {
                    toast.success("Order placed successfully! Check your email for payment instructions.");
                } else {
                    toast.success("Order placed successfully! Please note the payment details below.");
                }
                
                setIsModalOpen(false);
                removeAll();
                
                // Store order details for receipt upload
                localStorage.setItem('lastOrder', JSON.stringify({
                    orderId: response.data.orderId,
                    customerName,
                    customerEmail,
                    receiptUploadLink: response.data.receiptUploadLink,
                    bankDetails: response.data.bankDetails
                }));
            } else {
                toast.error("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return ( 
        <div className='px-4 py-6 mt-16 rounded-lg bg-gray-50 dark:bg-slate-800 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900 dark:text-slate-100'>Order Summary</h2>
            <div className='mt-6 space-y-4'>
                <div className='flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-600'>
                    <div className='text-base font-medium text-gray-400 dark:text-slate-300'>
                        Order Total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button disabled={items.length === 0 || isProcessing} className='w-full mt-6' onClick={onCheckout}>
                {isProcessing ? 'Processing...' : 'Continue to checkout'}
            </Button>
            {/* Modal for user input */}
            <OrderConfirmationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                items={items.filter(item => item?.product?.id).map(item => ({ id: item.product.id, name: item.product.name, price: parseFloat(item.product.price) * item.quantity }))}
                totalPrice={totalPrice} 
                phoneNumber={phoneNumber} 
                setPhoneNumber={setPhoneNumber} 
                address={address} 
                setAddress={setAddress}
                customerName={customerName}
                setCustomerName={setCustomerName}
                customerEmail={customerEmail}
                setCustomerEmail={setCustomerEmail}
                onConfirm={handleCheckout}
                isProcessing={isProcessing}
            />
            {/* <div className="mt-4 text-gray-600">
                <p>Please enter the correct details and WhatsApp number so an agent can reach out to you after your order has been confirmed.</p>
            </div> */}
        </div>
    );
};

export default Summary;