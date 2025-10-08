import { Billboard } from "@/types";
import { getStoreApiUrl } from '@/lib/utils';

const getBillboard = async (id: string): Promise<Billboard> => {
    const url = getStoreApiUrl(undefined, `billboards/${id}`);
    const res = await fetch(url);
    return res.json();
}

export default getBillboard;