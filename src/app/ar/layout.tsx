import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'SourSync | برنامج إدارة وكلاء التوريد',
  description: 'استبدل واتساب وإكسل بمنصة واحدة احترافية. أدر عروض أسعارك وطلباتك وشحناتك ومدفوعاتك مع بوابة عملاء متكاملة.',
  keywords: 'برنامج وكيل التوريد, منصة إدارة التوريد, برنامج الاستيراد والتصدير, إدارة عروض الأسعار, بوابة عملاء التوريد, تتبع الشحنات, وكيل توريد الصين',
  metadataBase: new URL('https://soursync.com'),
  alternates: {
    canonical: 'https://soursync.com/ar',
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
    title: 'SourSync | برنامج إدارة وكلاء التوريد',
    description: 'استبدل واتساب وإكسل بمنصة واحدة احترافية.',
    locale: 'ar_SA',
    type: 'website',
    url: 'https://soursync.com/ar',
    siteName: 'SourSync',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SourSync | برنامج إدارة وكلاء التوريد',
    description: 'استبدل واتساب وإكسل بمنصة واحدة احترافية لإدارة التوريد.',
  },
};

export default function ArLayout({ children }: { children: React.ReactNode; params?: Promise<unknown> }) {
  return <>{children}</>;
}
