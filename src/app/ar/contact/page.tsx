import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { ContactPageContent } from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "تواصل مع SourSync — تحدث مع فريقنا",
  description:
    "تواصل مع SourSync لأي استفسار حول برنامجنا لوكلاء التوريد. نرد خلال 24 ساعة. البريد الإلكتروني: contact@soursync.com",
  keywords:
    "التواصل مع SourSync, دعم برنامج التوريد, اتصال برنامج وكيل التوريد",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/ar/contact",
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
    title: "تواصل مع SourSync — تحدث مع فريقنا",
    description: "أسئلة حول SourSync؟ نرد خلال 24 ساعة.",
    type: "website",
    url: "https://soursync.com/ar/contact",
    locale: "ar_SA",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "تواصل مع SourSync — تحدث مع فريقنا",
    description: "أسئلة حول SourSync؟ نرد خلال 24 ساعة.",
  },
};

export default function ArContactPage() {
  return (
    <PageShell lang="ar">
      <ContactPageContent
        label="تواصل"
        headline="لنتحدث."
        subtitle="هل لديك سؤال أو طلب ميزة أو تريد فقط معرفة ما إذا كان SourSync مناسباً لك؟ نرد خلال 24 ساعة."
        namePlaceholder="اسمك"
        emailPlaceholder="بريدك@الإلكتروني.com"
        subjectLabel="الموضوع (اختياري)"
        subjectPlaceholder="ما الموضوع؟"
        messagePlaceholder="رسالتك..."
        submitLabel="إرسال الرسالة"
        successMessage="تم إرسال الرسالة. سنتواصل معك خلال 24 ساعة."
        subjectOptions={[
          "سؤال عام",
          "طلب عرض توضيحي",
          "دعم فني",
          "شراكة",
        ]}
      />
    </PageShell>
  );
}
