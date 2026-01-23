import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface EmptyProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  button: { label: string; href: string };
}
export function Empty({ Icon, title, description, button }: EmptyProps) {
  return (
    <div className="hero min-h-[400px] bg-base-200 rounded-box ">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <Icon
            className="w-12 h-12 mb-4 text-gray-400 mx-auto"
            strokeWidth={1.5}
          />

          <h2 className="text-2xl font-bold mt-4">{title}</h2>
          <p className="py-4 opacity-70">{description}</p>
          <Link href={button.href} className="btn btn-primary">
            {button.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
