import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { ContactPageContent } from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "联系SourSync — 与我们的团队交流",
  description:
    "联系SourSync了解我们的采购代理软件。我们在24小时内回复。邮箱：contact@soursync.com",
  keywords:
    "联系SourSync, 采购软件支持, 采购代理软件联系方式",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/zh/contact",
    languages: {
      en: "https://soursync.com/contact",
      fr: "https://soursync.com/fr/contact",
      ar: "https://soursync.com/ar/contact",
      "zh-Hans": "https://soursync.com/zh/contact",
      "x-default": "https://soursync.com/contact",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: "联系SourSync — 与我们的团队交流",
    description: "关于SourSync的问题？我们在24小时内回复。",
    type: "website",
    url: "https://soursync.com/zh/contact",
    locale: "zh_CN",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "联系SourSync — 与我们的团队交流",
    description: "关于SourSync的问题？我们在24小时内回复。",
  },
};

export default function ZhContactPage() {
  return (
    <PageShell lang="zh">
      <ContactPageContent
        label="联系我们"
        headline="我们来聊聊。"
        subtitle="有问题、功能需求，或只是想知道SourSync是否适合您？我们在24小时内回复。"
        namePlaceholder="您的姓名"
        emailPlaceholder="您的邮箱@example.com"
        subjectLabel="主题（可选）"
        subjectPlaceholder="这是关于什么的？"
        messagePlaceholder="您的留言..."
        submitLabel="发送消息"
        successMessage="消息已发送。我们将在24小时内与您联系。"
        subjectOptions={[
          "一般问题",
          "演示请求",
          "技术支持",
          "合作伙伴",
        ]}
      />
    </PageShell>
  );
}
