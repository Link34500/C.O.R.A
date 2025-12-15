import { SidebarIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="navbar w-full bg-base-300">
      <label
        htmlFor="my-drawer-4"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
        <SidebarIcon />
      </label>
      <div className="px-4">Admin Panel</div>
    </nav>
  );
}
