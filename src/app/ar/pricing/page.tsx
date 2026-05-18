import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { PricingPageContent } from "@/components/pages/PricingPageContent";

export const metadata: Metadata = {
  title: "أسعار SourSync — خطط برو والوكالة تبدأ من 59 دولار شهرياً",
  description:
    "SourSync Pro بـ 59 دولار شهرياً مع تجربة مجانية 14 يوماً.",
  keywords:
    "أسعار برنامج توريد, تكلفة برنامج وكيل توريد, سعر منصة إدارة التوريد",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/ar/pricing",
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
    title: "أسعار SourSync — خطط برو والوكالة",
    description:
      "تسعير بسيط وشفاف يبدأ من 59 دولار شهرياً. تجربة مجانية 14 يوماً بدون بطاقة ائتمان.",
    type: "website",
    url: "https://soursync.com/ar/pricing",
    locale: "ar_SA",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "أسعار SourSync — خطط برو والوكالة",
    description: "تسعير بسيط وشفاف يبدأ من 59 دولار شهرياً. تجربة مجانية 14 يوماً بدون بطاقة ائتمان.",
  },
};

export default function ArPricingPage() {
  return (
    <PageShell lang="ar">
      <PricingPageContent />
    </PageShell>
  );
}
