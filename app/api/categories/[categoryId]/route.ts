import { NextResponse } from "next/server";
import { query } from "@/lib/database";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const categoryResult = await query(`
      SELECT c.*, 
             b.label as billboard_label, b.imageUrl as billboard_imageUrl, b.id as billboard_id
      FROM "Category" c
      LEFT JOIN "Billboard" b ON c."billboardId" = b.id
      WHERE c.id = $1
    `, [params.categoryId]);

    if (categoryResult.rows.length === 0) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const row = categoryResult.rows[0];
    const category = {
      id: row.id,
      name: row.name,
      billboardId: row.billboardId,
      billboard: row.billboard_id ? {
        id: row.billboard_id,
        label: row.billboard_label,
        imageUrl: row.billboard_imageUrl
      } : null,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };

    return NextResponse.json(category);
  } catch (error) {
    console.error('[CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
