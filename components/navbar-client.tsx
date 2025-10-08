"use client"

import Link from "next/link";
import Image from "next/image";
import { MainNav } from "@/components";
import NavbarActions from "./navbar-actions";
import ThemeToggle from "./theme-toggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Category } from "@/types";

interface NavbarClientProps {
    categories: Category[];
    routes: { href: string; label: string }[];
}

const NavbarClient: React.FC<NavbarClientProps> = ({ categories, routes }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className="relative flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex-shrink-0">
                    <Image 
                        src="/logo.png" 
                        alt="FBO Prestige" 
                        width={120} 
                        height={40} 
                        className="h-8 sm:h-10 w-auto dark:brightness-0 dark:invert"
                        priority
                    />
                </Link>
                <div className="hidden md:flex md:flex-grow md:justify-center">
                    <MainNav data={categories} routes={routes} />
                </div>
                <div className="flex items-center gap-x-4">
                    <ThemeToggle />
                    <div className="hidden md:block">
                        <NavbarActions />
                    </div>
                    <div className="md:hidden">
                        <NavbarActions />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarClient;
