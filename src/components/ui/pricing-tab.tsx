"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface TabProps {
  text: string
  selected: boolean
  setSelected: (text: string) => void
  discount?: boolean
}

export function Tab({
  text,
  selected,
  setSelected,
  discount = false,
}: TabProps) {
  return (
    <button
      onClick={() => setSelected(text)}
      className={cn(
        "relative w-fit px-5 py-2 text-sm font-semibold capitalize rounded-lg",
        "transition-colors duration-200",
        "flex items-center justify-center gap-2.5",
        selected ? "text-black" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className="absolute inset-0 z-0 rounded-lg bg-[rgb(6,182,212)] shadow-sm"
        />
      )}
      <span className="relative z-10">{text}</span>
      {discount && (
        <span
          className={cn(
            "relative z-10 text-xs font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap",
            selected
              ? "bg-black/20 text-black"
              : "bg-[rgb(6,182,212)]/10 text-[rgb(6,182,212)]"
          )}
        >
          -2mo
        </span>
      )}
    </button>
  )
}
