"use client"

import { useState, useEffect } from "react"
import { Product } from "@/types"

interface UseProductVariantsReturn {
  variants: Product[];
  loading: boolean;
  error: string | null;
  fetchVariants: (productId: string) => Promise<void>;
}

export const useProductVariants = (): UseProductVariantsReturn => {
  const [variants, setVariants] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVariants = async (productId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/${productId}/variants`);
      if (!response.ok) {
        throw new Error('Failed to fetch variants');
      }
      const data = await response.json();
      setVariants(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setVariants([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    variants,
    loading,
    error,
    fetchVariants
  };
};
