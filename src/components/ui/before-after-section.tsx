"use client";

import React from 'react';
import { LayoutGroup, motion } from 'motion/react';
import { TextRotate } from '@/components/ui/text-rotate';
import { XCircle, CheckCircle2, X, Check } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const BeforeAfterSection = React.memo(function BeforeAfterSection() {
  const { t } = useLanguage();

  const beforeItems = [
    t('solution.before.item1'),
    t('solution.before.item2'),
    t('solution.before.item3'),
    t('solution.before.item4'),
  ];

  const afterItems = [
    t('solution.after.item1'),
    t('solution.after.item2'),
    t('solution.after.item3'),
    t('solution.after.item4'),
  ];

  return (
    <motion.div 
      id="solution"
      className="relative overflow-hidden py-12 -mt-1 bg-transparent font-sans"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <LayoutGroup>
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-sans flex flex-wrap items-center justify-center gap-2"
              layout
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            >
              <motion.span layout transition={{ type: "spring", damping: 30, stiffness: 400 }}>
                {t('solution.title')}
              </motion.span>
              <TextRotate
                texts={t('solution.text_rotate').split(',')}
                mainClassName="text-white px-2 sm:px-2 md:px-3 bg-[rgb(6,182,212)] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </motion.h2>
          </LayoutGroup>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Before Card */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative w-full h-full rounded-3xl bg-red-500/5 border border-red-500/10 p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/40 to-red-500/0" />
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 shadow-inner shadow-red-500/5">
                      <XCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Before</h3>
                      <p className="text-sm text-red-400/80 font-medium">{t('solution.before.title')}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    {beforeItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 group">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                          <X className="w-3 h-3 text-red-400" />
                        </div>
                        <p className="text-muted-foreground group-hover:text-foreground transition-colors">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vertical Divider Line */}
            <div className="hidden md:flex absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 z-10 items-center justify-center">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-[rgb(6,182,212)]/20 to-transparent" />
              <motion.div 
                className="absolute bg-background p-1.5 rounded-full shadow-xl border border-[rgb(6,182,212)]/20"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-inner">
                  <span className="text-[rgb(6,182,212)] text-xs font-black tracking-tighter">VS</span>
                </div>
              </motion.div>
            </div>

            {/* After Card */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-[rgb(6,182,212)]/5 to-[rgb(6,182,212)]/10 border border-[rgb(6,182,212)]/20 p-8 shadow-xl shadow-[rgb(6,182,212)]/10 hover:shadow-[rgb(6,182,212)]/20 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[rgb(6,182,212)]/0 via-[rgb(6,182,212)] to-[rgb(6,182,212)]/0" />
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[rgb(6,182,212)] text-white shadow-lg shadow-[rgb(6,182,212)]/30">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">After</h3>
                      <p className="text-sm text-[rgb(6,182,212)] font-medium">{t('solution.after.title')}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    {afterItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 group">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[rgb(6,182,212)]/20 flex items-center justify-center group-hover:bg-[rgb(6,182,212)]/30 transition-colors">
                          <Check className="w-3 h-3 text-[rgb(6,182,212)]" />
                        </div>
                        <p className="text-foreground font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export { BeforeAfterSection };
