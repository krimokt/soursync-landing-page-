"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BeamsBackground } from "@/components/ui/beams-background";
import { useLanguage } from '@/lib/language-context';
import { ArrowRight, Check } from 'lucide-react';
import { addToWaitlist, trackCTAClick } from '@/lib/waitlist';
import { motion } from 'motion/react';

const Hero2 = React.memo(() => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      // Track CTA click
      trackCTAClick('hero_waitlist');

      // Add to Supabase waitlist
      await addToWaitlist({
        email,
        source: 'hero',
      });

      setSubmitted(true);
      setEmail("");
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error: any) {
      console.error("Error submitting email:", error);
      // You could show an error message here
      alert(error.message || 'Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BeamsBackground 
      className="min-h-screen bg-neutral-950 pb-0 w-full"
    >
      
      {/* Content container */}
      <div className="relative z-10 w-full">

        {/* Hero section */}
        <div className="container mx-auto mt-24 md:mt-32 px-4">
          <div className="text-center mb-16">
            <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl tracking-tight antialiased mb-6">
            {t('hero.title')}
          </h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-200 leading-relaxed font-normal antialiased mb-10">
            {t('hero.subtitle')}
          </p>
            <div className="flex flex-col items-center justify-center space-y-4 mb-12">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.div 
                      className="flex-1 relative"
                      initial={false}
                      animate={{
                        scale: email ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('hero.email_placeholder')}
                        required
                        className="w-full px-6 py-4 rounded-full bg-background/50 border border-[rgb(6,182,212)]/30 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[rgb(6,182,212)] focus:border-transparent transition-all"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        initial={false}
                        animate={{
                          boxShadow: email
                            ? '0 0 0 3px rgba(6,182,212,0.2), 0 0 20px rgba(6,182,212,0.3)'
                            : '0 0 0 0px rgba(6,182,212,0)',
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-14 px-8 rounded-full text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-[rgb(6,182,212)] hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          {t('hero.submitting')}
                        </span>
                      ) : (
                        <>
                          {t('hero.join_waitlist')}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center gap-2 px-6 py-4 rounded-full bg-[rgb(6,182,212)]/20 border border-[rgb(6,182,212)] text-[rgb(6,182,212)]">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">{t('hero.success_message')}</span>
                </div>
              )}
              <p className="text-xs text-neutral-300 pt-2">
                {t('hero.waitlist_note')}
              </p>
            </div>
            <p className="text-sm text-neutral-300 font-medium antialiased tracking-wide">
            {t('hero.used_by')}
          </p>
          </div>

            {/* Hero Image */}
          <div className="relative mx-auto w-full max-w-[95vw]">
            <div className="absolute inset-0 rounded-xl shadow-2xl bg-primary/5 blur-3xl opacity-50" />
            <Image
              src="/Soursync dashboard .png"
              alt="SourSync Dashboard Interface"
              width={1920}
              height={1080}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1920px"
              className="relative w-full h-auto shadow-2xl rounded-xl border-2 border-[rgb(6,182,212)]"
            />
          </div>
        </div>
      </div>
    </BeamsBackground>
  );
});

Hero2.displayName = "Hero2";

export { Hero2 };
