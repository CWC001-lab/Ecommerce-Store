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

    const productResult = await query(`
      SELECT p.*, 
             c.name as category_name, c.id as category_id,
             col.name as color_name, col.value as color_value, col.id as color_id,
             s.name as size_name, s.value as size_value, s.id as size_id,
             i.id as image_id, i.url as image_url,
             parent.name as parent_name, parent.id as parent_id
      FROM "Product" p
      LEFT JOIN "Category" c ON p."categoryId" = c.id
      LEFT JOIN "Color" col ON p."colorId" = col.id
      LEFT JOIN "Size" s ON p."sizeId" = s.id
      LEFT JOIN "Image" i ON p.id = i."productId"
      LEFT JOIN "Product" parent ON p."parentProductId" = parent.id
      WHERE p.id = $1
    `, [params.productId]);

    if (productResult.rows.length === 0) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // Group product and its images
    const productMap = new Map();
    productResult.rows.forEach((row: any) => {
      if (!productMap.has(row.id)) {
        productMap.set(row.id, {
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
          parent: row.parent_id ? {
            id: row.parent_id,
            name: row.parent_name
          } : null,
          images: []
        });
      }
      
      if (row.image_id) {
        productMap.get(row.id).images.push({
          id: row.image_id,
          url: row.image_url
        });
      }
    });

    const product = Array.from(productMap.values())[0];
    return NextResponse.json(product);
  } catch (error) {
    console.error('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
