// @ts-nocheck
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        if (!credentials) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid credentials");

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      const tempRole = await prisma.tempRole.findFirst({
        orderBy: { createdAt: "desc" }, // Fetch the latest record
      }); // Fetches any role from the collection
      const role = tempRole?.role;
      let existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });

      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name,
            role: role!,
          },
        });
      }
      await prisma.tempRole.deleteMany({});
      console.log("Role delted successfully:");

      return true;
    },

    async session({ session }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email! },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.role = dbUser.role;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
