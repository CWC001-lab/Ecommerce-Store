"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '@/components/ui/loader';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  setLoadingWithText: (loading: boolean, text?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const pathname = usePathname();

  // Auto-loading on route changes
  useEffect(() => {
    setIsLoading(true);
    setLoadingText("Loading page...");
    
    // Simulate loading time for route changes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const setLoadingWithText = (loading: boolean, text: string = "Loading...") => {
    setLoadingText(text);
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, setLoadingWithText }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-white dark:bg-slate-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm z-[70] flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border dark:border-slate-700">
            <Loader size="lg" text={loadingText} />
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
