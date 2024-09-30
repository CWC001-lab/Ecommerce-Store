import Container from "@/components/ui/container";
import Link from "next/link";
import { MainNav } from "@/components";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";

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
        <div className="border-b">
            <Container>
                <div className="relative flex items-center h-16 px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex ml-4 lg:ml-0 gap-x-2">
                        <p className="text-xl font-bold">F-B-O</p>
                    </Link>
                    <MainNav data={categories || []} routes={routes} />
                    <NavbarActions />
                </div>
            </Container>
        </div>
    )
}
export default Navbar;