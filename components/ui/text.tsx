import cn from "@/lib/cn";
import React from "react";

export function Title({
  children,
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h2 className={cn("text-4xl font-bold mb-12", className)} {...props}>
      {children}
    </h2>
  );
}

export function SubTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h3 className={cn("text-2xl font-bold mb-6", className)} {...props}>
      {children}
    </h3>
  );
}

export function Paragraph({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("mb-4", className)} {...props}>
      {children}
    </p>
  );
}
