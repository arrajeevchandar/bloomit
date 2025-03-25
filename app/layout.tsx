"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {/* Starry Night Animation */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Twinkling Stars */}
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="star"
                style={{
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 100}vh`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}

            {/* Shooting Stars */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`shooting-star-${i}`}
                className="shooting-star"
                style={{
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 50}vh`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          <Navbar />
          <main className="container mx-auto p-6 text-white">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
