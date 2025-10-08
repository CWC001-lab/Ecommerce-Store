import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Product } from '@/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getBaseUrl() {
    if (typeof window !== 'undefined') {
        // Client-side: use current origin
        return window.location.origin;
    }
    
    // Server-side: extract base URL from API URL or use environment variable
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (apiUrl) {
        try {
            // Parse the API URL to extract the base URL
            const url = new URL(apiUrl);
            return `${url.protocol}//${url.host}`;
        } catch (error) {
            console.warn('Invalid NEXT_PUBLIC_API_URL format, falling back to localhost');
        }
    }
    
    // Fallback to localhost for development
    return 'http://localhost:3000';
}

export function getApiUrl(endpoint: string = '') {
    const baseUrl = getBaseUrl();
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${baseUrl}/api/${cleanEndpoint}`;
}

export function getStoreApiUrl(storeId?: string, endpoint: string = '') {
    const baseUrl = getBaseUrl();
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    
    if (storeId) {
        return `${baseUrl}/api/${storeId}/${cleanEndpoint}`;
    }
    
    // If no storeId provided, try to extract from environment
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
        try {
            const url = new URL(apiUrl);
            const pathParts = url.pathname.split('/').filter(Boolean);
            if (pathParts.length >= 2 && pathParts[0] === 'api') {
                const extractedStoreId = pathParts[1];
                return `${baseUrl}/api/${extractedStoreId}/${cleanEndpoint}`;
            }
        } catch (error) {
            console.warn('Could not extract store ID from API URL');
        }
    }
    
    // Fallback to base API URL without store ID
    return `${baseUrl}/api/${cleanEndpoint}`;
}

// Product grouping interfaces
export interface GroupedProduct {
    id: string;
    name: string;
    price: string;
    isFeatured: boolean;
    category: any;
    images: any[];
    variants: Product[];
    hasVariants: boolean;
    // Use the first variant's details as the main product details
    size?: any;
    color?: any;
}

export function groupProductsByVariant(products: Product[]): GroupedProduct[] {
    const groupedMap = new Map<string, Product[]>();
    
    // Group products by name and first image URL
    products.forEach(product => {
        const key = `${product.name}-${product.images[0]?.url || 'no-image'}`;
        
        if (!groupedMap.has(key)) {
            groupedMap.set(key, []);
        }
        groupedMap.get(key)!.push(product);
    });
    
    // Convert grouped products to GroupedProduct format
    const groupedProducts: GroupedProduct[] = [];
    
    groupedMap.forEach((variantProducts, key) => {
        if (variantProducts.length === 0) return;
        
        // Sort variants by price (lowest first) or by size/color
        const sortedVariants = variantProducts.sort((a, b) => {
            // First sort by price
            const priceDiff = parseFloat(a.price) - parseFloat(b.price);
            if (priceDiff !== 0) return priceDiff;
            
            // Then by size name
            if (a.size?.name && b.size?.name) {
                return a.size.name.localeCompare(b.size.name);
            }
            
            // Then by color name
            if (a.color?.name && b.color?.name) {
                return a.color.name.localeCompare(b.color.name);
            }
            
            return 0;
        });
        
        const mainProduct = sortedVariants[0];
        
        const groupedProduct: GroupedProduct = {
            id: mainProduct.id,
            name: mainProduct.name,
            price: mainProduct.price,
            isFeatured: mainProduct.isFeatured,
            category: mainProduct.category,
            images: mainProduct.images,
            variants: sortedVariants,
            hasVariants: sortedVariants.length > 1,
            size: mainProduct.size,
            color: mainProduct.color
        };
        
        groupedProducts.push(groupedProduct);
    });
    
    return groupedProducts;
}

export function getProductPriceRange(variants: Product[]): string {
    if (variants.length === 1) {
        return `₦${parseFloat(variants[0].price).toLocaleString()}`;
    }
    
    const prices = variants.map(v => parseFloat(v.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    if (minPrice === maxPrice) {
        return `₦${minPrice.toLocaleString()}`;
    }
    
    return `₦${minPrice.toLocaleString()} - ₦${maxPrice.toLocaleString()}`;
}

export function getAvailableSizes(variants: Product[]): any[] {
    const sizeMap = new Map<string, any>();
    variants.forEach(variant => {
        if (variant.size) {
            sizeMap.set(variant.size.id, variant.size);
        }
    });
    return Array.from(sizeMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getAvailableColors(variants: Product[]): any[] {
    const colorMap = new Map<string, any>();
    variants.forEach(variant => {
        if (variant.color) {
            colorMap.set(variant.color.id, variant.color);
        }
    });
    return Array.from(colorMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}