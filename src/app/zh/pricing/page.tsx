import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { PricingPageContent } from "@/components/pages/PricingPageContent";

export const metadata: Metadata = {
  title: "SourSync定价 — Pro和Agency计划从每月59美元起",
  description:
    "SourSync Pro每月59美元，含14天免费试用。创始优惠：前3个月每月25美元。",
  keywords:
    "采购软件定价, 采购代理软件费用, 采购管理平台价格",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/zh/pricing",
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
    title: "SourSync定价 — Pro和Agency计划",
    description:
      "简单透明的定价，从每月59美元起。14天免费试用，无需信用卡。",
    type: "website",
    url: "https://soursync.com/zh/pricing",
    locale: "zh_CN",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "SourSync定价 — Pro和Agency计划",
    description: "简单透明的定价，从每月59美元起。14天免费试用，无需信用卡。",
  },
};

export default function ZhPricingPage() {
  return (
    <PageShell lang="zh">
      <PricingPageContent />
    </PageShell>
  );
}
