import dynamic from "next/dynamic";
import { Hero2 } from "@/components/ui/hero-2-1";
import { HeroHeader } from "@/components/ui/hero-header";
import { ScrollRestore } from "@/components/ui/scroll-restore";
import { Footer } from "@/components/ui/footer";
import { ChatSupportWidget } from "@/components/ui/chat-support-widget";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { CTASection } from "@/components/ui/cta-section";

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
      {/* Soft background - no gradients */}
      
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
