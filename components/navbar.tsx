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
                <div className="relative flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center flex-1">
                        <Link href="/" className="mr-8">
                            <p className="text-3xl font-extrabold" style={{ fontSize: 'calc(100% + 16%)' }}>F-B-O</p>
                        </Link>
                        <div className="flex-grow">
                            <MainNav data={categories || []} routes={routes} />
                        </div>
                    </div>
                    <div className="ml-20">
                        <NavbarActions />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Navbar;