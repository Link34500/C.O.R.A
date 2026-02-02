import { BirdIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@/lib/cn";

const birdVariants = cva(
  "flex justify-center items-center rounded-xl transition-all text-secondary-foreground",
  {
    variants: {
      variant: {
        default: "bg-base-100 shadow-sm",
        ghost: "bg-inherit border-none",
      },
      size: {
        sm: "p-4 max-w-xs h-32",
        md: "p-8 max-w-lg h-64",
        lg: "p-12 max-w-2xl h-96",
        full: "px-8 w-full h-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  },
);

interface BirdNotFoundProps extends VariantProps<typeof birdVariants> {
  className?: string;
}

export function BirdNotFound({ variant, size, className }: BirdNotFoundProps) {
  return (
    <div className={cn(birdVariants({ variant, size }), className)}>
      <BirdIcon
        className={cn(
          "text-base-content opacity-50",
          size === "sm" ? "w-12 h-12" : "w-full h-full",
        )}
      />
    </div>
  );
}
