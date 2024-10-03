import React from 'react';
import Modal from '@/components/ui/modal'; // Assuming you have a Modal component
import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';

interface OrderConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: { id: string; name: string; price: number }[];
    totalPrice: number;
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
    address: string;
    setAddress: (value: string) => void;
    onConfirm: () => void;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
    isOpen,
    onClose,
    items,
    totalPrice,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    onConfirm,
}) => {
    return (
        <Modal open={isOpen} onClose={onClose}>
            {/* <h2 className='text-lg font-medium'>Confirm Your Order</h2> */}
            <div className='flex flex-col md:flex-row mt-4'>
                {/* Combined Text and Items Section */}
                <div className='flex-1 mr-4 mb-4 md:mb-0'>
                    <h3 className='text-md font-semibold'>Please enter the correct details and WhatsApp number so an agent can reach out to you after your order has been confirmed.</h3>
                    <h3 className='text-md font-semibold mt-4'>Items in Cart:</h3>
                    <ul>
                        {items.map(item => (
                            <li key={item.id} className='flex justify-between'>
                                <span>{item.name}</span>
                                <span><Currency value={item.price} /></span>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Form Section */}
                <div className='flex-1'>
                    <div className='mt-4'>
                        <label className='block text-gray-700'>Phone Number</label>
                        <input 
                            type='text' 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                            className='border rounded w-full p-2'
                            placeholder='Your Phone Number'
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='block text-gray-700'>Address</label>
                        <input 
                            type='text' 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            className='border rounded w-full p-2'
                            placeholder='Your Address'
                        />
                    </div>
                    <Button className='mt-4' onClick={onConfirm}>
                        Confirm and Checkout
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default OrderConfirmationModal;
