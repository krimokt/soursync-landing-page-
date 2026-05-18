import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Hero2 } from "@/components/ui/hero-2-1";
import { HeroHeader } from "@/components/ui/hero-header";
import { ScrollRestore } from "@/components/ui/scroll-restore";
import { Footer } from "@/components/ui/footer";
import { ChatSupportWidget } from "@/components/ui/chat-support-widget";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { CTASection } from "@/components/ui/cta-section";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";

export const metadata: Metadata = {
  title: 'SourSync | Sourcing Agent Software — Quotations & Orders',
  description: 'Replace WhatsApp and Excel with one platform. Manage quotations, orders, shipping, payments, and client portals for sourcing agents and import/export businesses.',
  metadataBase: new URL('https://soursync.com'),
  alternates: {
    canonical: 'https://soursync.com',
    languages: {
      'en': 'https://soursync.com',
      'fr': 'https://soursync.com/fr',
      'ar': 'https://soursync.com/ar',
      'zh-Hans': 'https://soursync.com/zh',
      'x-default': 'https://soursync.com',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'SourSync | Sourcing Agent Software',
    description: 'Replace WhatsApp and Excel with one professional platform for sourcing agents.',
    type: 'website',
    url: 'https://soursync.com',
    locale: 'en_US',
    siteName: 'SourSync',
    images: [{
      url: 'https://soursync.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'SourSync — Sourcing Agent Software',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SourSync | Sourcing Agent Software',
    description: 'Replace WhatsApp and Excel with one professional sourcing management system.',
    images: ['https://soursync.com/og-image.png'],
  },
  verification: { google: '7_bZOWyQUW8GTWsqUleYgooQyII5ivMZhh70tjhTlWo' },
};

// Lazy load below-fold sections for better initial load performance
const FeaturesSection = dynamic(
  () => import("@/components/ui/features-section").then((mod) => ({ default: mod.FeaturesSection })),
  { loading: () => <div className="min-h-[600px]" /> }
);

const BeforeAfterSection = dynamic(
  () => import("@/components/ui/before-after-section").then((mod) => ({ default: mod.BeforeAfterSection })),
  { loading: () => <div className="min-h-screen" /> }
);

const PricingSection = dynamic(
  () => import("@/components/ui/pricing-section").then((mod) => ({ default: mod.PricingSectionDefault })),
  { loading: () => <div className="min-h-screen" /> }
);

const FAQSection = dynamic(
  () => import("@/components/ui/faq-section").then((mod) => ({ default: mod.FAQSection })),
  { loading: () => <div className="min-h-screen" /> }
);

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen">
      <SchemaMarkup />
      <ScrollRestore />
      <HeroHeader />
      <div className="relative z-10">
        <Hero2 />
        <LogoCloud />
        <FeaturesSection />
        <BeforeAfterSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </div>
      <Footer />
      <ChatSupportWidget />
    </main>
  );
}
