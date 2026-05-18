import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/AboutPageContent";
import { PageShell } from "@/components/pages/PageShell";

export const metadata: Metadata = {
  title: "About SourSync — Built for Sourcing Agents and Import/Export Professionals",
  description:
    "SourSync is built for sourcing agents, import/export businesses, and trading companies who want to replace scattered tools with one professional platform.",
  keywords:
    "about SourSync, sourcing agent software company, import export platform",
  metadataBase: new URL("https://soursync.com"),
  alternates: {
    canonical: "https://soursync.com/about",
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
    title: "About SourSync — Built for Sourcing Agents",
    description:
      "Built for sourcing agents, import/export businesses, and trading companies.",
    type: "website",
    url: "https://soursync.com/about",
    locale: "en_US",
    siteName: "SourSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "About SourSync — Built for Sourcing Agents",
    description: "Built for sourcing agents, import/export businesses, and trading companies.",
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutPageContent
        headline="Built for the people running sourcing operations alone."
        mission="SourSync exists because too many sourcing agents are running professional operations from WhatsApp groups and Excel files. We're building the system they deserve."
        values={[
          {
            num: "01",
            title: "Operator-first.",
            detail:
              "Built for the person doing the work, not the enterprise buying software. Every decision we make starts with the question: does this make the agent's day easier?",
          },
          {
            num: "02",
            title: "Clarity over features.",
            detail:
              "We remove steps, not add them. The best tool is the one you actually use. We're obsessed with reducing complexity, not stacking features for a marketing page.",
          },
          {
            num: "03",
            title: "Trust through transparency.",
            detail:
              "Clients who can see everything ask fewer questions. When your clients have a clear portal, your relationship improves and your time is freed.",
          },
        ]}
        ctaLabel="We're early. Join us."
      />
    </PageShell>
  );
}
