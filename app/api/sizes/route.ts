import { NextResponse } from "next/server";
import { query } from "@/lib/database";

export async function GET() {
  try {
    const sizesResult = await query(`
      SELECT * FROM "Size"
      ORDER BY "createdAt" DESC
    `);

    const sizes = sizesResult.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      value: row.value,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    }));

    return NextResponse.json(sizes);
  } catch (error) {
    console.error('[SIZES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
