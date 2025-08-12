"use client";
import useSWR from "swr";
import { fetchShops } from "@/utils/supabase/fetcher";
import Link from "next/link";
import OfferCard from "@/componets/cards/offer-card";


export default function OffersPage() {
  const { data: shops, error, isLoading } = useSWR("shops", fetchShops, {
    refreshInterval: 120000, // 120 seconds
    revalidateOnFocus: false,
  });

  return (
    <div className="font-sans min-h-screen p-4 pt-16 pb-20 sm:p-8 md:p-20 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8">CashBack tilbud</h1>
        {isLoading && <div className="text-center text-gray-500 mb-8">Loading...</div>}
        {error && <div className="text-center text-red-500 mb-8">{error.message}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {shops?.map(shop => (
            <Link key={shop.id} href={`/offers/${shop.id}`} className="block">
              <OfferCard
                id={shop.id}
                image={shop.logo_url || "/next.svg"}
                cashback_rate={shop.cashback_rate ? `${shop.cashback_rate}% Cashback` : ""}
                shop_name={shop.shop_name || shop.name || "Shop"}
                href=""
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}