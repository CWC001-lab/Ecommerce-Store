import { create } from "zustand";
import { Product } from "@/types";
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from "react-hot-toast";

// Migration function to handle old cart data format
const migrateCartData = (data: any): CartItem[] => {
    console.log('🛒 Migrating cart data:', data);
    if (!data || !Array.isArray(data)) {
        console.log('🛒 No valid cart data found, returning empty array');
        return [];
    }
    
    const migratedData = data.map((item: any) => {
        console.log('🛒 Processing cart item:', item);
        // If item already has the new format (product and quantity), return as is
        if (item.product && typeof item.quantity === 'number') {
            console.log('🛒 Item already in new format:', item);
            return item;
        }
        // If item is in old format (just Product), convert to new format
        if (item.id && item.name) {
            console.log('🛒 Converting old format item to new format:', item);
            return {
                product: item,
                quantity: 1
            };
        }
        // Skip invalid items
        console.log('🛒 Skipping invalid item:', item);
        return null;
    }).filter(Boolean);
    
    console.log('🛒 Migrated cart data result:', migratedData);
    return migratedData;
};

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeAll: () => void;
}

const useCart = create(persist<CartStore>((set, get) =>({
    items: [],
    addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.product.id === data.id);

        if(existingItem) {
            // Increase quantity if item already exists
            set({ 
                items: currentItems.map(item => 
                    item.product.id === data.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            });
            toast.success("Quantity increased.");
        } else {
            // Add new item with quantity 1
            set({ items: [...currentItems, { product: data, quantity: 1 }] });
            toast.success("Item added to cart.");
        }
    },
    removeItem: (id: string) => {
        set({ items: [...get().items.filter(item => item.product.id !== id)] });
        toast.success("Item removed from cart.");
    },
    updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
            get().removeItem(id);
            return;
        }
        
        set({ 
            items: get().items.map(item => 
                item.product.id === id 
                    ? { ...item, quantity }
                    : item
            )
        });
    },
    removeAll: () => {
        console.log('🛒 Clearing all cart items');
        set({ items: [] });
    },
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage),
    onRehydrateStorage: () => (state) => {
        console.log('🛒 Cart rehydration starting, state:', state);
        if (state) {
            // Migrate old cart data to new format
            const originalItems = state.items;
            state.items = migrateCartData(state.items);
            console.log('🛒 Cart rehydration complete, original items:', originalItems, 'migrated items:', state.items);
        } else {
            console.log('🛒 No state found during rehydration');
        }
    }
}))

export default useCart;