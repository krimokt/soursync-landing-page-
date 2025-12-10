"use client";

import React from "react";
import { motion } from "motion/react";

// Sourcing and logistics companies - text only
const sourcingCompanies = [
  "Alibaba",
  "1688",
  "Made-in-China",
  "Global Sources",
  "DHL",
  "UPS",
];

export const LogoCloud = React.memo(function LogoCloud() {
  return (
    <div className="w-full py-12 bg-transparent border-b border-border/10">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
          Integrated with your favorite platforms
        </p>
        
        <div className="relative w-full overflow-hidden mask-linear-gradient">
          <div className="flex items-center justify-center gap-12 md:gap-20 flex-wrap">
             {sourcingCompanies.map((company, index) => (
               <motion.div
                 key={index}
                 className="text-neutral-400 text-lg font-semibold transition-all duration-300 hover:text-[rgb(6,182,212)] cursor-pointer"
                 whileHover={{ scale: 1.1 }}
                 initial={{ opacity: 0.6 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.3, delay: index * 0.1 }}
               >
                 {company}
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
});
