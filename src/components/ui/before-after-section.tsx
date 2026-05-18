"use client";

import React, { useRef } from 'react';
import { LayoutGroup, motion } from 'motion/react';
import { TextRotate } from '@/components/ui/text-rotate';
import { X, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BeforeAfterSection = React.memo(function BeforeAfterSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const pairs = [
    { before: t('solution.before.item1'), after: t('solution.after.item1') },
    { before: t('solution.before.item2'), after: t('solution.after.item2') },
    { before: t('solution.before.item3'), after: t('solution.after.item3') },
    { before: t('solution.before.item4'), after: t('solution.after.item4') },
  ];

  useGSAP(() => {
    gsap.fromTo(
      ".ba-heading",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".ba-heading", start: "top 85%", toggleActions: "play none none none" },
      }
    );
    gsap.fromTo(
      ".ba-row",
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ".ba-row", start: "top 85%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  return (
    <div
      ref={sectionRef}
      id="solution"
      className="relative py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Section heading */}
        <div className="ba-heading mb-16" style={{ opacity: 0 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(6,182,212)] mb-5">
            The Difference
          </p>
          <LayoutGroup>
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground flex flex-wrap items-center gap-x-3 gap-y-2"
              style={{ letterSpacing: '-0.03em', lineHeight: 1.0 }}
              layout
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            >
              <motion.span layout transition={{ type: "spring", damping: 30, stiffness: 400 }}>
                {t('solution.title')}
              </motion.span>
              <TextRotate
                texts={t('solution.text_rotate').split(',')}
                mainClassName="text-black px-3 bg-[rgb(6,182,212)] overflow-hidden py-1 justify-center rounded-lg"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </motion.h2>
          </LayoutGroup>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[1fr_auto_1fr] md:grid-cols-[1fr_64px_1fr] gap-0 mb-6 px-0">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/40 flex items-center justify-center flex-shrink-0">
              <X className="w-3 h-3 text-red-500" strokeWidth={3} />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-red-500/80">
              {t('solution.before.title')}
            </span>
          </div>
          <div />
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[rgb(6,182,212)]/10 border border-[rgb(6,182,212)]/30 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-[rgb(6,182,212)]" strokeWidth={3} />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[rgb(6,182,212)]/80">
              {t('solution.after.title')}
            </span>
          </div>
        </div>

        {/* Comparison rows */}
        <div className="rounded-2xl border border-border overflow-hidden bg-card">
          {pairs.map((pair, index) => (
            <div
              key={index}
              className={`ba-row grid grid-cols-[1fr_auto_1fr] md:grid-cols-[1fr_64px_1fr] items-center ${
                index < pairs.length - 1 ? 'border-b border-border' : ''
              }`}
              style={{ opacity: 0 }}
            >
              {/* Before cell */}
              <div className="px-5 py-5 md:px-8 md:py-6 flex items-start gap-3 group">
                <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-red-100 dark:bg-red-950/50 border border-red-200 dark:border-red-900/30 flex items-center justify-center">
                  <X className="w-2.5 h-2.5 text-red-500" strokeWidth={3} />
                </span>
                <span className="text-sm text-muted-foreground leading-relaxed line-through decoration-red-400/40">
                  {pair.before}
                </span>
              </div>

              {/* Arrow divider */}
              <div className="flex items-center justify-center border-x border-border h-full py-5 md:py-6">
                <ArrowRight className="w-4 h-4 text-[rgb(6,182,212)]" strokeWidth={2} />
              </div>

              {/* After cell */}
              <div className="px-5 py-5 md:px-8 md:py-6 flex items-start gap-3">
                <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-[rgb(6,182,212)]/10 border border-[rgb(6,182,212)]/30 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-[rgb(6,182,212)]" strokeWidth={3} />
                </span>
                <span className="text-sm text-foreground font-medium leading-relaxed">
                  {pair.after}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
});

export { BeforeAfterSection };
