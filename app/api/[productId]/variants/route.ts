import { NextResponse } from "next/server";
import { query } from "@/lib/database";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    // Get the product to check if it has variants
    const productResult = await query(
      'SELECT * FROM "Product" WHERE id = $1',
      [params.productId]
    );

    if (productResult.rows.length === 0) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const product = productResult.rows[0];

    // If the product has variants, get all variants in the same group
    if (product.hasVariants && product.variantGroupId) {
      const variantsResult = await query(`
        SELECT p.*, 
               c.name as category_name, c.id as category_id,
               col.name as color_name, col.value as color_value, col.id as color_id,
               s.name as size_name, s.value as size_value, s.id as size_id,
               i.id as image_id, i.url as image_url
        FROM "Product" p
        LEFT JOIN "Category" c ON p."categoryId" = c.id
        LEFT JOIN "Color" col ON p."colorId" = col.id
        LEFT JOIN "Size" s ON p."sizeId" = s.id
        LEFT JOIN "Image" i ON p.id = i."productId"
        WHERE p."variantGroupId" = $1
        ORDER BY p."createdAt" ASC
      `, [product.variantGroupId]);

      // Group variants and their images
      const variantsMap = new Map();
      
      variantsResult.rows.forEach((row: any) => {
        if (!variantsMap.has(row.id)) {
          variantsMap.set(row.id, {
            id: row.id,
            name: row.name,
            price: row.price.toString(),
            isFeatured: row.isFeatured,
            isArchived: row.isArchived,
            categoryId: row.categoryId,
            colorId: row.colorId,
            sizeId: row.sizeId,
            hasVariants: row.hasVariants,
            parentProductId: row.parentProductId,
            variantGroupId: row.variantGroupId,
            category: row.category_id ? {
              id: row.category_id,
              name: row.category_name
            } : null,
            color: row.color_id ? {
              id: row.color_id,
              name: row.color_name,
              value: row.color_value
            } : null,
            size: row.size_id ? {
              id: row.size_id,
              name: row.size_name,
              value: row.size_value
            } : null,
            images: []
          });
        }
        
        if (row.image_id) {
          variantsMap.get(row.id).images.push({
            id: row.image_id,
            url: row.image_url
          });
        }
      });

      const variants = Array.from(variantsMap.values());
      return NextResponse.json(variants);
    }

    // If the product doesn't have variants, return empty array
    return NextResponse.json([]);
  } catch (error) {
    console.error('[PRODUCT_VARIANTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
