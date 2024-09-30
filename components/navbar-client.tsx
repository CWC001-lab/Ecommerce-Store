"use client"

import Link from "next/link";
import { MainNav } from "@/components";
import NavbarActions from "./navbar-actions";
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
                    <p className="text-2xl sm:text-3xl font-extrabold">F-B-O</p>
                </Link>
                <div className="hidden md:flex md:flex-grow md:justify-center">
                    <MainNav data={categories} routes={routes} />
                </div>
                <div className="flex items-center">
                    <NavbarActions />
                    <button 
                        className="ml-4 md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div ref={menuRef} className="md:hidden">
                    <MainNav data={categories} routes={routes} isMobile={true} onLinkClick={handleLinkClick} />
                </div>
            )}
        </>
    );
};

export default NavbarClient;
