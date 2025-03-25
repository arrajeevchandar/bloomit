import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";// Ensure correct import path

export async function GET(
  req: Request,
  context: { params: { id: string } } // ✅ Correct way to accept `params`
) {
  const { params } = context; 
  const { id } = await params; // ✅ Await `params` in Next.js 15

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const ad = await prisma.ad.findUnique({
      where: { id },
    });

    if (!ad) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 });
    }

    return NextResponse.json(ad);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
