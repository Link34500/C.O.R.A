import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar title="Administration" />
      <SidebarTrigger />
      <main>{children}</main>
    </SidebarProvider>
  );
}
