import cn from "@/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      link: "btn-link",
      outline: "btn-outline",
      solid: "btn-solid",
      transparent: "btn-transparent",
      error: "btn-error",
      warning: "btn-warning",
      success: "btn-success",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type ButtonProps = VariantProps<typeof buttonVariants> &
  React.ComponentProps<"button">;

export function Button({
  children,
  className,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ variant })} {...props}>
      {children}
    </button>
  );
}
