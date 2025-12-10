"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Highlight } from '@/components/ui/hero-highlight';
import { useLanguage } from '@/lib/language-context';

const FAQSection = React.memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4'),
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5'),
    },
    {
      question: t('faq.q6'),
      answer: t('faq.a6'),
    },
    {
      question: t('faq.q7'),
      answer: t('faq.a7'),
    },
    {
      question: t('faq.q8'),
      answer: t('faq.a8'),
    },
    {
      question: t('faq.q9'),
      answer: t('faq.a9'),
    },
    {
      question: t('faq.q10'),
      answer: t('faq.a10'),
    },
    {
      question: t('faq.q11'),
      answer: t('faq.a11'),
    },
    {
      question: t('faq.q12'),
      answer: t('faq.a12'),
    },
    {
      question: t('faq.q13'),
      answer: t('faq.a13'),
    },
    {
      question: t('faq.q14'),
      answer: t('faq.a14'),
    },
    {
      question: t('faq.q15'),
      answer: t('faq.a15'),
    },
    {
      question: t('faq.q16'),
      answer: t('faq.a16'),
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div 
      className="relative min-h-screen overflow-hidden py-20 -mt-1 bg-transparent"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            <Highlight className="bg-[rgb(6,182,212)] text-white">
            {t('faq.title')}
            </Highlight>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="rounded-[10%] bg-card/50 backdrop-blur-sm border border-border overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-[rgb(6,182,212)]/10 transition-all"
              >
                <span className="text-lg font-semibold text-foreground pr-8">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-foreground flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">{t('faq.more_questions')}</p>
          <button className="h-12 rounded-full bg-[rgb(6,182,212)] px-8 text-base font-medium text-white hover:bg-[rgb(6,182,212)]/90">
            {t('faq.contact_support')}
          </button>
        </div>
      </div>
    </motion.div>
  );
});

FAQSection.displayName = "FAQSection";

export { FAQSection };
