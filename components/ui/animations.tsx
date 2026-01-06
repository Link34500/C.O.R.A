"use client";
import { motion } from "motion/react";

interface FadeInProps {
  delay?: number;
  direction?: "up" | "down" | "none";
}

export default function FadeIn({
  className,
  children,
  delay = 0,
  direction = "up",
}: FadeInProps & React.ComponentProps<"div">) {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    none: { y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
