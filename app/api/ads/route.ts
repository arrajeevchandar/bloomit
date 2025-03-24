import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET() {
  try {
    const ads = await prisma.ad.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(ads, { status: 200 });
  } catch (error) {
    console.error("Error fetching ads:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  console.log("Session data:", session); // Debugging step

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized: No user ID found" }, { status: 401 });
  }

  const { title, description,images,phno, price } = await req.json();
 
  
  if (session.user.role !== "seller") {
    return NextResponse.json({ error: "Permission denied" }, { status: 403 });
  }

  try {
    const ad = await prisma.ad.create({
      data: {
        title,
        description,
        price,
        images,
        phno,
        userId: String(session.user.id),  // Ensure this is valid
      },
    });

    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error("Error posting ad:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
