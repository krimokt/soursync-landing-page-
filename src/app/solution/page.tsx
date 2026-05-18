import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { SolutionPageContent } from "@/components/pages/SolutionPageContent";

export const metadata: Metadata = {
  title: "SourSync Solution — How Sourcing Agents Replace WhatsApp + Excel",
  description:
    "Learn how SourSync helps sourcing agents replace scattered tools with one professional platform for quotations, orders, shipping, and client portals.",
  keywords:
    "sourcing agent solution, replace whatsapp excel sourcing, sourcing workflow management, sourcing operations platform",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/solution",
    languages: {
      en: "https://soursync.com/solution",
      fr: "https://soursync.com/fr/solution",
      ar: "https://soursync.com/ar/solution",
      "zh-Hans": "https://soursync.com/zh/solution",
      "x-default": "https://soursync.com/solution",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: "SourSync Solution — Replace WhatsApp & Excel for Sourcing",
    description:
      "One professional platform for quotations, orders, shipping, and client portals.",
    type: "website",
    url: "https://soursync.com/solution",
    locale: "en_US",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "SourSync Solution — Replace WhatsApp & Excel for Sourcing",
    description: "One professional platform for quotations, orders, shipping, and client portals.",
  },
};

export default function SolutionPage() {
  return (
    <PageShell>
      <SolutionPageContent />
    </PageShell>
  );
}
