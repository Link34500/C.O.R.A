import cn from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const cardVariants = cva("card bg-base-100", {
  variants: {
    shadow: {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      xl: "shadow-xl",
    },
    bordered: {
      true: "card-border",
      false: "",
    },
    size: {
      normal: "",
      compact: "card-compact",
      side: "card-side",
    },
  },
  defaultVariants: {
    shadow: "xl",
    bordered: true,
    size: "normal",
  },
});

type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants>;

export function Card({
  children,
  className,
  shadow,
  bordered,
  size,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ shadow, bordered, size, className }))}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("card-body", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("card-title", className)} {...props}>
      {children}
    </div>
  );
}

export function CardActions({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("card-actions justify-end", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFigure({
  children,
  className,
  ...props
}: React.ComponentProps<"figure">) {
  return (
    <figure className={cn(className)} {...props}>
      {children}
    </figure>
  );
}
