import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { ContactPageContent } from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "Contactez SourSync — Parlez à Notre Équipe",
  description:
    "Contactez SourSync pour toute question sur notre logiciel pour agents de sourcing. Nous répondons dans les 24 heures. Email : contact@soursync.com",
  keywords:
    "contacter SourSync, support logiciel sourcing, contact logiciel agent sourcing",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/fr/contact",
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
    title: "Contactez SourSync — Parlez à Notre Équipe",
    description: "Des questions sur SourSync ? Nous répondons dans les 24 heures.",
    type: "website",
    url: "https://soursync.com/fr/contact",
    locale: "fr_FR",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contactez SourSync — Parlez à Notre Équipe",
    description: "Des questions sur SourSync ? Nous répondons dans les 24 heures.",
  },
};

export default function FrContactPage() {
  return (
    <PageShell lang="fr">
      <ContactPageContent
        label="Contact"
        headline="Parlons."
        subtitle="Vous avez une question, une demande de fonctionnalité, ou vous voulez savoir si SourSync vous convient ? Nous répondons dans les 24 heures."
        namePlaceholder="Votre nom"
        emailPlaceholder="votre@email.com"
        subjectLabel="Sujet (optionnel)"
        subjectPlaceholder="De quoi s'agit-il ?"
        messagePlaceholder="Votre message..."
        submitLabel="Envoyer le message"
        successMessage="Message envoyé. Nous vous contacterons dans les 24 heures."
        subjectOptions={[
          "Question générale",
          "Demande de démonstration",
          "Support",
          "Partenariat",
        ]}
      />
    </PageShell>
  );
}
