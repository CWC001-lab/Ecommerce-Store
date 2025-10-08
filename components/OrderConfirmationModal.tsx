import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/modal';
import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import { Upload, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

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
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);
    const [receiptUploaded, setReceiptUploaded] = useState(false);

    // Bank details for Fashion by Oreoluwa
    const bankDetails = {
        bankName: "First Bank",
        accountName: "FBO PRESTIGE",
        accountNumber: "2047086092"
    };

    // Form persistence key
    const FORM_PERSISTENCE_KEY = 'fbo_order_form_data';

    // Load form data from localStorage when modal opens
    useEffect(() => {
        if (isOpen) {
            console.log('Modal opening - checking cart and form data');
            const savedFormData = localStorage.getItem(FORM_PERSISTENCE_KEY);
            const savedReceiptData = localStorage.getItem('fbo_receipt_data');
            
            if (savedFormData) {
                try {
                    const formData = JSON.parse(savedFormData);
                    setCustomerName(formData.customerName || '');
                    setCustomerEmail(formData.customerEmail || '');
                    setPhoneNumber(formData.phoneNumber || '');
                    setAddress(formData.address || '');
                    setShowPaymentDetails(formData.showPaymentDetails || false);
                    
                    // Check if receipt data exists
                    if (savedReceiptData) {
                        console.log('Found saved receipt data, setting receipt as uploaded');
                        setReceiptUploaded(true);
                    } else {
                        console.log('No saved receipt data found');
                        setReceiptUploaded(formData.receiptUploaded || false);
                    }
                    
                    // Show notification if any data was restored (with small delay)
                    if (formData.customerName || formData.customerEmail || formData.phoneNumber || formData.address || savedReceiptData) {
                        setTimeout(() => {
                            toast.success('Form data restored from previous session');
                        }, 500);
                    }
                } catch (error) {
                    console.error('Error loading saved form data:', error);
                    // Clear corrupted data
                    localStorage.removeItem(FORM_PERSISTENCE_KEY);
                }
            }
        }
    }, [isOpen, setAddress, setCustomerEmail, setCustomerName, setPhoneNumber]);

    // Save form data to localStorage whenever form fields change (only when modal is open)
    useEffect(() => {
        if (isOpen) {
            const formData = {
                customerName,
                customerEmail,
                phoneNumber,
                address,
                showPaymentDetails,
                receiptUploaded
            };
            localStorage.setItem(FORM_PERSISTENCE_KEY, JSON.stringify(formData));
            console.log('Form data saved to localStorage:', formData);
        }
    }, [isOpen, customerName, customerEmail, phoneNumber, address, showPaymentDetails, receiptUploaded]);

    // Clear form data when modal is closed or order is completed
    const clearFormData = () => {
        localStorage.removeItem(FORM_PERSISTENCE_KEY);
        localStorage.removeItem('fbo_receipt_data');
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard!`);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file type
            if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
                toast.error('Please upload an image or PDF file');
                return;
            }
            
            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB');
                return;
            }
            
            setReceiptFile(file);
        }
    };

    const handleReceiptUpload = async () => {
        if (!receiptFile) {
            toast.error('Please select a receipt file');
            return;
        }

        setIsUploadingReceipt(true);
        
        try {
            // Convert file to base64 for storage
            const bytes = await receiptFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const base64Receipt = buffer.toString('base64');
            
            // Store receipt data temporarily in localStorage
            const receiptData = {
                file: {
                    name: receiptFile.name,
                    size: receiptFile.size,
                    type: receiptFile.type,
                    base64: base64Receipt
                },
                customerName,
                customerEmail,
                orderTotal: totalPrice,
                uploadedAt: new Date().toISOString()
            };
            
            localStorage.setItem('fbo_receipt_data', JSON.stringify(receiptData));
            console.log('Receipt data stored in localStorage:', receiptData);
            
            setReceiptUploaded(true);
            toast.success('Receipt ready for upload!');
        } catch (error) {
            console.error('Error processing receipt:', error);
            toast.error('Failed to process receipt. Please try again.');
        } finally {
            setIsUploadingReceipt(false);
        }
    };

    const handleConfirmOrder = () => {
        if (!showPaymentDetails) {
            setShowPaymentDetails(true);
            return;
        }
        
        if (!receiptUploaded) {
            toast.error('Please upload your payment receipt before confirming the order');
            return;
        }
        
        // Don't clear form data here - let the parent component handle it after successful order
        // clearFormData();
        onConfirm();
    };

    const handleModalClose = () => {
        // Don't clear form data when modal is closed - let it persist until order is completed
        // clearFormData();
        console.log('Modal closing - cart items should still be there');
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={handleModalClose}>
            <div className='flex flex-col h-full max-h-[90vh] w-full max-w-2xl mx-auto'>
                {/* Header */}
                <div className='flex-shrink-0 mb-4'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-xl font-semibold text-slate-900 dark:text-slate-100'>
                            {showPaymentDetails ? 'Payment & Receipt Upload' : 'Confirm Your Order'}
                        </h2>
                        {!showPaymentDetails && (customerName || customerEmail || phoneNumber || address) && (
                            <span
                                onClick={() => {
                                    setCustomerName('');
                                    setCustomerEmail('');
                                    setPhoneNumber('');
                                    setAddress('');
                                    toast.success('Form cleared');
                                }}
                                className='text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 underline cursor-pointer'
                            >
                                Clear Form
                            </span>
                        )}
                    </div>
                </div>
                
                {/* Scrollable Content */}
                <div className='flex-1 overflow-y-auto space-y-6'>
                    {!showPaymentDetails ? (
                        // Order Details Section
                        <>
                            <div className='space-y-4'>
                                <h3 className='text-md font-semibold text-slate-900 dark:text-slate-100'>
                                    Please enter the correct details and WhatsApp number so an agent can reach out to you after your order has been confirmed.
                                </h3>
                                
                                <div className='space-y-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1'>
                                            Full Name *
                                        </label>
                                        <input
                                            type='text'
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            className='w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                                            placeholder='Your full name'
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1'>
                                            Email Address *
                                        </label>
                                        <input
                                            type='email'
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            className='w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                                            placeholder='your.email@example.com'
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1'>
                                            Phone Number *
                                        </label>
                                        <input
                                            type='tel'
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className='w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                                            placeholder='Your phone number'
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1'>
                                            Delivery Address *
                                        </label>
                                        <textarea
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className='w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                                            placeholder='Your complete delivery address'
                                            rows={3}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className='text-md font-semibold text-slate-900 dark:text-slate-100 mb-3'>Items in Cart:</h3>
                                <ul className='space-y-2'>
                                    {items.map(item => (
                                        <li key={item.id} className='flex justify-between text-slate-700 dark:text-slate-300 py-2 border-b border-slate-200 dark:border-slate-600'>
                                            <span>{item.name}</span>
                                            <span><Currency value={item.price} /></span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <div className='mt-4 pt-4 border-t border-slate-200 dark:border-slate-600'>
                                    <div className='flex justify-between text-lg font-semibold text-slate-900 dark:text-slate-100'>
                                        <span>Total:</span>
                                        <span><Currency value={totalPrice} /></span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Payment Details Section
                        <>
                            <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6'>
                                <h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4'>
                                    Payment Instructions
                                </h3>
                                <p className='text-blue-800 dark:text-blue-200 mb-4'>
                                    Please make payment to the account details below and upload your receipt.
                                </p>
                                
                                <div className='space-y-3'>
                                    <div className='flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded border'>
                                        <div>
                                            <p className='text-sm text-slate-600 dark:text-slate-400'>Bank Name</p>
                                            <p className='font-semibold text-slate-900 dark:text-slate-100'>{bankDetails.bankName}</p>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(bankDetails.bankName, 'Bank name')}
                                            className='p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded'
                                        >
                                            <Copy className='h-4 w-4 text-slate-500' />
                                        </button>
                                    </div>
                                    
                                    <div className='flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded border'>
                                        <div>
                                            <p className='text-sm text-slate-600 dark:text-slate-400'>Account Name</p>
                                            <p className='font-semibold text-slate-900 dark:text-slate-100'>{bankDetails.accountName}</p>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(bankDetails.accountName, 'Account name')}
                                            className='p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded'
                                        >
                                            <Copy className='h-4 w-4 text-slate-500' />
                                        </button>
                                    </div>
                                    
                                    <div className='flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded border'>
                                        <div>
                                            <p className='text-sm text-slate-600 dark:text-slate-400'>Account Number</p>
                                            <p className='font-semibold text-slate-900 dark:text-slate-100'>{bankDetails.accountNumber}</p>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account number')}
                                            className='p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded'
                                        >
                                            <Copy className='h-4 w-4 text-slate-500' />
                                        </button>
                                    </div>
                                    
                                    <div className='flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded border'>
                                        <div>
                                            <p className='text-sm text-slate-600 dark:text-slate-400'>Amount to Pay</p>
                                            <p className='font-semibold text-slate-900 dark:text-slate-100'><Currency value={totalPrice} /></p>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(totalPrice.toString(), 'Amount')}
                                            className='p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded'
                                        >
                                            <Copy className='h-4 w-4 text-slate-500' />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
                                    Upload Payment Receipt
                                </h3>
                                
                                <div className='border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center'>
                                    <Upload className='mx-auto h-12 w-12 text-slate-400 mb-4' />
                                    <div className='space-y-2'>
                                        <p className='text-slate-600 dark:text-slate-400'>
                                            {receiptFile ? receiptFile.name : 'Click to upload or drag and drop'}
                                        </p>
                                        <p className='text-sm text-slate-500 dark:text-slate-500'>
                                            PNG, JPG, PDF up to 5MB
                                        </p>
                                        <input
                                            type='file'
                                            onChange={handleFileChange}
                                            accept='image/*,.pdf'
                                            className='hidden'
                                            id='receipt-upload'
                                        />
                                        <label
                                            htmlFor='receipt-upload'
                                            className='inline-block px-4 py-2 bg-slate-600 text-white rounded-md cursor-pointer hover:bg-slate-700 transition-colors'
                                        >
                                            Choose File
                                        </label>
                                    </div>
                                </div>

                                {receiptFile && !receiptUploaded && (
                                    <Button
                                        onClick={handleReceiptUpload}
                                        disabled={isUploadingReceipt}
                                        className='w-full'
                                    >
                                        {isUploadingReceipt ? 'Uploading...' : 'Upload Receipt'}
                                    </Button>
                                )}

                                {receiptUploaded && (
                                    <div className='flex items-center justify-center space-x-2 text-green-600 dark:text-green-400'>
                                        <CheckCircle className='h-5 w-5' />
                                        <span className='font-medium'>Receipt uploaded successfully!</span>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                
                {/* Footer with Button */}
                <div className='flex-shrink-0 mt-4 pt-4 border-t border-slate-200 dark:border-slate-600'>
                    <Button 
                        className='w-full' 
                        onClick={handleConfirmOrder} 
                        disabled={isProcessing || (showPaymentDetails && !receiptUploaded)}
                    >
                        {isProcessing ? 'Processing Order...' : 
                         showPaymentDetails ? 'Complete Order' : 'Continue to Payment'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default OrderConfirmationModal;