import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { FeaturesPageContent } from "@/components/pages/FeaturesPageContent";

export const metadata: Metadata = {
  title: "مميزات SourSync — بوابة العملاء والعروض والشحن والمدفوعات",
  description:
    "استكشف مميزات SourSync: بوابة العملاء لوكلاء التوريد، إدارة عروض الأسعار، تتبع الطلبات، تحديثات الشحن وتتبع المدفوعات.",
  keywords:
    "مميزات وكيل توريد, بوابة عملاء توريد, برنامج إدارة عروض أسعار, تتبع شحن توريد",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/ar/features",
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
    title: "مميزات SourSync — بوابة العملاء والعروض",
    description:
      "بوابة العملاء والعروض والشحن والمدفوعات — كل شيء في منصة توريد واحدة.",
    type: "website",
    url: "https://soursync.com/ar/features",
    locale: "ar_SA",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "مميزات SourSync — بوابة العملاء والعروض",
    description: "بوابة العملاء والعروض والشحن والمدفوعات — كل شيء في منصة توريد واحدة.",
  },
};

export default function ArFeaturesPage() {
  return (
    <PageShell lang="ar">
      <FeaturesPageContent />
    </PageShell>
  );
}
