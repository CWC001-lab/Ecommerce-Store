"use client"
import { useRouter } from 'next/navigation';
import { ShoppingBag, Home, Grid3X3, User, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

const BottomNav = () => {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const navItems = [
        {
            icon: Home,
            label: 'Home',
            href: '/',
            onClick: () => router.push('/')
        },
        {
            icon: Grid3X3,
            label: 'Categories',
            href: '/categories',
            onClick: () => router.push('/categories')
        },
        {
            icon: ShoppingBag,
            label: 'Products',
            href: '/products',
            onClick: () => router.push('/products')
        },
        {
            icon: User,
            label: 'About',
            href: '/about',
            onClick: () => router.push('/about')
        },
        {
            icon: Mail,
            label: 'Contact',
            href: '/contact',
            onClick: () => router.push('/contact')
        }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 md:hidden">
            <div className="flex items-center justify-around py-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.href}
                            onClick={item.onClick}
                            className="flex flex-col items-center justify-center p-2 min-w-0 flex-1 relative"
                        >
                            <div className="relative">
                                <Icon size={20} className="text-slate-600 dark:text-slate-300" />
                            </div>
                            <span className="text-xs text-slate-600 dark:text-slate-300 mt-1 truncate">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
