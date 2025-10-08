import { Product } from "@/types";
import qs from 'query-string';
import { getStoreApiUrl } from '@/lib/utils';

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    try {
        const baseUrl = getStoreApiUrl(undefined, 'products');
        const url = qs.stringifyUrl({
            url: baseUrl,
            query: {
                colorId: query.colorId,
                sizeId: query.sizeId,
                categoryId: query.categoryId,
                isFeatured: query.isFeatured
            }
        })
        
        const res = await fetch(url, {
            next: { revalidate: 60 }, // Cache for 1 minute
            signal: AbortSignal.timeout(5000) // 5 second timeout
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        return res.json();
    } catch (error) {
        console.warn('Failed to fetch products, using fallback data:', error);
        // Return empty array as fallback
        return [];
    }
}

export default getProducts;