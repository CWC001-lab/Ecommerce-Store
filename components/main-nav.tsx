"use client"
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { Category } from '@/types';
import ProductsDropdown from './ProductsDropdown';

interface MainNavProps {
    data: Category[];
    routes: { href: string; label: string }[];
}

const MainNav: React.FC<MainNavProps> = ({ data, routes }) => {
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className='flex items-center mx-6 space-x-4 lg:space-x-6'>
            <Link 
                href="/" 
                className={cn(
                    'text-sm font-medium transition-colors hover:text-black',
                    pathname === '/' ? 'text-black' : 'text-neutral-500'
                )}
            >
                Home
            </Link>
            <div 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
            >
                <button 
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-black',
                        isDropdownOpen ? 'text-black' : 'text-neutral-500'
                    )}
                >
                    Products
                </button>
                {isDropdownOpen && <ProductsDropdown categories={data} />}
            </div>
            {routes.map((route) => (
                <Link 
                    key={route.href} 
                    href={route.href} 
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-black',
                        pathname === route.href ? 'text-black' : 'text-neutral-500'
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}

export default MainNav;