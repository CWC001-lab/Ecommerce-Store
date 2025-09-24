"use client"

import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = "md", 
  className,
  text = "Loading..." 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className={cn(
        "animate-spin rounded-full border-2 border-gray-300 dark:border-slate-600 border-t-blue-600",
        sizeClasses[size]
      )} />
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-300 animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default Loader;
