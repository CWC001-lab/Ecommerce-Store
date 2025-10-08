"use client";

import usePreviewModal from "@/hooks/use-preview-modal";
import Modal from '@/components/ui/modal';
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import { useState, useEffect } from "react";

const PreviewModal = () => {
    const previewModal = usePreviewModal();
    const product = usePreviewModal((state) => state.data);
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch variants when modal opens and product has variants
    useEffect(() => {
        if (previewModal.isOpen && product && product.hasVariants) {
            setLoading(true);
            fetch(`/api/${product.id}/variants`)
                .then(res => res.json())
                .then(data => {
                    setVariants(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching variants:', err);
                    setVariants([]);
                    setLoading(false);
                });
        } else {
            setVariants([]);
        }
    }, [previewModal.isOpen, product]);

    if(!product) {
        return null;
    }

    // Create product data with variants (like GroupedProductCard)
    const productWithVariants = {
        ...product,
        variants: variants
    };

    return (
        <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
            <div className="grid items-start w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-4 lg:col-span-5">
                    <Gallery images={product.images} />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                    {/* <Info data={productWithVariants}/> */}
                    <div className="p-4">
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <p className="text-gray-600">Info component commented out</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PreviewModal;