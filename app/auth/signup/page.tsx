"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FcGoogle } from "react-icons/fc";
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Default role: Buyer
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/auth/signin");
    } else {
      alert(`Signup failed: ${data.error || "Unknown error"}`);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Role Selection Toggle */}
          <ToggleGroup
            type="single"
            value={role}
            onValueChange={(value) => setRole(value)}
            className="flex justify-center mb-4"
          >
            <ToggleGroupItem value="buyer" className="w-1/2">Buyer</ToggleGroupItem>
            <ToggleGroupItem value="seller" className="w-1/2">Seller</ToggleGroupItem>
          </ToggleGroup>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <Input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />

            <Button variant={"outline"} type="submit" className="w-full text-white">Sign Up</Button>
          </form>

          <div className="text-center my-4 text-sm">or</div>

          {/* Google Sign-Up */}
          <Button
  variant="outline"
  className="w-full text-white"
  onClick={async () => {
    console.log(role);
    await fetch("/api/auth/store-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  role }),
    });

    signIn("google");
  }}
><FcGoogle className="w-5 h-5" />
  Sign Up with Google
</Button>


          <p className="text-center text-sm mt-2">
            Already have an account? <a href="/auth/signin" className="text-blue-600">Sign in</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
