import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { PricingPageContent } from "@/components/pages/PricingPageContent";

export const metadata: Metadata = {
  title: "SourSync Pricing — Pro & Agency Plans Starting at $59/month",
  description:
    "SourSync Pro at $59/month with 14-day free trial. Founding offer: $25/month for 3 months. Agency white-label plan at $199/month.",
  keywords:
    "sourcing software pricing, sourcing agent software cost, sourcing management platform price",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/pricing",
    languages: {
      en: "https://soursync.com/pricing",
      fr: "https://soursync.com/fr/pricing",
      ar: "https://soursync.com/ar/pricing",
      "zh-Hans": "https://soursync.com/zh/pricing",
      "x-default": "https://soursync.com/pricing",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: "SourSync Pricing — Pro & Agency Plans",
    description:
      "Simple, transparent pricing starting at $59/month. 14-day free trial, no credit card required.",
    type: "website",
    url: "https://soursync.com/pricing",
    locale: "en_US",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "SourSync Pricing — Pro & Agency Plans",
    description: "Simple, transparent pricing starting at $59/month. 14-day free trial, no credit card required.",
  },
};

export default function PricingPage() {
  return (
    <PageShell>
      <PricingPageContent />
    </PageShell>
  );
}
