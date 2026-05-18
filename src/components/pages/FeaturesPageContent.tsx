"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { WaitlistModal } from "@/components/ui/waitlist-modal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCard {
  number: string;
  title: string;
  description: string;
  bullets: string[];
  large?: boolean;
}

const features: FeatureCard[] = [
  {
    number: "01",
    title: "Client Portal",
    description:
      "Clients get their own secure dashboard. View quotations, track shipments, check payment status. No more 'what’s the update?' WhatsApp messages.",
    bullets: [
      "Each client sees only their own data",
      "Reduces daily status questions to zero",
      "Builds trust through radical transparency",
    ],
    large: true,
  },
  {
    number: "02",
    title: "Quotation Management",
    description:
      "Create structured, professional quotes in minutes. Cost breakdown, margin visibility, reusable templates. Faster client approval.",
    bullets: [
      "Full cost breakdown per line item",
      "Reusable templates save hours per week",
      "Clients approve inside the portal",
    ],
    large: false,
  },
  {
    number: "03",
    title: "Order Management",
    description:
      "Turn approved quotations into trackable orders. Clear stages, supplier notes, timeline visibility. Nothing falls through the cracks.",
    bullets: [
      "Clear order stages from confirmed to delivered",
      "Supplier notes and documents per order",
      "Full timeline visibility for you and your client",
    ],
    large: false,
  },
  {
    number: "04",
    title: "Shipping Tracking",
    description:
      "Keep clients informed with clean, reliable shipping status updates. Manual stage updates that take seconds, not hours of WhatsApp back-and-forth.",
    bullets: [
      "Simple manual stage updates (no API dependency)",
      "Clients see status live in their portal",
      "Replaces long WhatsApp threads instantly",
    ],
    large: true,
  },
  {
    number: "05",
    title: "Payment Tracking",
    description:
      "Log deposits, track balances, record payment milestones per order. Clear visibility for you and your clients.",
    bullets: [
      "Log deposit and final payment per order",
      "Outstanding balance visible at a glance",
      "Clients see their payment history",
    ],
    large: true,
  },
  {
    number: "06",
    title: "Product & Supplier Records",
    description:
      "Build a reusable knowledge base. Save supplier details, product specs, and pricing history for faster future sourcing.",
    bullets: [
      "Supplier contact and rating history",
      "Product specs and images stored per SKU",
      "Speeds up repeat order turnaround",
    ],
    large: false,
  },
  {
    number: "07",
    title: "Multi-Client Workspace",
    description:
      "Manage 3, 10, or 20 clients without mixing files or conversations. Organized pipelines, better follow-up discipline.",
    bullets: [
      "Completely isolated data per client",
      "Pipeline view across all active orders",
      "Built for solo agents scaling up",
    ],
    large: false,
  },
  {
    number: "08",
    title: "Landing Page Builder",
    description:
      "Present your sourcing agency professionally. Create a branded page, capture leads, connect them to your portal. Pro+ feature.",
    bullets: [
      "Branded agency page in minutes",
      "Lead capture form connected to your workspace",
      "Custom domain support on Pro+ plans",
    ],
    large: true,
  },
];

export function FeaturesPageContent() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".feature-card");
      if (!cards) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

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
            <p className="text-xs uppercase tracking-[0.2em] text-[rgb(6,182,212)] mb-5 font-bold">
              Features
            </p>
            <h1
              className="font-display font-extrabold text-foreground text-4xl md:text-6xl lg:text-7xl max-w-4xl mb-6"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              Everything you need to run a professional sourcing operation.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-10">
              One platform that replaces WhatsApp chaos, scattered spreadsheets, and
              manual follow-ups — with a clean system your clients will actually trust.
            </p>
            <button
              onClick={() => setWaitlistOpen(true)}
              className="inline-flex items-center gap-2 bg-[rgb(6,182,212)] text-black font-bold px-7 py-3.5 rounded-xl hover:bg-[rgb(6,182,212)]/90 transition-colors text-sm"
            >
              Start your free 14-day trial
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Feature Bento Grid ───────────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div
            ref={gridRef}
            className="grid grid-cols-12 gap-4 md:gap-5"
          >
            {features.map((f) => (
              <div
                key={f.number}
                className={[
                  "feature-card relative bg-card border border-border rounded-2xl p-8 flex flex-col",
                  "col-span-12",
                  f.large
                    ? "lg:col-span-7"
                    : "lg:col-span-5",
                ].join(" ")}
              >
                {/* Faint watermark number on large cards */}
                {f.large && (
                  <span
                    className="absolute top-6 right-8 font-display font-extrabold text-foreground/[0.04] select-none pointer-events-none"
                    style={{ fontSize: "clamp(4rem, 10vw, 8rem)", lineHeight: 1 }}
                    aria-hidden
                  >
                    {f.number}
                  </span>
                )}

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(6,182,212)] mb-4">
                  {f.number}
                </p>
                <h2
                  className="font-display font-semibold text-foreground text-xl md:text-2xl mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {f.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-lg">
                  {f.description}
                </p>

                <ul className="mt-auto space-y-2">
                  {f.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-2 text-sm text-muted-foreground"
                    >
                      <span
                        className="text-[rgb(6,182,212)] font-bold leading-none select-none"
                        aria-hidden
                      >
                        ·
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[rgb(6,182,212)] font-bold mb-4">
              Get started
            </p>
            <h2
              className="font-display font-extrabold text-foreground text-3xl md:text-5xl max-w-2xl mb-4"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              Ready to replace the chaos?
            </h2>
            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
              Start your free 14-day trial. No credit card required. Cancel anytime.
            </p>
            <button
              onClick={() => setWaitlistOpen(true)}
              className="inline-flex items-center gap-2 bg-[rgb(6,182,212)] text-black font-bold px-7 py-3.5 rounded-xl hover:bg-[rgb(6,182,212)]/90 transition-colors text-sm"
            >
              Start your free 14-day trial
            </button>
          </motion.div>
        </div>
      </section>

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        source="features"
      />
    </>
  );
}
