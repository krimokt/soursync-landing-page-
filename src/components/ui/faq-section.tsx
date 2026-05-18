"use client";

import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from '@/lib/language-context';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Defined at module level so React never remounts it on re-render
interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  openIndex: number | null;
  onToggle: (index: number) => void;
}

function FAQItem({ question, answer, index, openIndex, onToggle }: FAQItemProps) {
  const isOpen = openIndex === index;
  return (
    <div className="faq-item border-b border-border last:border-b-0" style={{ opacity: 0 }}>
      <button
        onClick={() => onToggle(index)}
        className="w-full py-5 flex items-start justify-between text-left gap-4"
        aria-expanded={isOpen}
      >
        <span className={`text-sm font-semibold leading-snug transition-colors duration-200 ${
          isOpen ? 'text-[rgb(6,182,212)]' : 'text-foreground'
        }`}>
          {question}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 mt-0.5 text-muted-foreground transition-transform duration-300 ease-out ${
            isOpen ? 'rotate-180 text-[rgb(6,182,212)]' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const FAQSection = React.memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const faqs = [
    { question: t('faq.q1'),  answer: t('faq.a1')  },
    { question: t('faq.q2'),  answer: t('faq.a2')  },
    { question: t('faq.q3'),  answer: t('faq.a3')  },
    { question: t('faq.q4'),  answer: t('faq.a4')  },
    { question: t('faq.q5'),  answer: t('faq.a5')  },
    { question: t('faq.q6'),  answer: t('faq.a6')  },
    { question: t('faq.q7'),  answer: t('faq.a7')  },
    { question: t('faq.q8'),  answer: t('faq.a8')  },
    { question: t('faq.q9'),  answer: t('faq.a9')  },
    { question: t('faq.q10'), answer: t('faq.a10') },
    { question: t('faq.q11'), answer: t('faq.a11') },
    { question: t('faq.q12'), answer: t('faq.a12') },
    { question: t('faq.q13'), answer: t('faq.a13') },
    { question: t('faq.q14'), answer: t('faq.a14') },
    { question: t('faq.q15'), answer: t('faq.a15') },
    { question: t('faq.q16'), answer: t('faq.a16') },
  ];

  const leftColumn  = faqs.slice(0, 8);
  const rightColumn = faqs.slice(8, 16);

  const handleToggle = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  useGSAP(() => {
    gsap.fromTo(
      ".faq-header",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".faq-header", start: "top 85%", toggleActions: "play none none none" },
      }
    );
    gsap.fromTo(
      ".faq-item",
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.45, ease: "power3.out", stagger: 0.04,
        scrollTrigger: { trigger: ".faq-item", start: "top 88%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Left-aligned header */}
        <div className="faq-header mb-10" style={{ opacity: 0 }}>
          <p className="text-[rgb(6,182,212)] text-xs font-semibold uppercase tracking-[0.2em] mb-5">
            FAQ
          </p>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground"
            style={{ letterSpacing: '-0.03em', lineHeight: 1.0 }}
          >
            {t('faq.title')}
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mt-4 leading-relaxed">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
          <div>
            {leftColumn.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                index={i}
                openIndex={openIndex}
                onToggle={handleToggle}
              />
            ))}
          </div>
          <div>
            {rightColumn.map((faq, i) => (
              <FAQItem
                key={i + 8}
                question={faq.question}
                answer={faq.answer}
                index={i + 8}
                openIndex={openIndex}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        {/* Contact support */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-muted-foreground text-sm">{t('faq.more_questions')}</p>
          <button className="bg-[rgb(6,182,212)] text-black font-bold rounded-xl px-6 py-2.5 hover:bg-[rgb(6,182,212)]/90 transition-colors duration-200 text-sm">
            {t('faq.contact_support')}
          </button>
        </div>

      </div>
    </section>
  );
});

FAQSection.displayName = "FAQSection";

export { FAQSection };
