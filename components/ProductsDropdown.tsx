import React from 'react';
import LoadingLink from '@/components/ui/loading-link';
import { Category } from '@/types';

interface ProductsDropdownProps {
  categories: Category[];
  isMobile?: boolean;
}

const ProductsDropdown: React.FC<ProductsDropdownProps> = ({ categories, isMobile = false }) => {
  return (
    <div className={`
      ${isMobile ? 'relative w-full' : 'absolute top-full left-0 w-64'}
      bg-white shadow-lg rounded-b-md overflow-hidden z-10
    `}>
      <div className="p-4">
        {/* All Products Link */}
        <LoadingLink
          href="/products"
          className="block text-sm font-semibold text-gray-900 hover:text-blue-600 hover:bg-gray-100 p-2 rounded mb-2 border-b border-gray-200"
          loadingText="Loading All Products..."
        >
          View All Products
        </LoadingLink>
        
        {/* Categories Grid */}
        <div className={`
          grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-2
        `}>
          {categories.map((category) => (
            <LoadingLink
              key={category.id}
              href={`/category/${category.id}`}
              className="text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded"
              loadingText={`Loading ${category.name}...`}
            >
              {category.name}
            </LoadingLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsDropdown;
