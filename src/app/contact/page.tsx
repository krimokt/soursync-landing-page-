import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { ContactPageContent } from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact SourSync — Talk to Our Team",
  description:
    "Contact SourSync with questions about our sourcing agent software. We reply within 24 hours. Email: contact@soursync.com",
  keywords:
    "contact SourSync, sourcing software support, sourcing agent software contact",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/contact",
    languages: {
      en: "https://soursync.com/contact",
      fr: "https://soursync.com/fr/contact",
      ar: "https://soursync.com/ar/contact",
      "zh-Hans": "https://soursync.com/zh/contact",
      "x-default": "https://soursync.com/contact",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: "Contact SourSync — Talk to Our Team",
    description:
      "Questions about SourSync? We reply within 24 hours.",
    type: "website",
    url: "https://soursync.com/contact",
    locale: "en_US",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SourSync — Talk to Our Team",
    description: "Questions about SourSync? We reply within 24 hours.",
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactPageContent />
    </PageShell>
  );
}
