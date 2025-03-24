"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const userRole = session?.user?.role || "Buyer"; // Default to Buyer if not set
  const userName = session?.user?.name || "";
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "?";

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-white">
        Bloomit
      </Link>

      {/* Authentication Section */}
      <div className="space-x-4">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary" className="flex text-black items-center ">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={session.user?.image || ""} />
                  <AvatarFallback>{firstLetter}</AvatarFallback>
                </Avatar>
                {userName} ({userRole})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-md">
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="px-4 py-2 hover:bg-gray-200">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()} className="px-4 py-2 hover:bg-gray-200">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
            
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
