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
  title: 'SourSync | برنامج وكيل التوريد — عروض أسعار وطلبات ولوجستيات',
  description: 'استبدل واتساب وإكسل بمنصة احترافية واحدة. أدر عروض أسعارك وطلباتك وشحناتك ومدفوعاتك مع بوابة عملاء متكاملة لوكلاء التوريد.',
  keywords: 'برنامج وكيل التوريد, منصة إدارة التوريد, برنامج الاستيراد والتصدير, إدارة عروض الأسعار, بوابة عملاء التوريد, تتبع الشحنات, وكيل توريد الصين',
  metadataBase: new URL('https://soursync.com'),
  alternates: {
    canonical: 'https://soursync.com/ar',
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
    title: 'SourSync | برنامج وكيل التوريد',
    description: 'استبدل واتساب وإكسل بمنصة احترافية واحدة لوكلاء التوريد.',
    type: 'website',
    url: 'https://soursync.com/ar',
    locale: 'ar_SA',
    siteName: 'SourSync',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SourSync | برنامج وكيل التوريد',
    description: 'استبدل واتساب وإكسل بمنصة احترافية واحدة لإدارة التوريد.',
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

export default function ArPage() {
  return (
    <main className="relative bg-background min-h-screen">
      <SchemaMarkup />
      <ForceLanguage lang="ar" />
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
