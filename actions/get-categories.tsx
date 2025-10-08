import { Category } from "@/types";
import { getStoreApiUrl } from '@/lib/utils';

const getCategories = async (): Promise<Category[]> => {
    try {
        const url = getStoreApiUrl(undefined, 'categories');
        const res = await fetch(url, {
            next: { revalidate: 60 }, // Cache for 1 minute
            signal: AbortSignal.timeout(5000) // 5 second timeout
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        return res.json();
    } catch (error) {
        console.warn('Failed to fetch categories, using fallback data:', error);
        // Return empty array as fallback
        return [];
    }
}

export default getCategories;