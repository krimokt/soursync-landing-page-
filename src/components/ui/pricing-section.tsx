"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useLanguage } from '@/lib/language-context'
import { WaitlistModal } from "@/components/ui/waitlist-modal"

// ─── Plan data ──────────────────────────────────────────────────────────────

const proFeatures = [
  "Quotation management",
  "Client portal",
  "Shipping & order tracking",
  "Payment records",
  "Product management",
  "Landing page builder",
  "Admin dashboard",
  "Email support + early access",
]

const agencyFeatures = [
  "Everything in Pro",
  "White-label branding",
  "Custom domain support",
  "Advanced client experience",
  "Higher usage limits",
  "Priority support & onboarding",
  "Custom feature requests",
  "Growth-focused infrastructure",
]

// ─── Card ───────────────────────────────────────────────────────────────────

interface PlanCardProps {
  tag?: string
  name: string
  price: string
  priceDetail?: React.ReactNode
  description: string
  features: string[]
  cta: string
  trialNote?: string
  highlighted?: boolean
  planName: string
  delay?: number
}

function PlanCard({
  tag,
  name,
  price,
  priceDetail,
  description,
  features,
  cta,
  trialNote,
  highlighted,
  planName,
  delay = 0,
}: PlanCardProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut", delay }}
        className={[
          "relative flex flex-col rounded-2xl border p-8 md:p-10 h-full min-h-full",
          "transition-[border-color,box-shadow] duration-300",
          highlighted
            ? "border-[rgb(6,182,212)]/40 bg-card shadow-[0_2px_40px_rgba(6,182,212,0.07)] dark:shadow-[0_2px_60px_rgba(6,182,212,0.1)] hover:border-[rgb(6,182,212)]/60"
            : "border-border bg-card hover:border-border/60",
        ].join(" ")}
      >
        {/* Cyan top line on highlighted */}
        {highlighted && (
          <div className="absolute top-0 inset-x-0 h-px bg-[rgb(6,182,212)] rounded-t-2xl" />
        )}

        {/* Tag */}
        {tag && (
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(6,182,212)] mb-6">
            {tag}
          </p>
        )}

        {/* Plan name */}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
          {name}
        </p>

        {/* Price — the hero */}
        <div className="mb-2">
          <span
            className="font-display font-extrabold text-foreground leading-none"
            style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)", letterSpacing: "-0.05em" }}
          >
            {price}
          </span>
          <span className="text-sm text-muted-foreground ml-2">/month</span>
        </div>

        {/* Price detail — founding offer or sub-line */}
        {priceDetail && (
          <div className="mb-6 text-sm text-muted-foreground leading-relaxed">
            {priceDetail}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-xs">
          {description}
        </p>

        {/* CTA */}
        <button
          onClick={() => setOpen(true)}
          className={[
            "w-full h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2",
            "transition-all duration-200 mb-2",
            highlighted
              ? "bg-[rgb(6,182,212)] text-black hover:bg-[rgb(6,182,212)]/90"
              : "bg-foreground text-background hover:bg-foreground/90",
          ].join(" ")}
        >
          {cta}
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Trial note */}
        {trialNote && (
          <p className="text-center text-xs text-muted-foreground mb-5">
            {trialNote}
          </p>
        )}

        {/* Divider */}
        <div className="border-t border-border mb-5" />

        {/* Feature list — flat, no icons, no categories */}
        <ul className="space-y-3 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-baseline gap-3 text-sm text-muted-foreground">
              <span className="text-[rgb(6,182,212)] font-bold leading-none mt-px select-none" aria-hidden>·</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <WaitlistModal isOpen={open} onClose={() => setOpen(false)} planName={planName} source="pricing" />
    </>
  )
}

// ─── Section ────────────────────────────────────────────────────────────────

export function PricingSectionDefault() {
  const { t } = useLanguage()

  return (
    <section id="pricing" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Header */}
        <motion.div
          className="mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[rgb(6,182,212)] text-xs font-bold uppercase tracking-[0.2em] mb-5">
            Pricing
          </p>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground max-w-2xl"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.0 }}
          >
            {t('pricing.title')}
          </h2>
          <p className="text-muted-foreground text-base max-w-md mt-5 leading-relaxed">
            Replace WhatsApp + Excel with one professional sourcing management system.
          </p>
        </motion.div>

        {/* Cards — items-stretch so both reach same height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          <PlanCard
            highlighted
            tag="Founding Offer Available"
            name="Pro Plan"
            price="$59"
            priceDetail={
              <>
                <span className="font-semibold text-foreground">$25/month</span> for your first 3 months
                <br />
                <span className="text-muted-foreground/70">then $59/month — cancel anytime</span>
              </>
            }
            description="For sourcing agents, import/export businesses, and small teams replacing WhatsApp + Excel with a professional system."
            features={proFeatures}
            cta="Start 14-Day Free Trial"
            trialNote="No credit card required"
            planName="Pro"
            delay={0.1}
          />

          <PlanCard
            tag="White-Label Platform"
            name="Agency Plan"
            price="$199"
            priceDetail={
              <>
                <span className="font-semibold text-foreground">Full access from day one.</span>
                <br />
                <span className="text-muted-foreground/70">Your brand, your domain, your client portal</span>
              </>
            }
            description="For agencies and sourcing businesses that want their own branded platform — no SourSync branding, full white-label experience."
            features={agencyFeatures}
            cta="Join Waitlist"
            trialNote="Priority onboarding included"
            planName="Agency"
            delay={0.2}
          />
        </div>

        {/* Bottom note */}
        <motion.p
          className="mt-10 text-center text-xs text-muted-foreground/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          All plans include a 14-day free trial. No setup fees. No hidden costs.
        </motion.p>

      </div>
    </section>
  )
}

