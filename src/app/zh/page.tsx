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
  title: 'SourSync | 采购代理软件 — 报价、订单与物流管理',
  description: '用一个专业平台替代WhatsApp和Excel。为采购代理管理报价、订单、运输跟踪、付款和客户门户。',
  keywords: '采购代理软件, 采购管理平台, 进出口管理软件, 报价管理软件, 客户门户采购, 运输追踪系统, 中国采购软件',
  metadataBase: new URL('https://soursync.com'),
  alternates: {
    canonical: 'https://soursync.com/zh',
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
    title: 'SourSync | 采购代理管理软件',
    description: '用一个专业平台替代WhatsApp和Excel。管理报价、订单、运输和付款。',
    type: 'website',
    url: 'https://soursync.com/zh',
    locale: 'zh_CN',
    siteName: 'SourSync',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SourSync | 采购代理管理软件',
    description: '用一个专业平台替代WhatsApp和Excel管理整个采购业务。',
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

export default function ZhPage() {
  return (
    <main className="relative bg-background min-h-screen">
      <SchemaMarkup />
      <ForceLanguage lang="zh" />
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
