"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { BeamsBackground } from "@/components/ui/beams-background";
import { useLanguage } from '@/lib/language-context';
import { ArrowRight, Check } from 'lucide-react';
import { addToWaitlist, trackCTAClick } from '@/lib/waitlist';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero2 = React.memo(() => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(badgeRef.current, { opacity: 0, y: 20, duration: 0.6 })
      .from(headlineRef.current, { y: 60, skewY: 1, duration: 1.1 }, "-=0.3")
      .from(subtitleRef.current, { opacity: 0, y: 30, duration: 0.75 }, "-=0.6")
      .from(formRef.current, { opacity: 0, y: 20, duration: 0.65 }, "-=0.5")
      .from(imageRef.current, { y: 60, scale: 0.97, duration: 1.4, ease: "power2.out" }, "-=0.4");
  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      trackCTAClick('hero_waitlist');
      await addToWaitlist({ email, source: 'hero' });
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
    <BeamsBackground className="min-h-screen bg-background pb-16 md:pb-24 w-full">
      {/* Light-mode overlay: hides the dark beams in light mode */}
      <div className="absolute inset-0 bg-[#f8fafc] dark:hidden z-0 pointer-events-none" />

      <div className="relative z-10 w-full" ref={containerRef}>
        <div className="container mx-auto mt-16 md:mt-24 lg:mt-32 px-4 md:px-6 max-w-7xl">
          <div className="text-left mb-16 md:mb-20">
            {/* Eyebrow badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgb(6,182,212)]/20 bg-[rgb(6,182,212)]/5 mb-8"
            >
              <span className="text-[rgb(6,182,212)] text-xs font-semibold tracking-widest uppercase">
                ◆ Sourcing Operations Platform
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="font-display max-w-5xl text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground mb-8 antialiased"
              style={{
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
              }}
            >
              {t('hero.title')}
            </h1>

            <p
              ref={subtitleRef}
              className="max-w-xl text-lg text-muted-foreground leading-relaxed font-normal antialiased mb-12"
            >
              {t('hero.subtitle')}
            </p>

            <div ref={formRef} className="flex flex-col items-start gap-4 mb-16">
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
                        placeholder={t('hero.email_placeholder')}
                        required
                        className="w-full px-5 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[rgb(6,182,212)]/50 focus:border-[rgb(6,182,212)]/50 transition-all text-sm"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        initial={false}
                        animate={{
                          boxShadow: email
                            ? '0 0 0 1px rgba(6,182,212,0.3), 0 0 24px rgba(6,182,212,0.15)'
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
                          {t('hero.submitting')}
                        </span>
                      ) : (
                        <>
                          {t('hero.join_waitlist')}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center gap-2 px-5 py-4 rounded-xl bg-[rgb(6,182,212)]/10 border border-[rgb(6,182,212)]/30 text-[rgb(6,182,212)]">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium text-sm">{t('hero.success_message')}</span>
                </div>
              )}
              <p className="text-xs text-muted-foreground/60 pl-1">{t('hero.waitlist_note')}</p>
            </div>

            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
              {t('hero.used_by')}
            </p>
          </div>

          {/* Dashboard image with perspective tilt and cyan glow */}
          <div
            ref={imageRef}
            style={{ perspective: '1000px' }}
            className="relative mx-auto w-full max-w-[95vw]"
          >
            <div
              style={{
                borderRadius: '12px',
                transform: 'rotateX(3deg)',
                transformOrigin: 'center bottom',
              }}
              className="shadow-[0_20px_80px_rgba(6,182,212,0.15)] dark:shadow-[0_40px_120px_rgba(6,182,212,0.25)]"
            >
              <Image
                src="/Soursync dashboard .png"
                alt="SourSync sourcing agent dashboard showing quotations, orders, shipping tracking, and client portal in one workspace"
                width={1920}
                height={1080}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1920px"
                className="relative w-full h-auto rounded-xl border border-slate-200 dark:border-[rgb(6,182,212)]/20"
              />
            </div>
          </div>
        </div>
      </div>
    </BeamsBackground>
  );
});

Hero2.displayName = "Hero2";

export { Hero2 };
