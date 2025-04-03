import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db"; // Ensure correct import path
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

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
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const id = req.nextUrl.searchParams.get("id") as string;

  console.log("Session Data:", session); // Debugging

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const ad = await prisma.ad.findUnique({ where: { id } });

    if (!ad) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 });
    }

    if (ad.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.ad.delete({ where: { id } });

    return NextResponse.json({ message: "Ad deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete ad" }, { status: 500 });
  }
}
