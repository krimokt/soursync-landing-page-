"use client";

import React from "react";

const rows = [
  {
    label: "Sourcing",
    platforms: ["Alibaba", "1688", "Made-in-China", "Global Sources"],
  },
  {
    label: "Logistics",
    platforms: ["DHL", "FedEx", "UPS", "Maersk"],
  },
];

export const LogoCloud = React.memo(function LogoCloud() {
  return (
    <div className="w-full border-y border-border/20 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {rows.map((row, ri) => (
          <div
            key={row.label}
            className={`flex items-baseline gap-8 py-4 md:py-5 ${
              ri < rows.length - 1 ? "border-b border-border/20" : ""
            }`}
          >
            {/* Category label */}
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground/40 w-20 flex-shrink-0">
              {row.label}
            </span>

            {/* Platform names */}
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              {row.platforms.map((name, i) => (
                <span
                  key={name}
                  className="text-sm font-medium text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-200 cursor-default"
                >
                  {name}
                  {i < row.platforms.length - 1 && (
                    <span className="ml-6 text-border/60 select-none">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
});
