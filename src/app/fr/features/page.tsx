import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { FeaturesPageContent } from "@/components/pages/FeaturesPageContent";

export const metadata: Metadata = {
  title: "Fonctionnalités SourSync — Portail Client, Devis, Livraison et Paiements",
  description:
    "Découvrez les fonctionnalités SourSync : portail client, gestion des devis, suivi des commandes, mises à jour d'expédition et suivi des paiements.",
  keywords:
    "fonctionnalités agent sourcing, portail client sourcing, logiciel gestion devis, suivi livraison sourcing",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/fr/features",
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
    title: "Fonctionnalités SourSync — Portail Client & Devis",
    description:
      "Portail client, devis, expédition, paiements — tout en une seule plateforme de sourcing.",
    type: "website",
    url: "https://soursync.com/fr/features",
    locale: "fr_FR",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fonctionnalités SourSync — Portail Client & Devis",
    description: "Portail client, devis, expédition, paiements — tout en une seule plateforme de sourcing.",
  },
};

export default function FrFeaturesPage() {
  return (
    <PageShell lang="fr">
      <FeaturesPageContent />
    </PageShell>
  );
}
