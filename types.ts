export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
}

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
}

export interface Product {
    id: string;
    category: Category;
    name: string;
    price: string;
    isFeatured: boolean;
    size: Size;
    color: Color;
    images: Image[];
    hasVariants?: boolean;
    parentProductId?: string;
    variantGroupId?: string;
    parent?: {
        id: string;
        name: string;
    };
}

export interface Image {
    id: string;
    url: string;
}

export interface Size {
    id: string;
    name: string;
    value: string;
}
export interface Color {
    id: string;
    name: string;
    value: string;
}

// Re-export GroupedProduct from utils for convenience
export type { GroupedProduct } from '@/lib/utils';