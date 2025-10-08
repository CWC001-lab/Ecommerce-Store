"use client"

import { create } from "zustand"
import { Product } from "@/types"

interface VariantStore {
  variants: Product[];
  loading: boolean;
  error: string | null;
  currentProductId: string | null;
  fetchVariants: (productId: string) => Promise<void>;
  clearVariants: () => void;
}

export const useVariantStore = create<VariantStore>((set, get) => ({
  variants: [],
  loading: false,
  error: null,
  currentProductId: null,

  fetchVariants: async (productId: string) => {
    const { currentProductId } = get();
    
    console.log('VariantStore - fetchVariants called:', {
      productId,
      currentProductId,
      existingVariantsCount: get().variants.length
    });
    
    // If we already have variants for this product, don't fetch again
    if (currentProductId === productId && get().variants.length > 0) {
      console.log('VariantStore - Using existing variants for product:', productId);
      return;
    }

    console.log('VariantStore - Fetching new variants for product:', productId);
    set({ loading: true, error: null, currentProductId: productId });
    
    try {
      const response = await fetch(`/api/${productId}/variants`);
      if (!response.ok) {
        throw new Error('Failed to fetch variants');
      }
      const data = await response.json();
      console.log('VariantStore - Variants fetched successfully:', {
        productId,
        variantsCount: data.length
      });
      set({ variants: data, loading: false });
    } catch (err) {
      console.error('VariantStore - Error fetching variants:', err);
      set({ 
        error: err instanceof Error ? err.message : 'An error occurred',
        variants: [],
        loading: false 
      });
    }
  },

  clearVariants: () => set({ 
    variants: [], 
    currentProductId: null, 
    error: null 
  })
}));
