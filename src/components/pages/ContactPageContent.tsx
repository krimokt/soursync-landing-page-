"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ContactPageContentProps {
  label?: string;
  headline?: string;
  subtitle?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  subjectLabel?: string;
  subjectPlaceholder?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  successMessage?: string;
  subjectOptions?: string[];
}

export function ContactPageContent({
  label = "Contact",
  headline = "Let's talk.",
  subtitle = "Have a question, a feature request, or just want to know if SourSync is right for you? We reply within 24 hours.",
  namePlaceholder = "Your name",
  emailPlaceholder = "your@email.com",
  subjectLabel = "Subject (optional)",
  subjectPlaceholder = "What's this about?",
  messagePlaceholder = "Your message...",
  submitLabel = "Send message",
  successMessage = "Message sent. We'll be in touch within 24 hours.",
  subjectOptions = [
    "General question",
    "Demo request",
    "Support",
    "Partnership",
  ],
}: ContactPageContentProps) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", delay: 0.1 }
      );
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[rgb(6,182,212)]/40 w-full text-sm transition-shadow";

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* ── Left column ─────────────────────────────────────── */}
          <div ref={leftRef} className="lg:col-span-2" style={{ opacity: 0 }}>
            <p className="text-xs uppercase tracking-[0.2em] text-[rgb(6,182,212)] font-bold mb-5">
              {label}
            </p>
            <h1
              className="font-display font-extrabold text-foreground text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              {headline}
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm mb-12">
              {subtitle}
            </p>

            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-bold mb-1">
                  Email
                </p>
                <a
                  href="mailto:contact@soursync.com"
                  className="text-foreground text-sm hover:text-[rgb(6,182,212)] transition-colors"
                >
                  contact@soursync.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-bold mb-1">
                  Support
                </p>
                <a
                  href="mailto:support@soursync.com"
                  className="text-foreground text-sm hover:text-[rgb(6,182,212)] transition-colors"
                >
                  support@soursync.com
                </a>
              </div>
            </div>
          </div>

          {/* ── Right column ────────────────────────────────────── */}
          <div ref={rightRef} className="lg:col-span-3" style={{ opacity: 0 }}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-start gap-4 py-16"
              >
                <div className="w-12 h-12 rounded-full bg-[rgb(6,182,212)]/10 flex items-center justify-center">
                  <Check className="w-6 h-6 text-[rgb(6,182,212)]" />
                </div>
                <p className="font-display font-semibold text-foreground text-xl" style={{ letterSpacing: "-0.01em" }}>
                  {successMessage}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={namePlaceholder}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={emailPlaceholder}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground mb-2">
                    {subjectLabel}
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="">{subjectPlaceholder}</option>
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={messagePlaceholder}
                    required
                    rows={6}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[rgb(6,182,212)] text-black font-bold px-7 py-3.5 rounded-xl hover:bg-[rgb(6,182,212)]/90 transition-colors text-sm"
                >
                  {submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
