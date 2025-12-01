import React from "react";

interface NavElement {
  label: string;
  href: string;
}

export function Navbar({
  navElements,
  className,
  ...props
}: React.ComponentProps<"nav"> & { navElements: NavElement[] }) {
  return <nav></nav>;
}
