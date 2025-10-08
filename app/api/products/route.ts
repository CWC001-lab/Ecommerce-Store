import { NextResponse } from "next/server";
import { query } from "@/lib/database";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    let whereClause = 'WHERE p."isArchived" = false';
    const queryParams: any[] = [];
    let paramIndex = 1;

    if (categoryId) {
      whereClause += ` AND p."categoryId" = $${paramIndex}`;
      queryParams.push(categoryId);
      paramIndex++;
    }

    if (colorId) {
      whereClause += ` AND p."colorId" = $${paramIndex}`;
      queryParams.push(colorId);
      paramIndex++;
    }

    if (sizeId) {
      whereClause += ` AND p."sizeId" = $${paramIndex}`;
      queryParams.push(sizeId);
      paramIndex++;
    }

    if (isFeatured) {
      whereClause += ` AND p."isFeatured" = $${paramIndex}`;
      queryParams.push('true');
      paramIndex++;
    }

    const productsResult = await query(`
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
      ${whereClause}
      ORDER BY p."createdAt" DESC
    `, queryParams);

    // Group products and their images
    const productsMap = new Map();
    
    productsResult.rows.forEach((row: any) => {
      if (!productsMap.has(row.id)) {
        productsMap.set(row.id, {
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
        productsMap.get(row.id).images.push({
          id: row.image_id,
          url: row.image_url
        });
      }
    });

    const products = Array.from(productsMap.values());
    return NextResponse.json(products);
  } catch (error) {
    console.error('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
