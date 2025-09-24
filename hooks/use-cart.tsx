import { create } from "zustand";
import { Product } from "@/types";
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from "react-hot-toast";

// Migration function to handle old cart data format
const migrateCartData = (data: any): CartItem[] => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map((item: any) => {
        // If item already has the new format (product and quantity), return as is
        if (item.product && typeof item.quantity === 'number') {
            return item;
        }
        // If item is in old format (just Product), convert to new format
        if (item.id && item.name) {
            return {
                product: item,
                quantity: 1
            };
        }
        // Skip invalid items
        return null;
    }).filter(Boolean);
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
    removeAll: () => set({ items: [] }),
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage),
    onRehydrateStorage: () => (state) => {
        if (state) {
            // Migrate old cart data to new format
            state.items = migrateCartData(state.items);
        }
    }
}))

export default useCart;