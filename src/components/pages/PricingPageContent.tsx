"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PricingSectionDefault } from "@/components/ui/pricing-section";

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes. Every plan comes with a 14-day free trial. No credit card required to start. Cancel at any point during the trial and you won't be charged.",
  },
  {
    q: "What's the founding offer?",
    a: "$25/month for your first 3 months, then $59/month. The founding offer is available to early adopters who join before we reach capacity. Lock in the rate and keep it as long as you stay subscribed.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No long-term contracts, no cancellation fees. Cancel from your account dashboard at any time. Your workspace stays active until the end of your billing period.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards — Visa, Mastercard, American Express — processed securely via Stripe. No PayPal or bank transfers for standard plans.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-foreground text-base md:text-lg" style={{ letterSpacing: "-0.01em" }}>
          {q}
        </span>
        <span
          className={[
            "mt-1 flex-shrink-0 w-5 h-5 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-transform duration-200",
            open ? "rotate-45" : "",
          ].join(" ")}
          aria-hidden
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-sm leading-relaxed pb-5 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PricingPageContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[rgb(6,182,212)] font-bold mb-5">
              Pricing
            </p>
            <h1
              className="font-display font-extrabold text-foreground text-4xl md:text-6xl lg:text-7xl max-w-3xl mb-5"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              Simple, transparent pricing.
            </h1>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              Start free. No credit card. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Cards (existing component) ───────────────────── */}
      <PricingSectionDefault />

      {/* ── Pricing FAQ ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[rgb(6,182,212)] font-bold mb-4">
              FAQ
            </p>
            <h2
              className="font-display font-extrabold text-foreground text-3xl md:text-4xl max-w-lg"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Pricing questions, answered.
            </h2>
          </motion.div>

          <div className="max-w-3xl">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
