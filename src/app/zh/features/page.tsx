import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { FeaturesPageContent } from "@/components/pages/FeaturesPageContent";

export const metadata: Metadata = {
  title: "SourSync功能 — 客户门户、报价、运输和付款管理",
  description:
    "探索SourSync的所有功能：采购代理客户门户、报价管理、订单跟踪、运输更新和付款记录。",
  keywords:
    "采购代理功能, 客户门户采购, 报价管理软件, 运输跟踪采购, 付款跟踪采购代理",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/zh/features",
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
    title: "SourSync功能 — 客户门户与报价管理",
    description:
      "客户门户、报价、运输、付款 — 全在一个采购平台中。",
    type: "website",
    url: "https://soursync.com/zh/features",
    locale: "zh_CN",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "SourSync功能 — 客户门户与报价管理",
    description: "客户门户、报价、运输、付款 — 全在一个采购平台中。",
  },
};

export default function ZhFeaturesPage() {
  return (
    <PageShell lang="zh">
      <FeaturesPageContent />
    </PageShell>
  );
}
