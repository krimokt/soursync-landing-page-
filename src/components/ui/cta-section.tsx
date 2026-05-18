"use client";

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from '@/lib/language-context';
import { addToWaitlist, trackCTAClick } from '@/lib/waitlist';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const trustBadges = ["No credit card", "Cancel anytime", "Early access"];

export const CTASection = React.memo(function CTASection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      ".cta-heading",
      { opacity: 0, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }
    )
      .fromTo(
        ".cta-subtitle",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65 },
        "-=0.5"
      )
      .fromTo(
        ".cta-form",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55 },
        "-=0.4"
      )
      .fromTo(
        ".cta-badges",
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        "-=0.2"
      );
  }, { scope: sectionRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      trackCTAClick('cta_section_waitlist');
      await addToWaitlist({ email, source: 'cta' });
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error: unknown) {
      console.error("Error submitting email:", error);
      const msg = error instanceof Error ? error.message : 'Failed to join waitlist. Please try again.';
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-background relative overflow-hidden"
    >
      {/* Radial glow behind the card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(6,182,212,0.15), transparent)',
        }}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        {/* Bordered card */}
        <div className="rounded-3xl border border-[rgb(6,182,212)]/20 bg-card p-12 md:p-16 text-center">

          <h2
            className="cta-heading font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6"
            style={{ opacity: 0, letterSpacing: '-0.03em', lineHeight: 1.0 }}
          >
            {t('cta.title')}
          </h2>

          <p
            className="cta-subtitle text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto"
            style={{ opacity: 0 }}
          >
            {t('cta.subtitle')}
          </p>

          <div className="cta-form flex flex-col items-center gap-4" style={{ opacity: 0 }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.div
                    className="flex-1 relative"
                    initial={false}
                    animate={{ scale: email ? 1.01 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('cta.email_placeholder')}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[rgb(6,182,212)]/40 focus:border-[rgb(6,182,212)]/40 transition-all text-sm"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      initial={false}
                      animate={{
                        boxShadow: email
                          ? '0 0 0 1px rgba(6,182,212,0.3), 0 0 20px rgba(6,182,212,0.12)'
                          : '0 0 0 0px rgba(6,182,212,0)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 px-7 rounded-xl text-sm font-bold text-black bg-[rgb(6,182,212)] hover:bg-[rgb(6,182,212)]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        {t('cta.submitting')}
                      </span>
                    ) : (
                      <>
                        {t('cta.join_waitlist')}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-2 px-5 py-4 rounded-xl bg-[rgb(6,182,212)]/10 border border-[rgb(6,182,212)]/30 text-[rgb(6,182,212)]">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium text-sm">{t('cta.success_message')}</span>
              </div>
            )}
          </div>

          {/* Trust badges */}
          <div className="cta-badges flex items-center justify-center gap-6 mt-8 flex-wrap" style={{ opacity: 0 }}>
            {trustBadges.map((label, i) => (
              <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground/60">
                {i > 0 && <span className="text-border/60 select-none">·</span>}
                <span>{label}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground/50">
            {t('cta.note')}
          </p>
        </div>
      </div>
    </section>
  );
});
