import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { SolutionPageContent } from "@/components/pages/SolutionPageContent";

export const metadata: Metadata = {
  title: "حل SourSync — كيف يستبدل وكلاء التوريد واتساب وإكسل",
  description:
    "اكتشف كيف يساعد SourSync وكلاء التوريد على استبدال الأدوات المتشتتة بمنصة واحدة احترافية.",
  keywords:
    "حل وكيل توريد, استبدال واتساب إكسل توريد, إدارة سير عمل التوريد, منصة عمليات التوريد",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/ar/solution",
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
    title: "حل SourSync — استبدال واتساب وإكسل",
    description:
      "منصة واحدة احترافية للعروض والطلبات والشحن وبوابات العملاء.",
    type: "website",
    url: "https://soursync.com/ar/solution",
    locale: "ar_SA",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "حل SourSync — استبدال واتساب وإكسل",
    description: "منصة واحدة احترافية للعروض والطلبات والشحن وبوابات العملاء.",
  },
};

export default function ArSolutionPage() {
  return (
    <PageShell lang="ar">
      <SolutionPageContent />
    </PageShell>
  );
}
