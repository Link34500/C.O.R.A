import cn from "@/lib/cn";
import React from "react";

export default function Section({
  children,
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("px-8 py-12 gap-5 justify-center", className)}
      {...props}
    >
      <div className="container mx-auto">{children}</div>
    </section>
  );
}
