import { Color } from "@/types";
import { getStoreApiUrl } from '@/lib/utils';

const getColors = async (): Promise<Color[]> => {
    try {
        const url = getStoreApiUrl(undefined, 'colors');
        const res = await fetch(url, {
            next: { revalidate: 60 }, // Cache for 1 minute
            signal: AbortSignal.timeout(5000) // 5 second timeout
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        return res.json();
    } catch (error) {
        console.warn('Failed to fetch colors, using fallback data:', error);
        return [];
    }
}

export default getColors;