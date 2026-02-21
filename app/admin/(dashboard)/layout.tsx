import { getUser } from "@/lib/auth-server";
import { redirect, unauthorized } from "next/navigation";
import { PropsWithChildren } from "react";
import Navbar from "@/components/layout/admin-navbar";
import Sidebar from "@/components/layout/admin-sidebar";
import { Bird, FileIcon, HomeIcon, TextIcon } from "lucide-react";
import { User } from "@/generated/prisma/client";
import {
  LayoutDashboard,
  FileText,
  Headphones,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

export const sidebarLinks = [
  {
    icon: <LayoutDashboard size={18} />,
    label: "Dashboard",
    href: "/admin",
  },

  {
    icon: <FileText size={18} />,
    label: "Articles",
    href: "/admin/articles",
  },
  {
    icon: <Headphones size={18} />,
    label: "Chants",
    href: "/admin/records",
  },

  {
    icon: <Bird size={18} />,
    label: "Oiseaux",
    href: "/admin/birds",
  },

  {
    icon: <Users size={18} />,
    label: "Admins",
    href: "/admin/admins",
  },
];

export default async function Layout({ children }: PropsWithChildren) {
  const user = await getUser();
  if (!user) {
    redirect("/admin/login");
  }
  if (!user.isActive) {
    return unauthorized();
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Navbar />
        <div className="p-8 flex flex-col">{children}</div>
      </div>

      <Sidebar sidebarLinks={sidebarLinks} user={user as User} />
    </div>
  );
}
