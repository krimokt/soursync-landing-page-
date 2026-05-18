"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { WaitlistModal } from "@/components/ui/waitlist-modal";

interface Value {
  num: string;
  title: string;
  detail: string;
}

interface AboutPageContentProps {
  headline: string;
  mission: string;
  values: Value[];
  ctaLabel: string;
}

export function AboutPageContent({
  headline,
  mission,
  values,
  ctaLabel,
}: AboutPageContentProps) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

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
              About Us
            </p>
            <h1
              className="font-display font-extrabold text-foreground text-4xl md:text-6xl lg:text-7xl max-w-4xl"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              {headline}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────── */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[rgb(6,182,212)] font-bold mb-5">
              Mission
            </p>
            <p
              className="font-display font-semibold text-foreground text-xl md:text-2xl lg:text-3xl leading-snug"
              style={{ letterSpacing: "-0.015em" }}
            >
              {mission}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="py-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[rgb(6,182,212)] font-bold mb-4">
              What we believe
            </p>
          </div>
        </div>
        {values.map((v, i) => (
          <motion.div
            key={v.num}
            className="border-t border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid grid-cols-12 gap-4 py-10 md:py-14">
                <div className="col-span-12 md:col-span-1">
                  <p
                    className="font-display font-extrabold text-foreground/10 select-none"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}
                    aria-hidden
                  >
                    {v.num}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4 md:col-start-2">
                  <h2
                    className="font-display font-bold text-foreground text-xl md:text-2xl"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {v.title}
                  </h2>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-7">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {v.detail}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <button
              onClick={() => setWaitlistOpen(true)}
              className="inline-flex items-center gap-2 bg-[rgb(6,182,212)] text-black font-bold px-7 py-3.5 rounded-xl hover:bg-[rgb(6,182,212)]/90 transition-colors text-sm"
            >
              {ctaLabel}
            </button>
          </motion.div>
        </div>
      </section>

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        source="about"
      />
    </>
  );
}
