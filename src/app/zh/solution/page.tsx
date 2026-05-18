import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { SolutionPageContent } from "@/components/pages/SolutionPageContent";

export const metadata: Metadata = {
  title: "SourSync解决方案 — 采购代理如何替代WhatsApp和Excel",
  description:
    "了解SourSync如何帮助采购代理用一个专业平台替代分散的工具。",
  keywords:
    "采购代理解决方案, 替代whatsapp excel采购, 采购工作流管理, 采购运营平台",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/zh/solution",
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
    title: "SourSync解决方案 — 替代WhatsApp和Excel",
    description:
      "一个专业平台用于报价、订单、运输和客户门户。",
    type: "website",
    url: "https://soursync.com/zh/solution",
    locale: "zh_CN",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "SourSync解决方案 — 替代WhatsApp和Excel",
    description: "一个专业平台用于报价、订单、运输和客户门户。",
  },
};

export default function ZhSolutionPage() {
  return (
    <PageShell lang="zh">
      <SolutionPageContent />
    </PageShell>
  );
}
