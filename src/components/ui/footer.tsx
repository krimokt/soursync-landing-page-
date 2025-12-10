"use client";

import React from "react";
import { useLanguage } from '@/lib/language-context';

export const Footer = React.memo(function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 <span className="font-semibold text-foreground">SourSync</span>. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
});
