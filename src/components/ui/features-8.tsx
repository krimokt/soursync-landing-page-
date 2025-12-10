"use client";

import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card'
import { BlurredStagger } from '@/components/ui/blurred-stagger-text'
import { Check, Users, FileText, Package, Truck, CreditCard, Database, Briefcase, Globe } from 'lucide-react'
import { useLanguage } from '@/lib/language-context';

export function Features() {
    const { t } = useLanguage();

    const featureCards = [
        { id: 1, colSpan: "col-span-full lg:col-span-3", icon: Users },
        { id: 2, colSpan: "col-span-full lg:col-span-3", icon: FileText },
        { id: 3, colSpan: "col-span-full lg:col-span-3", icon: Package },
        { id: 4, colSpan: "col-span-full lg:col-span-3", icon: Truck },
        { id: 5, colSpan: "col-span-full lg:col-span-3", icon: CreditCard },
        { id: 6, colSpan: "col-span-full lg:col-span-3", icon: Database },
        { id: 7, colSpan: "col-span-full lg:col-span-3", icon: Briefcase },
        { id: 8, colSpan: "col-span-full lg:col-span-3", icon: Globe },
    ];

    return (
        <section className="py-8 md:py-12 bg-transparent">
            <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
                {/* Title Section */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-sans">
                        <BlurredStagger text={t('features.title')} className="text-4xl md:text-5xl lg:text-6xl font-bold" />
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">{t('features.subtitle')}</p>
                </motion.div>

                <div className="relative">
                    <div className="relative z-10 grid grid-cols-6 gap-3">
                        {featureCards.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <motion.div
                                    key={card.id}
                                    className={card.colSpan}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                >
                                    <Card className="group relative overflow-hidden border-border bg-card hover:border-[rgb(6,182,212)]/30 hover:shadow-xl hover:shadow-[rgb(6,182,212)]/10 transition-all duration-300 cursor-default h-full">
                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(6,182,212)]/0 via-[rgb(6,182,212)]/0 to-[rgb(6,182,212)]/0 group-hover:from-[rgb(6,182,212)]/5 group-hover:via-[rgb(6,182,212)]/0 group-hover:to-[rgb(6,182,212)]/5 transition-all duration-300 pointer-events-none" />
                                        
                                        <CardContent className="pt-6 pb-6 flex flex-col h-full relative z-10">
                                            <div className="space-y-4 flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <motion.div 
                                                        className="relative flex aspect-square size-12 rounded-full border border-border before:absolute before:-inset-2 before:rounded-full before:border border-border/50 bg-[rgb(6,182,212)]/10 group-hover:bg-[rgb(6,182,212)]/20 transition-all duration-300"
                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <Icon className="m-auto size-6 text-[rgb(6,182,212)] group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                                                    </motion.div>
                                                    <h2 className="text-xl font-semibold text-foreground group-hover:text-[rgb(6,182,212)] transition-colors duration-300">{t(`features.card${card.id}.title`)}</h2>
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{t(`features.card${card.id}.desc`)}</p>
                                                <ul className="space-y-2 mt-4">
                                                    <li className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
                                                        <Check className="w-4 h-4 text-[rgb(6,182,212)] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                                                        <span>{t(`features.card${card.id}.bullet1`)}</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
                                                        <Check className="w-4 h-4 text-[rgb(6,182,212)] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                                                        <span>{t(`features.card${card.id}.bullet2`)}</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
                                                        <Check className="w-4 h-4 text-[rgb(6,182,212)] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                                                        <span>{t(`features.card${card.id}.bullet3`)}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
