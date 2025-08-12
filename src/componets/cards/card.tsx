import React from "react";

interface CardProps {
  title: string;
  description: string;
  href?: string;
}

export default function Card({ title, description, href }: CardProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-md">
      <div className="md:flex">
        <div className="p-8">
          <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">{title}</div>
          {href ? (
            <a href={href} className="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
              {description}
            </a>
          ) : (
            <div className="mt-1 block text-lg leading-tight font-medium text-black">{description}</div>
          )}
        </div>
      </div>
    </div>
  );
}