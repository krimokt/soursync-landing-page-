"use client"

import * as React from "react"
import { BadgeCheck, ArrowRight } from "lucide-react"
import NumberFlow from "@number-flow/react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { WaitlistModal } from "@/components/ui/waitlist-modal"

export interface PricingTier {
  id?: string
  name: string
  price: Record<string, number | string>
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
  popular?: boolean
}

interface PricingCardProps {
  tier: PricingTier
  paymentFrequency: string
}

export const PricingCard = React.memo(function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const price = tier.price[paymentFrequency]
  const isHighlighted = tier.highlighted
  const isPopular = tier.popular
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    setIsModalOpen(true)
  }

  return (
    <>
      <motion.div
        className={cn(
          "relative flex flex-col gap-8 overflow-hidden rounded-2xl p-6 h-full cursor-pointer",
          "border transition-all duration-300 ease-in-out",
          "hover:-translate-y-1",
          "shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-[0_8px_32px_rgba(6,182,212,0.1)]",
          isHighlighted
            ? "bg-foreground text-background border-foreground"
            : "bg-card border-border hover:border-[rgb(6,182,212)]/30",
          isPopular && "ring-2 ring-[rgb(6,182,212)]"
        )}
        onClick={handleCardClick}
        whileHover={{ transition: { duration: 0.2 } }}
      >
        {isHighlighted && <HighlightedBackground />}
        {isPopular && <PopularBackground />}

        <h2 className="flex items-center gap-3 text-xl font-semibold capitalize">
          {tier.name}
          {isPopular && (
            <Badge variant="secondary" className="mt-1 z-10">
              <AnimatedFireEmoji />
              <span className="ml-1">Most Popular</span>
            </Badge>
          )}
        </h2>

        <div className="relative h-12">
          {typeof price === "number" ? (
            <>
              <NumberFlow
                format={{
                  style: "currency",
                  currency: "USD",
                  trailingZeroDisplay: "stripIfInteger",
                }}
                value={price}
                className={cn(
                  "text-4xl font-bold",
                  isHighlighted ? "text-background" : "text-foreground"
                )}
              />
              <p className="-mt-2 text-xs text-muted-foreground">
                Per month
              </p>
            </>
          ) : (
            <h1 className={cn("text-4xl font-bold", isHighlighted ? "text-background" : "text-foreground")}>
              {price}
            </h1>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <p className={cn(
            "text-sm leading-relaxed",
            isHighlighted ? "text-background/80" : "text-muted-foreground"
          )}>
            {tier.description}
          </p>
          <ul className="space-y-2 pt-2">
            {tier.features.map((feature, index) => (
              <li
                key={index}
                className={cn(
                  "flex items-center gap-2 text-sm",
                  isHighlighted ? "text-background/90" : "text-muted-foreground"
                )}
              >
                <BadgeCheck className={cn(
                  "h-4 w-4 flex-shrink-0",
                  isHighlighted ? "text-background" : "text-[rgb(6,182,212)]"
                )} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <button
          className={cn(
            "w-full h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200",
            isHighlighted
              ? "bg-background text-foreground hover:bg-background/90"
              : "bg-[rgb(6,182,212)] text-black hover:bg-[rgb(6,182,212)]/90"
          )}
          onClick={(e) => {
            e.stopPropagation()
            setIsModalOpen(true)
          }}
        >
          {tier.cta}
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planName={tier.name}
        source="pricing"
      />
    </>
  )
});

const HighlightedBackground = () => (
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] transition-opacity duration-300 group-hover:opacity-80 pointer-events-none" />
)

const PopularBackground = () => (
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.1),rgba(255,255,255,0))] transition-all duration-300 pointer-events-none" />
)

const AnimatedFireEmoji = () => {
  return (
    <motion.span
      className="inline-block"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, -5, 5, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      🔥
    </motion.span>
  )
}
