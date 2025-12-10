"use client"

import * as React from "react"
import { motion } from "motion/react"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Tab } from "@/components/ui/pricing-tab"
import { Highlight } from "@/components/ui/hero-highlight"
import { useLanguage } from '@/lib/language-context';

interface PricingSectionProps {
  title: string
  subtitle: string
  tiers: PricingTier[]
  frequencies: string[]
}

export function PricingSection({
  title,
  subtitle,
  tiers,
  frequencies,
}: PricingSectionProps) {
  const { t } = useLanguage();
  const [selectedFrequency, setSelectedFrequency] = React.useState(frequencies[0])

  return (
    <motion.section 
      id="pricing"
      className="relative overflow-hidden pt-6 pb-20 -mt-1 bg-transparent"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center gap-10 py-10">
          <motion.div 
            className="space-y-7 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-medium md:text-5xl lg:text-6xl">
                <Highlight className="bg-[rgb(6,182,212)] text-white">
                  {t('pricing.title')}
                </Highlight>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('pricing.subtitle')}</p>
            </div>
            <div className="mx-auto flex w-fit rounded-full bg-muted/50 border border-[rgb(6,182,212)] p-1 shadow-sm">
              {frequencies.map((freq) => (
                <Tab
                  key={freq}
                  text={t(`pricing.${freq}`)}
                  selected={selectedFrequency === freq}
                  setSelected={setSelectedFrequency}
                  discount={freq === "yearly"}
                />
              ))}
            </div>
          </motion.div>

          <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <PricingCard
                  tier={{
                    ...tier,
                    name: t(`pricing.plan.${tier.id}.name`),
                    description: t(`pricing.plan.${tier.id}.desc`),
                    cta: t(`pricing.plan.${tier.id}.cta`),
                  }}
                  paymentFrequency={selectedFrequency}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </motion.section>
  )
}

export const PAYMENT_FREQUENCIES = ["monthly", "yearly"]

export const TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: {
      monthly: 25,
      yearly: 21,
    },
    description: "Best for new or solo agents who want a professional system instead of WhatsApp + Excel.",
    features: [
      "Client portal (clients see only their own data)",
      "Quotation management (structured quotes)",
      "Order management basics",
      "Shipping status updates",
      "Payment tracking records",
      "Client and product database",
      "Basic documents & notes",
      "Email support",
    ],
    cta: "Join Waitlist",
  },
  {
    id: "growth",
    name: "Growth",
    price: {
      monthly: 45,
      yearly: 38,
    },
    description: "Best for active agents managing more clients and frequent shipments.",
    features: [
      "Everything in Starter",
      "Advanced quotation workflow",
      "(cost breakdown, margin clarity, faster reuse)",
      "More detailed order and supplier tracking",
      "Priority support",
      "Improved client reporting and history",
    ],
    cta: "Join Waitlist",
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: {
      monthly: 89,
      yearly: 74,
    },
    description: "Best for agencies that want a stronger brand experience and scalable operations.",
    features: [
      "Everything in Growth",
      "Agency website / landing builder",
      "(present your services professionally)",
      "Custom branding options",
      "(logo, colors)",
      "Advanced client experience features",
      "Higher usage limits (clients, orders, storage)",
    ],
    cta: "Join Waitlist",
  },
]

// Default export for backward compatibility
export function PricingSectionDefault() {
  const { t } = useLanguage();
  
  return (
    <PricingSection
      title={t('pricing.title')}
      subtitle={t('pricing.subtitle')}
      frequencies={PAYMENT_FREQUENCIES}
      tiers={TIERS}
    />
  )
}
