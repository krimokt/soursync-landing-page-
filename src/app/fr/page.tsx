import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Hero2 } from "@/components/ui/hero-2-1";
import { HeroHeader } from "@/components/ui/hero-header";
import { ScrollRestore } from "@/components/ui/scroll-restore";
import { Footer } from "@/components/ui/footer";
import { ChatSupportWidget } from "@/components/ui/chat-support-widget";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { CTASection } from "@/components/ui/cta-section";
import { ForceLanguage } from "@/components/ui/force-language";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";

export const metadata: Metadata = {
  title: 'SourSync | Logiciel Agent Sourcing — Devis, Commandes & Logistique',
  description: 'Remplacez WhatsApp et Excel par une plateforme professionnelle. Gérez devis, commandes, suivi livraison, paiements et portails clients pour agents de sourcing.',
  keywords: 'logiciel agent sourcing, plateforme gestion sourcing, logiciel import export, gestion devis sourcing, portail client sourcing, suivi livraison fournisseurs, agent sourcing Chine',
  metadataBase: new URL('https://soursync.com'),
  alternates: {
    canonical: 'https://soursync.com/fr',
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
    title: 'SourSync | Logiciel Agent Sourcing',
    description: 'Remplacez WhatsApp et Excel par une plateforme professionnelle pour agents de sourcing.',
    type: 'website',
    url: 'https://soursync.com/fr',
    locale: 'fr_FR',
    siteName: 'SourSync',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SourSync | Logiciel Agent Sourcing',
    description: 'Remplacez WhatsApp et Excel par une plateforme professionnelle de gestion du sourcing.',
  },
};

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

export default function FrPage() {
  return (
    <main className="relative bg-background min-h-screen">
      <SchemaMarkup />
      <ForceLanguage lang="fr" />
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
