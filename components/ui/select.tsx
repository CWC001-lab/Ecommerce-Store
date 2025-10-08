"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface SelectTriggerProps {
  children: React.ReactNode;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

interface SelectValueProps {
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative">
      {children}
    </div>
  );
};

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-slate-800 dark:border-slate-600 cursor-pointer hover:border-gray-400 dark:hover:border-slate-500">
      {children}
      <ChevronDown className="h-4 w-4 text-gray-500" />
    </div>
  );
};

export const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  return (
    <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md shadow-lg max-h-60 overflow-auto">
      {children}
    </div>
  );
};

export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
  return (
    <div className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 text-sm">
      {children}
    </div>
  );
};

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  return (
    <span className="text-gray-700 dark:text-gray-300">
      {placeholder || "Select an option"}
    </span>
  );
};
