import React from "react";
import Image from "next/image";

interface OfferCardProps {
  id: string;
  image: string; // Shop logo URL
  cashback_rate: string;
  shop_name: string;
  href?: string;
}

export default function OfferCard({ image, cashback_rate, shop_name, href }: OfferCardProps) {
  return (
    <div className="w-full aspect-square rounded-xl bg-white shadow-md flex flex-col justify-between overflow-hidden relative">
      <div className="flex-1 flex items-center justify-center p-6">
        <Image
          src={image}
          alt={shop_name}
          className="max-h-24 max-w-full object-contain"
          width={120}
          height={96}
        />
      </div>
      <div className="bg-indigo-600 text-white text-center py-3 px-2">
        <div className="font-bold text-lg">{cashback_rate}</div>
        <div className="text-xs">{shop_name}</div>
      </div>
      {href && (
        <a href={href} className="absolute inset-0" tabIndex={-1} aria-label={shop_name}></a>
      )}
    </div>
  );
}