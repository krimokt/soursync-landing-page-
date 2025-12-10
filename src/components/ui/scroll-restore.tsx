"use client";

import { useEffect } from "react";

export function ScrollRestore() {
  useEffect(() => {
    // Disable browser scroll restoration
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    
    // Scroll to top on page load/refresh immediately
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      
      // Also set it on next tick to ensure it works even if content loads later
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 0);
    }
  }, []);

  return null;
}



