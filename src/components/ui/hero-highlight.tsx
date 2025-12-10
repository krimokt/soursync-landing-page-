"use client";

import { cn } from "@/lib/utils";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";

import React, { useCallback, useRef } from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) => {
    if (!currentTarget) return;

    // Throttle using requestAnimationFrame for smoother performance
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
        rafRef.current = null;
      });
    }
  }, [mouseX, mouseY]);

  // Memoize dot pattern to avoid recreating on every render
  const dotPatternLight = React.useMemo(() => ({
    backgroundImage: `radial-gradient(circle, rgb(231 234 238) 1px, transparent 1px)`,
    backgroundSize: '16px 16px',
  }), []);

  const dotPatternDark = React.useMemo(() => ({
    backgroundImage: `radial-gradient(circle, rgb(41 58 82) 1px, transparent 1px)`,
    backgroundSize: '16px 16px',
  }), []);

  const dotPatternPrimary = React.useMemo(() => ({
    backgroundImage: `radial-gradient(circle, rgb(0 122 255) 1px, transparent 1px)`,
    backgroundSize: '16px 16px',
  }), []);

  return (
    <div
      className={cn(
        "relative flex items-center bg-background justify-center w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-70" 
        style={dotPatternLight}
      />
      <div 
        className="absolute inset-0 dark:opacity-70 opacity-0 pointer-events-none" 
        style={dotPatternDark}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
            ...dotPatternPrimary,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
          `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-primary/30 to-primary/50`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};

