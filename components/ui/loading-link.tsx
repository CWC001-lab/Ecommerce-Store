"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/providers/loading-provider';
import { ReactNode } from 'react';

interface LoadingLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  loadingText?: string;
  onClick?: () => void;
}

const LoadingLink: React.FC<LoadingLinkProps> = ({ 
  href, 
  children, 
  className,
  loadingText = "Navigating...",
  onClick 
}) => {
  const { setLoadingWithText } = useLoading();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (onClick) {
      onClick();
    }
    
    setLoadingWithText(true, loadingText);
    
    // Use router.push for programmatic navigation with loading
    router.push(href);
  };

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default LoadingLink;
