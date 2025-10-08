import { NextResponse } from "next/server";
import { query } from "@/lib/database";

export async function GET() {
  try {
    const colorsResult = await query(`
      SELECT * FROM "Color"
      ORDER BY "createdAt" DESC
    `);

    const colors = colorsResult.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      value: row.value,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    }));

    return NextResponse.json(colors);
  } catch (error) {
    console.error('[COLORS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
