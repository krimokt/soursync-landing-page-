import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'SourSync | Logiciel de Gestion pour Agents de Sourcing',
  description: 'Remplacez WhatsApp et Excel par une seule plateforme professionnelle. Gérez vos devis, commandes, expéditions et paiements avec un portail client intégré.',
  keywords: 'logiciel agent sourcing, plateforme gestion sourcing, logiciel import export, gestion devis sourcing, portail client sourcing, suivi livraison fournisseurs, agent sourcing Chine',
  metadataBase: new URL('https://soursync.com'),
  alternates: {
    canonical: 'https://soursync.com/fr',
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
    title: 'SourSync | Logiciel de Gestion pour Agents de Sourcing',
    description: 'Remplacez WhatsApp et Excel par une seule plateforme professionnelle. Devis, commandes, expéditions et paiements en un seul tableau de bord.',
    locale: 'fr_FR',
    type: 'website',
    url: 'https://soursync.com/fr',
    siteName: 'SourSync',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SourSync | Logiciel de Gestion pour Agents de Sourcing',
    description: 'Remplacez WhatsApp et Excel par une seule plateforme professionnelle.',
  },
};

export default function FrLayout({ children }: { children: React.ReactNode; params?: Promise<unknown> }) {
  return <>{children}</>;
}
