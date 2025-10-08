import { NextResponse } from "next/server";
import { query } from "@/lib/database";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const billboardResult = await query(`
      SELECT * FROM "Billboard"
      WHERE id = $1
    `, [params.billboardId]);

    if (billboardResult.rows.length === 0) {
      return new NextResponse("Billboard not found", { status: 404 });
    }

    const billboard = billboardResult.rows[0];
    return NextResponse.json({
      id: billboard.id,
      label: billboard.label,
      imageUrl: billboard.imageUrl,
      createdAt: billboard.createdAt,
      updatedAt: billboard.updatedAt
    });
  } catch (error) {
    console.error('[BILLBOARD_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
