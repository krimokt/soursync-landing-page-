import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { PricingPageContent } from "@/components/pages/PricingPageContent";

export const metadata: Metadata = {
  title: "Tarifs SourSync — Plans Pro et Agence à partir de 59$/mois",
  description:
    "SourSync Pro à 59$/mois avec essai gratuit de 14 jours. Offre fondateur à 25$/mois pendant 3 mois.",
  keywords:
    "tarifs logiciel sourcing, coût logiciel agent sourcing, prix plateforme gestion sourcing",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/fr/pricing",
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
    title: "Tarifs SourSync — Plans Pro & Agence",
    description:
      "Tarification simple et transparente à partir de 59$/mois. Essai gratuit 14 jours, sans carte bancaire.",
    type: "website",
    url: "https://soursync.com/fr/pricing",
    locale: "fr_FR",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs SourSync — Plans Pro & Agence",
    description: "Tarification simple et transparente à partir de 59$/mois. Essai gratuit 14 jours, sans carte bancaire.",
  },
};

export default function FrPricingPage() {
  return (
    <PageShell lang="fr">
      <PricingPageContent />
    </PageShell>
  );
}
