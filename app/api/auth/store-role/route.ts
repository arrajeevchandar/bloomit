import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";
export async function POST(req: Request) {
    try {
      // Log request
      console.log("Received POST request to store-role");
  
      const body = await req.json();
      console.log("Request Body:", body);
  
      const {  role } = body;
  
      if ( !role) {
        console.log("Validation Failed: Missing email or role");
        return NextResponse.json({ error: "Email and role are required" }, { status: 400 });
      }
  
      // Store the role in Prisma
      const savedRole = await prisma.tempRole.create({
        data: { role },
      });
  
      console.log("Role saved successfully:", savedRole);
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error in store-role API:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }