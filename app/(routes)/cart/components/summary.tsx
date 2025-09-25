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

    // Track cart changes
    useEffect(() => {
        console.log('🛒 Cart items changed:', items);
        console.log('🛒 Cart items count:', items.length);
        console.log('🛒 Cart items structure:', items.map(item => ({
            hasProduct: !!item?.product,
            productId: item?.product?.id,
            productName: item?.product?.name,
            quantity: item?.quantity
        })));
    }, [items]);

    const onCheckout = () => {
        console.log('🛒 Opening checkout modal - cart items:', items);
        console.log('🛒 Cart items count:', items.length);
        
        if (items.length === 0) {
            console.error('🛒 Cannot open checkout modal - cart is empty');
            toast.error('Your cart is empty. Please add items before checking out.');
            return;
        }
        
        setIsModalOpen(true);
    };

    const handleCheckout = async () => {
        if (!customerName || !customerEmail || !phoneNumber || !address) {
            toast.error("Please fill in all required fields");
            return;
        }
        
        // Check if cart has valid items
        if (items.length === 0) {
            toast.error("Your cart is empty. Please add items before placing an order.");
            return;
        }

        console.log('🛒 Cart items before processing:', items);
        console.log('🛒 Cart items length:', items.length);
        console.log('🛒 Cart items structure before processing:', items.map(item => ({
            hasProduct: !!item?.product,
            productId: item?.product?.id,
            productName: item?.product?.name,
            quantity: item?.quantity
        })));
        
        setIsProcessing(true);
        
        try {
            // Small delay to ensure localStorage is stable
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Get receipt data from localStorage if it exists
            const receiptData = localStorage.getItem('fbo_receipt_data');
            let parsedReceiptData = null;
            
            console.log('Receipt data from localStorage:', receiptData);
            console.log('All localStorage keys:', Object.keys(localStorage));
            console.log('Form persistence data:', localStorage.getItem('fbo_order_form_data'));
            
            if (receiptData) {
                try {
                    parsedReceiptData = JSON.parse(receiptData);
                    console.log('Parsed receipt data:', parsedReceiptData);
                } catch (error) {
                    console.error('Error parsing receipt data:', error);
                }
            } else {
                console.log('No receipt data found in localStorage');
            }

            console.log('🛒 Current cart items:', items);
            console.log('🛒 Filtered cart items:', items.filter(item => item?.product?.id));
            console.log('🛒 Filtered cart items details:', items.filter(item => item?.product?.id).map(item => ({
                id: item.product.id,
                name: item.product.name,
                quantity: item.quantity,
                price: item.product.price
            })));
            
            const filteredItems = items.filter(item => item?.product?.id);
            
            // If no items found, this might be a cart state issue
            if (filteredItems.length === 0) {
                console.error('🛒 No valid cart items found! This might be a cart state issue.');
                console.error('🛒 Raw cart items:', items);
                console.error('🛒 localStorage cart data:', localStorage.getItem('cart-storage'));
                toast.error('Cart appears to be empty. Please add items to your cart and try again.');
                setIsProcessing(false);
                return;
            }
            
            const orderData = {
                customerName,
                customerEmail,
                phoneNumber,
                address,
                items: filteredItems.map(item => ({
                    id: item.product.id,
                    name: item.product.name,
                    quantity: item.quantity,
                    price: parseFloat(item.product.price)
                })),
                totalAmount: totalPrice,
                receiptData: parsedReceiptData // Include receipt data if available
            };

            console.log('Sending order data:', orderData);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderData);
            console.log('Order response:', response.data);
            
            if (response.data.success) {
                // Check if emails were sent successfully
                const emailStatus = response.data.emailStatus;
                if (emailStatus && emailStatus.customerEmail && emailStatus.customerEmail.success) {
                    toast.success("Order placed successfully! Check your email for confirmation.");
                } else {
                    toast.success("Order placed successfully! You will receive confirmation shortly.");
                }
                
                // Clear cart and data only after successful order
                setIsModalOpen(false);
                removeAll();
                
                // Clear any stored order data since we're handling everything in the modal now
                localStorage.removeItem('lastOrder');
                // Clear form data as well
                localStorage.removeItem('fbo_order_form_data');
                // Clear receipt data
                localStorage.removeItem('fbo_receipt_data');
            } else {
                const errorMessage = response.data.message || "Failed to place order. Please try again.";
                toast.error(errorMessage);
                console.error('Order failed:', response.data);
            }
        } catch (error: any) {
            console.error('Error placing order:', error);
            if (error.response) {
                // Server responded with error status
                const errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
                toast.error(errorMessage);
                console.error('Server error response:', error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                toast.error("Network error. Please check your connection and try again.");
                console.error('Network error:', error.request);
            } else {
                // Something else happened
                toast.error("An unexpected error occurred. Please try again.");
                console.error('Unexpected error:', error.message);
            }
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
                onClose={() => {
                    console.log('Closing modal - cart items before close:', items);
                    setIsModalOpen(false);
                    console.log('Modal closed - cart items after close:', items);
                }} 
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