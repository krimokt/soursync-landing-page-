import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/AboutPageContent";
import { PageShell } from "@/components/pages/PageShell";

export const metadata: Metadata = {
  title: "À Propos de SourSync — Construit pour les Agents de Sourcing",
  description:
    "SourSync est conçu pour les agents de sourcing, les entreprises d'import/export et les sociétés de négoce qui veulent remplacer les outils dispersés par une plateforme professionnelle.",
  keywords:
    "à propos SourSync, logiciel agent sourcing, plateforme import export",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/fr/about",
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
    title: "À Propos de SourSync — Pour les Agents de Sourcing",
    description:
      "Construit pour les agents de sourcing, les entreprises d'import/export et les sociétés de négoce.",
    type: "website",
    url: "https://soursync.com/fr/about",
    locale: "fr_FR",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "À Propos de SourSync — Pour les Agents de Sourcing",
    description: "Construit pour les agents de sourcing, les entreprises d'import/export et les sociétés de négoce.",
  },
};

export default function FrAboutPage() {
  return (
    <PageShell lang="fr">
      <AboutPageContent
        headline="Construit pour ceux qui gèrent le sourcing seuls."
        mission="SourSync existe parce que trop d'agents de sourcing gèrent des opérations professionnelles depuis des groupes WhatsApp et des fichiers Excel. Nous construisons le système qu'ils méritent."
        values={[
          {
            num: "01",
            title: "L'opérateur d'abord.",
            detail:
              "Conçu pour la personne qui fait le travail, pas pour l'entreprise qui achète un logiciel. Chaque décision que nous prenons commence par la question : est-ce que cela facilite la journée de l'agent ?",
          },
          {
            num: "02",
            title: "La clarté avant les fonctionnalités.",
            detail:
              "Nous supprimons des étapes, nous n'en ajoutons pas. Le meilleur outil est celui que vous utilisez réellement. Nous sommes obsédés par la réduction de la complexité.",
          },
          {
            num: "03",
            title: "La confiance par la transparence.",
            detail:
              "Les clients qui peuvent tout voir posent moins de questions. Quand vos clients ont un portail clair, votre relation s'améliore et votre temps est libéré.",
          },
        ]}
        ctaLabel="Nous sommes en phase de lancement. Rejoignez-nous."
      />
    </PageShell>
  );
}
