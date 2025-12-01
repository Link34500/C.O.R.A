import cn from "@/utils/cn";
import React from "react";

export function Button({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  return <button className={cn("btn", className)}></button>;
}
