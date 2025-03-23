import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "../../../../lib/db";
import { Phone } from "lucide-react";

export async function POST(req: Request) {
  try {
    const { name, email,phno, password, role } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    if (!phno || phno.trim() === "") {
        return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
      }
    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user in DB
    const newUser = await prisma.user.create({
      data: {
        name, // Save name
        email,
        phno,
        password: hashedPassword,
        role,
        
      },
    });

    return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
