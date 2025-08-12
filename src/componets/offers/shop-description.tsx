"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";

// Define a type for Shop if you want better type safety
type Shop = {
  id: string;
  logo_url?: string;
  shop_name?: string;
  name?: string;
  cashback_rate?: number;
  description?: string;
  website_url?: string;
};

export default function ShopPage() {
  const params = useParams();
  const slug = params?.slug;

  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || typeof slug !== "string") {
      setError("Shop not found.");
      setLoading(false);
      return;
    }
    const fetchShop = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("shop")
        .select("*")
        .eq("id", slug)
        .single();
      if (error) setError(error.message);
      else setShop(data);
      setLoading(false);
    };
    fetchShop();
  }, [slug]);

  if (loading) return <div className="text-center mt-12">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-12">{error}</div>;
  if (!shop) return <div className="text-center mt-12">Shop not found.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow p-8">
      <div className="flex flex-col items-center">
        {shop.logo_url && (
          <Image
            src={shop.logo_url}
            alt={shop.shop_name || shop.name || "Shop logo"}
            width={120}
            height={96}
            className="h-24 mb-4 object-contain"
          />
        )}
        <h1 className="text-3xl text-black font-bold mb-2">{shop.shop_name || shop.name}</h1>
        {shop.cashback_rate && (
          <div className="text-indigo-600 font-semibold mb-2">
            {shop.cashback_rate}% Cashback
          </div>
        )}
        {shop.description && (
          <p className="text-black mb-4">{shop.description}</p>
        )}
        {shop.website_url && (
          <a
            href={shop.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Besøk butikken
          </a>
        )}
      </div>
    </div>
  );
}