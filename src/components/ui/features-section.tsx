"use client";

import React from "react";
import { motion } from "motion/react";
import { Features } from "./features-8";

const FeaturesSection = React.memo(() => {
  return (
    <motion.div 
      id="features"
      className="relative overflow-hidden pt-10 pb-6 -mt-1 bg-transparent"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Content */}
      <div className="relative z-10">
        <Features />
      </div>
    </motion.div>
  );
});

FeaturesSection.displayName = "FeaturesSection";

export { FeaturesSection };

