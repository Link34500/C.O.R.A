import { User } from "@/generated/prisma/client";
import Link from "next/link";
import React from "react";

interface SidebarLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}
export default function Sidebar({
  sidebarLinks,
  user,
}: {
  sidebarLinks?: SidebarLink[];
  user: User;
}) {
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 py-8 gap-8">
        <h1 className="text-center text-xl font-semibold mx-auto is-drawer-close:hidden">
          Bienvenue{" "}
          {user.name.charAt(0).toUpperCase() +
            user.name.slice(1, user.name.length)}
        </h1>
        <ul className="menu w-full grow gap-3">
          {sidebarLinks?.map((sidebarLink) => (
            <li key={sidebarLink.label}>
              <Link
                key={sidebarLink.label}
                href={sidebarLink.href}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip={sidebarLink.label}
              >
                {sidebarLink.icon}
                <span className="is-drawer-close:hidden">
                  {sidebarLink.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
