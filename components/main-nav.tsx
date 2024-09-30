"use client"
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { Category } from '@/types';
import ProductsDropdown from './ProductsDropdown';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MainNavProps {
    data: Category[];
    routes: { href: string; label: string }[];
    isMobile?: boolean;
    onLinkClick?: () => void;
}

const MainNav: React.FC<MainNavProps> = ({ data, routes, isMobile = false }) => {
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navItems = [
        { href: '/', label: 'Home' },
        ...routes,
    ];

    function onLinkClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
        throw new Error('Function not implemented.');
    }

    return (
        <nav className={cn(
            'flex items-center',
            isMobile ? 'flex-col w-full' : 'space-x-4 sm:space-x-6 lg:space-x-8'
        )}>
            {navItems.map((item) => (
                <Link 
                    key={item.href}
                    href={item.href} 
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-black relative group py-2',
                        pathname === item.href ? 'text-black' : 'text-neutral-500',
                        isMobile ? 'w-full text-center' : ''
                    )}
                    onClick={onLinkClick}
                >
                    {item.label}
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
            ))}
            <div 
                className={cn("relative", isMobile ? "w-full" : "")}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
            >
                <button 
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-black flex items-center justify-center',
                        isDropdownOpen ? 'text-black' : 'text-neutral-500',
                        isMobile ? 'w-full py-2' : ''
                    )}
                >
                    Products
                    {isDropdownOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                </button>
                {isDropdownOpen && <ProductsDropdown categories={data} isMobile={isMobile} />}
            </div>
        </nav>
    )
}

export default MainNav;