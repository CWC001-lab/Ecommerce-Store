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
    customerName: string;
    setCustomerName: (value: string) => void;
    customerEmail: string;
    setCustomerEmail: (value: string) => void;
    onConfirm: () => void;
    isProcessing: boolean;
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
    customerName,
    setCustomerName,
    customerEmail,
    setCustomerEmail,
    onConfirm,
    isProcessing,
}) => {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className='flex flex-col h-full max-h-[80vh]'>
                {/* Header with Button */}
                <div className='flex-shrink-0 mb-4'>
                    <h2 className='text-lg font-medium text-slate-900 dark:text-slate-100 mb-4'>Confirm Your Order</h2>
                    <Button className='w-full' onClick={onConfirm} disabled={isProcessing}>
                        {isProcessing ? 'Processing Order...' : 'Confirm and Checkout'}
                    </Button>
                </div>
                
                {/* Scrollable Content */}
                <div className='flex-1 overflow-y-auto'>
                    <div className='flex flex-col md:flex-row gap-4'>
                        {/* Combined Text and Items Section */}
                        <div className='flex-1'>
                            <h3 className='text-md font-semibold text-slate-900 dark:text-slate-100'>Please enter the correct details and WhatsApp number so an agent can reach out to you after your order has been confirmed.</h3>
                            <h3 className='text-md font-semibold mt-4 text-slate-900 dark:text-slate-100'>Items in Cart:</h3>
                            <ul className='mt-2'>
                                {items.map(item => (
                                    <li key={item.id} className='flex justify-between text-slate-700 dark:text-slate-300 py-1'>
                                        <span>{item.name}</span>
                                        <span><Currency value={item.price} /></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Form Section */}
                        <div className='flex-1'>
                            <div className='mt-4'>
                                <label className='block text-gray-700 dark:text-slate-300 mb-2'>Full Name *</label>
                                <input 
                                    type='text' 
                                    value={customerName} 
                                    onChange={(e) => setCustomerName(e.target.value)} 
                                    className='border border-gray-300 dark:border-slate-600 rounded w-full p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400'
                                    placeholder='Your Full Name'
                                    required
                                />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 dark:text-slate-300 mb-2'>Email Address *</label>
                                <input 
                                    type='email' 
                                    value={customerEmail} 
                                    onChange={(e) => setCustomerEmail(e.target.value)} 
                                    className='border border-gray-300 dark:border-slate-600 rounded w-full p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400'
                                    placeholder='your.email@example.com'
                                    required
                                />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 dark:text-slate-300 mb-2'>Phone Number *</label>
                                <input 
                                    type='text' 
                                    value={phoneNumber} 
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                    className='border border-gray-300 dark:border-slate-600 rounded w-full p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400'
                                    placeholder='Your Phone Number'
                                    required
                                />
                            </div>
                            <div className='mt-4'>
                                <label className='block text-gray-700 dark:text-slate-300 mb-2'>Delivery Address *</label>
                                <textarea 
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)} 
                                    className='border border-gray-300 dark:border-slate-600 rounded w-full p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400'
                                    placeholder='Your complete delivery address'
                                    rows={3}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default OrderConfirmationModal;
