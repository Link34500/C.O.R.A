"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import cn from "@/lib/cn";
import { MenuIcon, XIcon } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  navLinks?: NavLink[];
  navButtons?: (ButtonProps & { href: string })[];
}
export function Navbar({
  navLinks,
  navButtons,
}: React.ComponentProps<"nav"> & NavbarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <header
      className={cn(
        "items-center p-4 border-b border-base-200 sticky top-0 left-0 flex justify-between bg-base-100 z-10 md:flex-row gap-10",
        open ? "flex-col" : "flex-row"
      )}
    >
      <div
        className="flex justify-between items-center w-full md:w-auto cursor-pointer"
        onClick={() => router.push("/")}
      >
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-xl font-semibold">C.O.R.A</h1>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden">
          <MenuIcon className={cn("w-6 h-6", open ? "hidden" : "block")} />
          <XIcon className={cn("w-6 h-6", open ? "block" : "hidden")} />
        </button>
      </div>
      <nav
        className={cn(
          "md:flex items-center gap-5 flex-col md:flex-row",
          open ? "flex" : "hidden md:flex"
        )}
      >
        {navLinks?.map((link) => (
          <Link key={link.href} href={link.href} className="link-hover">
            {link.label}
          </Link>
        ))}
      </nav>
      <div
        className={cn(
          open ? "flex flex-col" : "hidden",
          "items-center md:flex md:flex-row gap-3"
        )}
      >
        {navButtons?.map(({ href, ...button }, idx) => (
          <Button key={idx} {...button} onClick={() => router.push(href)} />
        ))}
      </div>
    </header>
  );
}
