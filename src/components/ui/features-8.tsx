"use client";

import { useRef } from 'react';
import { motion } from 'motion/react';
import { Users, FileText, Package, Truck, CreditCard, Database, Briefcase, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const featureCards = [
  { id: 1, icon: Users,      colSpan: "col-span-12 lg:col-span-7", large: true,  num: "01" },
  { id: 2, icon: FileText,   colSpan: "col-span-12 lg:col-span-5", large: false, num: "02" },
  { id: 3, icon: Package,    colSpan: "col-span-12 lg:col-span-5", large: false, num: "03" },
  { id: 4, icon: Truck,      colSpan: "col-span-12 lg:col-span-7", large: true,  num: "04" },
  { id: 5, icon: CreditCard, colSpan: "col-span-12 lg:col-span-7", large: true,  num: "05" },
  { id: 6, icon: Database,   colSpan: "col-span-12 lg:col-span-5", large: false, num: "06" },
  { id: 7, icon: Briefcase,  colSpan: "col-span-12 lg:col-span-5", large: false, num: "07" },
  { id: 8, icon: Globe,      colSpan: "col-span-12 lg:col-span-7", large: true,  num: "08" },
];

export function Features() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".features-header",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".gsap-feature-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: ".gsap-feature-card",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* Section header - left aligned */}
        <div className="features-header mb-20" style={{ opacity: 0 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(6,182,212)] mb-5">
            Platform Features
          </p>
          <h2
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground max-w-2xl"
            style={{ letterSpacing: '-0.03em', lineHeight: 1.0 }}
          >
            {t('features.title')}
          </h2>
          <p className="text-base text-muted-foreground max-w-lg mt-5 leading-relaxed">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-12 gap-5">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`gsap-feature-card ${card.colSpan}`}
                style={{ opacity: 0 }}
              >
                <motion.div
                  className="h-full"
                  whileHover={{ y: -2, transition: { duration: 0.18 } }}
                >
                  <div className="group relative h-full bg-card border border-border hover:border-[rgb(6,182,212)]/30 transition-all duration-300 rounded-2xl p-8 overflow-hidden cursor-default shadow-sm hover:shadow-md dark:shadow-none">

                    {/* Faint watermark number on large cards */}
                    {card.large && (
                      <span
                        className="absolute top-6 right-8 text-[7rem] font-black text-foreground/[0.03] leading-none select-none pointer-events-none"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {card.num}
                      </span>
                    )}

                    {/* Subtle dot grid on large cards */}
                    {card.large && (
                      <div
                        className="absolute inset-0 opacity-[0.025] pointer-events-none"
                        style={{
                          backgroundImage: 'radial-gradient(circle, rgb(6,182,212) 1px, transparent 1px)',
                          backgroundSize: '28px 28px',
                        }}
                      />
                    )}

                    <div className="relative z-10 flex flex-col h-full gap-6">
                      {/* Icon -- raw, no wrapper box */}
                      <Icon
                        size={32}
                        className="text-[rgb(6,182,212)] flex-shrink-0"
                        strokeWidth={1.5}
                      />

                      <div className="flex-1 space-y-3">
                        <h3
                          className="font-display text-xl font-semibold text-foreground"
                          style={{ letterSpacing: '-0.01em' }}
                        >
                          {t(`features.card${card.id}.title`)}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(`features.card${card.id}.desc`)}
                        </p>
                      </div>

                      <ul className="space-y-2.5">
                        {[1, 2, 3].map((b) => (
                          <li key={b} className="flex items-baseline gap-2.5 text-sm text-muted-foreground">
                            <span className="text-[rgb(6,182,212)] font-bold leading-none flex-shrink-0 select-none" aria-hidden>·</span>
                            <span>{t(`features.card${card.id}.bullet${b}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
