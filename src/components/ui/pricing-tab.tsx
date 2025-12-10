"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

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
        "relative w-fit px-4 py-2 text-sm font-semibold capitalize",
        "transition-colors",
        "flex items-center justify-center gap-2.5",
        selected ? "text-primary-foreground" : "text-muted-foreground"
      )}
    >
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className="absolute inset-0 z-0 rounded-full bg-primary shadow-sm"
        />
      )}
      <span className="relative z-10">{text}</span>
      {discount && (
        <Badge
          variant="secondary"
          className={cn(
            "relative z-10 whitespace-nowrap shadow-none",
            selected 
              ? "bg-white/20 text-white border-white/30 border-[rgb(6,182,212)]/30" 
              : "bg-muted/50 text-muted-foreground border-[rgb(6,182,212)]/20"
          )}
        >
          Get 2 months free
        </Badge>
      )}
    </button>
  )
}

