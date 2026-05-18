"use client";

import React from "react";
import { Features } from "./features-8";

const FeaturesSection = React.memo(() => {
  return (
    <div id="features" className="bg-background">
      <Features />
    </div>
  );
});

FeaturesSection.displayName = "FeaturesSection";

export { FeaturesSection };
