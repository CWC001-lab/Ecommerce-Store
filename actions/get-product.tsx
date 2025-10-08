import { Product } from "@/types";
import { getStoreApiUrl } from '@/lib/utils';

const getProduct = async (id: string): Promise<Product> => {
    const url = getStoreApiUrl(undefined, `products/${id}`);
    const res = await fetch(url);
    return res.json();
}

export default getProduct;