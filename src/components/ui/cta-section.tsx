"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from '@/lib/language-context';
import { addToWaitlist, trackCTAClick } from '@/lib/waitlist';

export const CTASection = React.memo(function CTASection() {
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
      trackCTAClick('cta_section_waitlist');

      // Add to Supabase waitlist
      await addToWaitlist({
        email,
        source: 'cta',
      });

      setSubmitted(true);
      setEmail("");
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error: any) {
      console.error("Error submitting email:", error);
      alert(error.message || 'Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-[rgb(6,182,212)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('cta.title')}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('cta.subtitle')}
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
                      placeholder={t('cta.email_placeholder')}
                      required
                      className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent backdrop-blur-sm transition-all"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      initial={false}
                      animate={{
                        boxShadow: email
                          ? '0 0 0 3px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.2)'
                          : '0 0 0 0px rgba(255,255,255,0)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 px-8 rounded-full text-lg font-semibold text-[rgb(6,182,212)] bg-white hover:bg-white/90 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[rgb(6,182,212)]/30 border-t-[rgb(6,182,212)] rounded-full animate-spin"></span>
                        {t('cta.submitting')}
                      </span>
                    ) : (
                      <>
                        {t('cta.join_waitlist')}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/20 border border-white/30 text-white backdrop-blur-sm">
                <Check className="w-5 h-5" />
                <span className="font-medium">{t('cta.success_message')}</span>
              </div>
            )}
          </motion.div>
          
          <motion.p 
            className="mt-6 text-sm text-white/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {t('cta.note')}
          </motion.p>
        </div>
      </div>
    </section>
  );
});



