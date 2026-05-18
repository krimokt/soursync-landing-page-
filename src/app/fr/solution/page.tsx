import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { SolutionPageContent } from "@/components/pages/SolutionPageContent";

export const metadata: Metadata = {
  title: "Solution SourSync — Comment les Agents de Sourcing Remplacent WhatsApp + Excel",
  description:
    "Découvrez comment SourSync aide les agents de sourcing à remplacer les outils dispersés par une plateforme professionnelle.",
  keywords:
    "solution agent sourcing, remplacer whatsapp excel sourcing, gestion workflow sourcing, plateforme opérations sourcing",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/fr/solution",
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
    title: "Solution SourSync — Remplacer WhatsApp & Excel",
    description:
      "Une plateforme professionnelle pour les devis, commandes, expéditions et portails clients.",
    type: "website",
    url: "https://soursync.com/fr/solution",
    locale: "fr_FR",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solution SourSync — Remplacer WhatsApp & Excel",
    description: "Une plateforme professionnelle pour les devis, commandes, expéditions et portails clients.",
  },
};

export default function FrSolutionPage() {
  return (
    <PageShell lang="fr">
      <SolutionPageContent />
    </PageShell>
  );
}
