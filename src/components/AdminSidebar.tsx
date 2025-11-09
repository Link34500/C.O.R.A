"use client";
import React from "react";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";

interface ElementSidebar {
  label: string;
  href: string;
  icon: string;
}

interface SidebarSection {
  title: string;
  elements: ElementSidebar[];
}

interface AdminSidebarProps {
  title: React.ReactNode;
  sections: SidebarSection[];
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
