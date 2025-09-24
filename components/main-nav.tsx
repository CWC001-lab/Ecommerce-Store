"use client"
import { cn } from '@/lib/utils';
import LoadingLink from '@/components/ui/loading-link';
import { usePathname } from 'next/navigation'
import { Category } from '@/types';

interface MainNavProps {
    data: Category[];
    routes: { href: string; label: string }[];
    isMobile?: boolean;
    onLinkClick?: () => void;
}

const MainNav: React.FC<MainNavProps> = ({ data, routes, isMobile = false, onLinkClick }) => {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Home' },
        ...routes,
    ];

    const handleLinkClick = () => {
        if (onLinkClick) {
            onLinkClick();
        }
    };

    return (
        <nav className={cn(
            'flex items-center',
            isMobile ? 'flex-col w-full space-y-2' : 'space-x-4 sm:space-x-6 lg:space-x-8'
        )}>
            {navItems.map((item) => (
                <LoadingLink 
                    key={item.href}
                    href={item.href} 
                    className={cn(
                        'text-sm font-medium transition-colors relative group py-2',
                        pathname === item.href 
                            ? 'text-slate-900 dark:text-slate-100' 
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100',
                        isMobile ? 'w-full text-center' : ''
                    )}
                    onClick={handleLinkClick}
                    loadingText={`Loading ${item.label}...`}
                >
                    {item.label}
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-slate-900 dark:bg-slate-100 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </LoadingLink>
            ))}
            <LoadingLink 
                href="/products"
                className={cn(
                    'text-sm font-medium transition-colors relative group py-2',
                    pathname === '/products' 
                        ? 'text-slate-900 dark:text-slate-100' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100',
                    isMobile ? 'w-full text-center' : ''
                )}
                loadingText="Loading Products..."
            >
                Products
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-slate-900 dark:bg-slate-100 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </LoadingLink>
            
            {/* Categories Link */}
            <LoadingLink 
                href="/categories"
                className={cn(
                    'text-sm font-medium transition-colors relative group py-2',
                    pathname === '/categories' 
                        ? 'text-slate-900 dark:text-slate-100' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100',
                    isMobile ? 'w-full text-center' : ''
                )}
                loadingText="Loading Categories..."
            >
                Categories
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-slate-900 dark:bg-slate-100 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </LoadingLink>
            
        </nav>
    )
}

export default MainNav;