"use client";
import React from "react";
import { Sidebar, SidebarHeader } from "./ui/sidebar";

interface AdminSidebarProps {
  title: React.ReactNode;
}

export function AdminSidebar({ title }: AdminSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-xl font-semibold">{title}</h1>
      </SidebarHeader>
    </Sidebar>
  );
}
