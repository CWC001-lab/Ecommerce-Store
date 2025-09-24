import getCategories from "@/actions/get-categories";
import CategoriesPageClient from "./components/CategoriesPageClient";

export const revalidate = 0;

const CategoriesPage = async () => {
    const categories = await getCategories();
    
    return (
        <CategoriesPageClient categories={categories} />
    );
};

export default CategoriesPage;
