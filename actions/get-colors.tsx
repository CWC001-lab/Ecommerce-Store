import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`

const getColors = async (): Promise<Color[]> => {
    try {
        const res = await fetch(URL, {
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