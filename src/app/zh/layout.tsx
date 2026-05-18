import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'SourSync | 采购代理管理软件',
  description: '用一个专业平台替代WhatsApp和Excel。管理您的报价、订单、运输和付款，并为客户提供专属门户。',
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
    locale: 'zh_CN',
    type: 'website',
    url: 'https://soursync.com/zh',
    siteName: 'SourSync',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SourSync | 采购代理管理软件',
    description: '用一个专业平台替代WhatsApp和Excel管理整个采购业务。',
  },
};

export default function ZhLayout({ children }: { children: React.ReactNode; params?: Promise<unknown> }) {
  return <>{children}</>;
}
