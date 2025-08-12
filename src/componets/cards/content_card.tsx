import React from "react";

interface ContentCardProps {
  title: string;
  text: string;

}

export default function ContentCard({ title, text }: ContentCardProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-md mt-4">
      <div className="md:flex">
        <div className="p-8">
            <div className="mt-1 block text-lg leading-tight font-bold text-black">{title}</div>
            <div className="mt-1 block text-lg leading-tight font-medium text-black">{text}</div>
        </div>
      </div>
    </div>
  );
}