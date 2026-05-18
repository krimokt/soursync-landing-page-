import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/AboutPageContent";
import { PageShell } from "@/components/pages/PageShell";

export const metadata: Metadata = {
  title: "عن SourSync — مبني لوكلاء التوريد ومحترفي الاستيراد والتصدير",
  description:
    "SourSync مبني لوكلاء التوريد وشركات الاستيراد والتصدير وشركات التداول الذين يريدون استبدال الأدوات المتشتتة بمنصة واحدة احترافية.",
  keywords:
    "عن SourSync, برنامج وكيل توريد, منصة استيراد تصدير",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/ar/about",
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
    title: "عن SourSync — لوكلاء التوريد والمستوردين",
    description:
      "مبني لوكلاء التوريد وشركات الاستيراد والتصدير وشركات التداول.",
    type: "website",
    url: "https://soursync.com/ar/about",
    locale: "ar_SA",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "عن SourSync — لوكلاء التوريد والمستوردين",
    description: "مبني لوكلاء التوريد وشركات الاستيراد والتصدير وشركات التداول.",
  },
};

export default function ArAboutPage() {
  return (
    <PageShell lang="ar">
      <AboutPageContent
        headline="مبني لمن يدير عمليات التوريد بمفرده."
        mission="SourSync موجود لأن الكثير من وكلاء التوريد يديرون عمليات احترافية من مجموعات واتساب وملفات إكسل. نحن نبني النظام الذي يستحقونه."
        values={[
          {
            num: "01",
            title: "المشغّل أولاً.",
            detail:
              "مبني للشخص الذي يقوم بالعمل، وليس للمؤسسة التي تشتري البرامج. كل قرار نتخذه يبدأ بالسؤال: هل يجعل هذا يوم الوكيل أسهل؟",
          },
          {
            num: "02",
            title: "الوضوح قبل الميزات.",
            detail:
              "نحن نزيل الخطوات، لا نضيفها. أفضل أداة هي تلك التي تستخدمها فعلاً. نحن مهووسون بتقليل التعقيد.",
          },
          {
            num: "03",
            title: "الثقة من خلال الشفافية.",
            detail:
              "العملاء الذين يستطيعون رؤية كل شيء يسألون أسئلة أقل. عندما يمتلك عملاؤك بوابة واضحة، تتحسن علاقتك ويتحرر وقتك.",
          },
        ]}
        ctaLabel="نحن في مرحلة مبكرة. انضم إلينا."
      />
    </PageShell>
  );
}
