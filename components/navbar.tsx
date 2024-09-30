import Container from "@/components/ui/container";
import Link from "next/link";
import { MainNav } from "@/components";
import getCategories from "@/actions/get-categories";
import NavbarClient from "./navbar-client";

export const revalidate = 0;

const Navbar = async () => {
    const categories = await getCategories();

    const routes = [
        {
            href: '/about',
            label: 'About',
        },
        {
            href: '/contact',
            label: 'Contact',
        },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
            <Container>
                <NavbarClient categories={categories || []} routes={routes} />
            </Container>
        </div>
    )
}

export default Navbar;