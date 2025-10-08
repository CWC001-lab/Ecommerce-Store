import { NextResponse } from "next/server";
import { query } from "@/lib/database";

export async function GET() {
  try {
    const categoriesResult = await query(`
      SELECT c.*, 
             b.label as billboard_label, b.imageUrl as billboard_imageUrl, b.id as billboard_id
      FROM "Category" c
      LEFT JOIN "Billboard" b ON c."billboardId" = b.id
      ORDER BY c."createdAt" DESC
    `);

    const categories = categoriesResult.rows.map((row: any) => ({
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
    }));

    return NextResponse.json(categories);
  } catch (error) {
    console.error('[CATEGORIES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
