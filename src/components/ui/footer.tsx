"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from '@/lib/language-context';

const productLinks = [
  { label: "Features", href: "/#features" },
  { label: "Solution",  href: "/#solution" },
  { label: "Pricing",   href: "/#pricing" },
];

const companyLinks = [
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
];

const connectLinks = [
  { label: "Twitter",  href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub",   href: "https://github.com" },
];

export const Footer = React.memo(function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-border py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">

          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4">
              {/* Light mode */}
              <span className="dark:hidden">
                <Image
                  src="/soursync-logo-v3.png"
                  alt="SourSync — Sourcing Agent Software"
                  width={1320}
                  height={680}
                  className="h-[40px] w-auto"
                />
              </span>
              {/* Dark mode — white rounded card */}
              <span className="hidden dark:inline-flex rounded-xl overflow-hidden border border-[#1DBDD8]/40 shadow-[0_0_14px_rgba(29,189,216,0.25)] bg-white">
                <Image
                  src="/soursync-logo-v3.png"
                  alt="SourSync — Sourcing Agent Software"
                  width={1320}
                  height={680}
                  className="h-[40px] w-auto"
                />
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
              Sourcing operations, simplified.
            </p>
          </div>

          {/* Product column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">
              Product
            </p>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">
              Company
            </p>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">
              Connect
            </p>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 <span className="font-semibold text-foreground">SourSync</span>. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t('footer.privacy')}
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t('footer.terms')}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
});
