import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`

const getCategory = async (id: string): Promise<Category | null> => {
    try {
        const res = await fetch(`${URL}/${id}`, {
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