"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ads, setAds] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [phno, setPhone] = useState("");
  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
    fetchAds();
  }, [status]);

  const fetchAds = async () => {
    const res = await fetch("/api/ads");
    if (res.ok) setAds(await res.json());
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages([...images, ...Array.from(e.target.files)]);
  };

  const handlePostAd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user || session.user.role !== "seller") {
      alert("Only sellers can post ads.");
      return;
    }
    const imagePromises = images.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result as string);
      });
    });
  
    const base64Images = await Promise.all(imagePromises);
  
    const adData = {
      title,
      description,
      price: parseFloat(price),
      images: base64Images,
      phno, // Temporary URLs (replace with actual upload logic)
    };
    try {
    const res = await fetch("/api/ads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adData),
    });
    if (res.status === 401) {
      alert("Unauthorized! Please log in.");
    } else if (res.status === 403) {
      alert("You must be a seller to post an ad.");
    } else if (!res.ok) {
      alert("Something went wrong.");
    } else {
      alert("Ad posted successfully!");
    }
    if (res.ok) {
      fetchAds();
      setTitle("");
      setDescription("");
      setPrice("");
      setImages([]);
      setPhone("");
    } 
  } catch (error) {
    console.error("Failed to post ad:", error);
  }

   
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-1000 p-4">
      <Card className="w-full max-w-md shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Post an Ad</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostAd} className="space-y-4">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <Input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <Input placeholder="Phone Number" value={phno} onChange={(e) => setPhone(e.target.value)} required />
            
            <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
            <div className="flex gap-2 overflow-x-auto mt-2">
              {images.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt="Preview" className="h-20 w-20 object-cover rounded" />
              ))}
            </div>
            <Button type="submit" className="w-full">Post Ad</Button>
          </form>
        </CardContent>
      </Card>

      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Your Ads</h2>
        {ads.length === 0 ? (
          <p>No ads found.</p>
        ) : (
          <div className="grid gap-4">
            {ads.map((ad) => (
              <Card key={ad.id} className="p-4">
                <h3 className="font-semibold text-lg">{ad.title}</h3>
                <p>{ad.description}</p>
                <p className="text-sm text-gray-500">Price: ₹{ad.price}</p>
                <p className="text-blue-600 font-medium">📞 {ad.phno}</p>  {/* ✅ Display Phone Number */}
                {ad.images.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {ad.images.map((img, index) => (
                      <img key={index} src={img} alt="Ad Image" className="h-20 w-20 object-cover rounded" />
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
