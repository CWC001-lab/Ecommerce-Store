"use client"

import { useState } from 'react';
import Button from '@/components/ui/button';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/contact`,
                formData
            );

            if (response.data.success) {
                setSubmitSuccess(true);
                toast.success('Message sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                toast.error('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending contact form:', error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="max-w-2xl mx-auto text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Message Sent Successfully!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Thank you for contacting us. We have received your message and will get back to you as soon as possible.
                </p>
                <Button onClick={() => setSubmitSuccess(false)}>
                    Send Another Message
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                    Get in Touch
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
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
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
                            placeholder="Your phone number (optional)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Subject *
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
                            placeholder="What is this about?"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Message *
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
                            placeholder="Tell us how we can help you..."
                            required
                        />
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div className="flex">
                            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                            <div>
                                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                    Response Time
                                </h3>
                                <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                                    We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="h-4 w-4" />
                                Send Message
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
