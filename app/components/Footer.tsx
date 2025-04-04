"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="mt-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">Bloomit</h3>
          <p className="text-sm">
            Bringing beauty to your moments with fresh flower decorations.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
           
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Get in Touch</h4>
          <p className="text-sm">www.bloomit.com</p>
          <p className="text-sm mt-1">+91 98765 43210</p>
          <Button variant="outline" className="mt-3 text-white border-white hover:bg-white hover:text-blue-500">
            Contact Support
          </Button>
        </div>
      </div>

      <Separator className="my-6 bg-white/50" />

      <div className="text-center text-xs text-white/90">
        © {new Date().getFullYear()} Bloomit. All rights reserved.
      </div>
    </footer>
  );
}
