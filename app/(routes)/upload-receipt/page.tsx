"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/ui/container';
import Button from '@/components/ui/button';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const UploadReceiptPage = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    useEffect(() => {
        // Try to get order details from localStorage
        const lastOrder = localStorage.getItem('lastOrder');
        if (lastOrder) {
            const orderData = JSON.parse(lastOrder);
            if (orderData.orderId === orderId) {
                setCustomerName(orderData.customerName);
                setCustomerEmail(orderData.customerEmail);
            }
        }
    }, [orderId]);

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

    const handleUpload = async () => {
        if (!receiptFile || !customerName || !customerEmail) {
            toast.error('Please fill in all fields and select a receipt file');
            return;
        }

        setIsUploading(true);
        
        try {
            const formData = new FormData();
            formData.append('receipt', receiptFile);
            formData.append('orderId', orderId || '');
            formData.append('customerName', customerName);
            formData.append('customerEmail', customerEmail);

            const response = await axios.post(
                `/api/upload-receipt`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.success) {
                setUploadSuccess(true);
                toast.success('Receipt uploaded successfully!');
                
                // Clear localStorage
                localStorage.removeItem('lastOrder');
            } else {
                toast.error('Failed to upload receipt. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading receipt:', error);
            toast.error('Failed to upload receipt. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    if (uploadSuccess) {
        return (
            <div className="bg-white dark:bg-slate-900 min-h-screen">
                <Container>
                    <div className="px-4 py-16 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                                Receipt Uploaded Successfully!
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                                Thank you for uploading your payment receipt. We have received it and will verify your payment shortly.
                            </p>
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                                    What&apos;s Next?
                                </h3>
                                <ul className="text-left text-green-700 dark:text-green-300 space-y-2">
                                    <li>• We&apos;ll verify your payment receipt</li>
                                    <li>• Once confirmed, we&apos;ll start preparing your order</li>
                                    <li>• You&apos;ll receive shipping details when ready</li>
                                    <li>• Expected processing time: 1-2 business days</li>
                                </ul>
                            </div>
                            <Button 
                                onClick={() => window.location.href = '/'}
                                className="mt-8"
                            >
                                Return to Home
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 min-h-screen">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
                            Upload Payment Receipt
                        </h1>
                        
                        {orderId && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
                                <p className="text-blue-800 dark:text-blue-200">
                                    <strong>Order ID:</strong> {orderId}
                                </p>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Payment Receipt *
                                </label>
                                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                                    <div className="space-y-2">
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {receiptFile ? receiptFile.name : 'Click to upload or drag and drop'}
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-500">
                                            PNG, JPG, PDF up to 5MB
                                        </p>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*,.pdf"
                                            className="hidden"
                                            id="receipt-upload"
                                        />
                                        <label
                                            htmlFor="receipt-upload"
                                            className="inline-block px-4 py-2 bg-slate-600 text-white rounded-md cursor-pointer hover:bg-slate-700 transition-colors"
                                        >
                                            Choose File
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                <div className="flex">
                                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
                                    <div>
                                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                            Important Instructions
                                        </h3>
                                        <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Make sure your receipt clearly shows the payment details</li>
                                                <li>Include the account number and amount in the receipt</li>
                                                <li>Upload a clear, readable image or PDF</li>
                                                <li>We&apos;ll verify your payment within 24 hours</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleUpload}
                                disabled={isUploading || !receiptFile || !customerName || !customerEmail}
                                className="w-full"
                            >
                                {isUploading ? 'Uploading...' : 'Upload Receipt'}
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default UploadReceiptPage;
