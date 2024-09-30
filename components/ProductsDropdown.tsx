import React from 'react';
import Link from 'next/link';
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
      <div className={`
        grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-2 p-4
      `}>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsDropdown;
