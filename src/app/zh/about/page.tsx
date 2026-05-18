import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/AboutPageContent";
import { PageShell } from "@/components/pages/PageShell";

export const metadata: Metadata = {
  title: "关于SourSync — 为采购代理和进出口专业人士而建",
  description:
    "SourSync专为采购代理、进出口业务和贸易公司而建，帮助他们用一个专业平台替代分散的工具。",
  keywords:
    "关于SourSync, 采购代理软件公司, 进出口平台",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/zh/about",
    languages: {
      en: "https://soursync.com/about",
      fr: "https://soursync.com/fr/about",
      ar: "https://soursync.com/ar/about",
      "zh-Hans": "https://soursync.com/zh/about",
      "x-default": "https://soursync.com/about",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: "关于SourSync — 为采购代理和进出口专业人士",
    description:
      "专为采购代理、进出口业务和贸易公司而建。",
    type: "website",
    url: "https://soursync.com/zh/about",
    locale: "zh_CN",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "关于SourSync — 为采购代理和进出口专业人士",
    description: "专为采购代理、进出口业务和贸易公司而建。",
  },
};

export default function ZhAboutPage() {
  return (
    <PageShell lang="zh">
      <AboutPageContent
        headline="为独自管理采购业务的人而建。"
        mission="SourSync的存在是因为太多采购代理人使用WhatsApp群组和Excel文件运营专业业务。我们正在构建他们应得的系统。"
        values={[
          {
            num: "01",
            title: "运营者优先。",
            detail:
              "为做实际工作的人而建，而非为购买软件的企业。我们做的每一个决定都从这个问题开始：这能让代理的工作更轻松吗？",
          },
          {
            num: "02",
            title: "清晰胜于功能。",
            detail:
              "我们减少步骤，而不是增加它们。最好的工具是你真正使用的工具。我们痴迷于降低复杂性，而非堆砌功能。",
          },
          {
            num: "03",
            title: "通过透明建立信任。",
            detail:
              "能看到一切的客户问的问题更少。当您的客户拥有清晰的门户时，您的关系得到改善，您的时间也得到解放。",
          },
        ]}
        ctaLabel="我们还在早期阶段。加入我们。"
      />
    </PageShell>
  );
}
