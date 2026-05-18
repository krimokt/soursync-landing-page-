import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { FeaturesPageContent } from "@/components/pages/FeaturesPageContent";

export const metadata: Metadata = {
  title: "SourSync Features — Client Portal, Quotations, Shipping & Payment Management",
  description:
    "Explore all SourSync features: client portal for sourcing agents, quotation management, order tracking, shipping updates, and payment records. One platform, zero chaos.",
  keywords:
    "sourcing agent features, client portal sourcing, quotation management software, shipping tracking sourcing, payment tracking sourcing agents",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/features",
    languages: {
      en: "https://soursync.com/features",
      fr: "https://soursync.com/fr/features",
      ar: "https://soursync.com/ar/features",
      "zh-Hans": "https://soursync.com/zh/features",
      "x-default": "https://soursync.com/features",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: "SourSync Features — Client Portal, Quotations & Shipping",
    description:
      "Client portal, quotations, shipping, payments — all in one sourcing platform.",
    type: "website",
    url: "https://soursync.com/features",
    locale: "en_US",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "SourSync Features — Client Portal, Quotations & Shipping",
    description: "Client portal, quotations, shipping, payments — all in one sourcing platform.",
  },
};

export default function FeaturesPage() {
  return (
    <PageShell>
      <FeaturesPageContent />
    </PageShell>
  );
}
