"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 32,
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  /** Pixel offset before animate (default 32). */
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const offset =
    direction === "up"
      ? { y: distance }
      : direction === "left"
        ? { x: -distance }
        : { x: distance };

  const hidden = reduce
    ? { opacity: 1, x: 0, y: 0 }
    : { opacity: 0, ...offset };
  const visible = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={
        reduce
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 80,
              damping: 16,
              delay,
            }
      }
    >
      {children}
    </motion.div>
  );
}
