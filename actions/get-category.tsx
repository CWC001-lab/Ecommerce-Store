import { Category } from "@/types";
import { getStoreApiUrl } from '@/lib/utils';

const getCategory = async (id: string): Promise<Category | null> => {
    try {
        const url = getStoreApiUrl(undefined, `categories/${id}`);
        const res = await fetch(url, {
            next: { revalidate: 60 }, // Cache for 1 minute
            signal: AbortSignal.timeout(5000) // 5 second timeout
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        return res.json();
    } catch (error) {
        console.error('Failed to fetch category:', error);
        return null;
    }
}

export default getCategory;