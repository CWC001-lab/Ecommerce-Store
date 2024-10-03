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
    const totalPrice = items.reduce((total, item) => total + Number(item.price), 0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

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

    const handleCheckout = () => {
        const subject = "New Order Alert From FBO Store";
        const body = `Hello, I would like to purchase the following items: ${items.map(item => item.name).join(', ')} which total to ${totalPrice}. My phone number is ${phoneNumber} and my address is ${address}. Thank you.`;
        const mailtoLink = `mailto:oderindeoluwadamilola46@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        // Proceed with checkout logic if needed
        // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        //     productIds: items.map(item => item.id),
        // });
        // window.location = response.data.url;
    };

    return ( 
        <div className='px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
            <div className='mt-6 space-y-4'>
                <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                    <div className='text-base font-medium text-gray-400'>
                        Order Total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button disabled={items.length === 0} className='w-full mt-6' onClick={onCheckout}>
                Continue to checkout
            </Button>
            {/* Modal for user input */}
            <OrderConfirmationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                items={items.map(item => ({ id: item.id, name: item.name, price: parseFloat(item.price) }))}
                totalPrice={totalPrice} 
                phoneNumber={phoneNumber} 
                setPhoneNumber={setPhoneNumber} 
                address={address} 
                setAddress={setAddress} 
                onConfirm={handleCheckout} 
            />
            {/* <div className="mt-4 text-gray-600">
                <p>Please enter the correct details and WhatsApp number so an agent can reach out to you after your order has been confirmed.</p>
            </div> */}
        </div>
    );
};

export default Summary;