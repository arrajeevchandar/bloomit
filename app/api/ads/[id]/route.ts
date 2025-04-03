import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";// Ensure correct import path
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../app/api/auth/[...nextauth]/route";
export async function GET(req: Request,context: { params: { id: string } } // ✅ Correct way to accept `params`
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
export async function DELETE(req: Request, context: { params: { id: string } } // ✅ Correct way to accept `params`
) {
  const session = await getServerSession(authOptions);

  console.log("Session Data:", session); // Debugging

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { params } = context; 
  const { id } = await params;

  try {
    const ad = await prisma.ad.findUnique({ where: { id} });

    if (!ad) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 });
    }

    if (ad.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.ad.delete({ where: { id} });

    return NextResponse.json({ message: "Ad deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete ad" }, { status: 500 });
  }
}
