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
}

const MainNav: React.FC<MainNavProps> = ({ data, routes }) => {
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className='flex items-center justify-between w-full'>
            <div className="flex items-center space-x-8">
                <Link 
                    href="/" 
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-black relative group',
                        pathname === '/' ? 'text-black' : 'text-neutral-500'
                    )}
                    style={{ fontSize: 'calc(100% + 4%)' }}
                >
                    Home
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
                {routes.map((route) => (
                    <Link 
                        key={route.href} 
                        href={route.href} 
                        className={cn(
                            'text-sm font-medium transition-colors hover:text-black relative group',
                            pathname === route.href ? 'text-black' : 'text-neutral-500'
                        )}
                        style={{ fontSize: 'calc(100% + 4%)' }}
                    >
                        {route.label}
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </Link>
                ))}
            </div>
            <div 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
            >
                <button 
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-black flex items-center',
                        isDropdownOpen ? 'text-black' : 'text-neutral-500'
                    )}
                    style={{ fontSize: 'calc(100% + 4%)' }}
                >
                    Products
                    {isDropdownOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                </button>
                {isDropdownOpen && <ProductsDropdown categories={data} />}
            </div>
        </nav>
    )
}

export default MainNav;