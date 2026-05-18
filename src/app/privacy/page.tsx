import type { Metadata } from "next";
import Link from "next/link";
import { HeroHeader } from "@/components/ui/hero-header";
import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | SourSync",
  description:
    "Learn how SourSync collects, uses, and protects your personal data. We are committed to transparency and your privacy rights.",
  metadataBase: new URL("https://soursync.com"),
  alternates: { canonical: "https://soursync.com/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy | SourSync",
    description:
      "Understand how SourSync handles your data and protects your privacy.",
    url: "https://soursync.com/privacy",
    siteName: "SourSync",
    type: "website",
  },
};

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Information you provide directly",
        text: "When you register for SourSync, join our waitlist, or contact us, we collect information such as your name, email address, company name, job title, and any other details you choose to share.",
      },
      {
        subtitle: "Information collected automatically",
        text: "When you use our platform, we automatically collect usage data including IP address, browser type, operating system, pages visited, time spent, and referring URLs. We use cookies and similar tracking technologies to improve your experience.",
      },
      {
        subtitle: "Information from third parties",
        text: "We may receive information about you from third-party services you connect to SourSync, such as your email provider or business tools, strictly to deliver the service you requested.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: "To provide and improve our service",
        text: "We use your information to operate SourSync, process your requests, send you product updates, and continuously improve our platform features.",
      },
      {
        subtitle: "To communicate with you",
        text: "We may send you service-related emails (account confirmations, security alerts), product announcements, and marketing communications. You can unsubscribe from marketing emails at any time.",
      },
      {
        subtitle: "To ensure security and prevent fraud",
        text: "We analyse usage patterns to detect suspicious activity, protect our users, and comply with legal obligations.",
      },
    ],
  },
  {
    id: "data-sharing",
    title: "3. How We Share Your Information",
    content: [
      {
        subtitle: "We do not sell your data",
        text: "SourSync does not sell, rent, or trade your personal information to third parties for their marketing purposes.",
      },
      {
        subtitle: "Service providers",
        text: "We work with trusted third-party vendors (hosting, analytics, email delivery, payment processing) who process data on our behalf under strict confidentiality agreements.",
      },
      {
        subtitle: "Legal requirements",
        text: "We may disclose your information when required by law, court order, or to protect the rights and safety of SourSync and its users.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "4. Data Retention",
    content: [
      {
        subtitle: "Retention period",
        text: "We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting us.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "5. Your Rights",
    content: [
      {
        subtitle: "Access, correction, and deletion",
        text: "Depending on your jurisdiction, you have the right to access, correct, or delete the personal data we hold about you. You may also have the right to data portability and to restrict or object to certain processing activities.",
      },
      {
        subtitle: "How to exercise your rights",
        text: "To exercise any of these rights, please contact us at privacy@soursync.com. We will respond within 30 days.",
      },
    ],
  },
  {
    id: "cookies",
    title: "6. Cookies & Tracking",
    content: [
      {
        subtitle: "Types of cookies we use",
        text: "We use essential cookies (required for the platform to function), analytics cookies (to understand usage), and preference cookies (to remember your settings). You can control cookie preferences through your browser settings.",
      },
    ],
  },
  {
    id: "security",
    title: "7. Data Security",
    content: [
      {
        subtitle: "How we protect your data",
        text: "We implement industry-standard security measures including encryption in transit (TLS), encryption at rest, access controls, and regular security audits. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    id: "international-transfers",
    title: "8. International Data Transfers",
    content: [
      {
        subtitle: "Cross-border transfers",
        text: "SourSync operates globally. Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for all international transfers in accordance with applicable data protection laws.",
      },
    ],
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    content: [
      {
        subtitle: "Policy updates",
        text: "We may update this Privacy Policy from time to time. We will notify you of material changes by email or by posting a prominent notice on our website. Your continued use of SourSync after changes become effective constitutes your acceptance of the updated policy.",
      },
    ],
  },
  {
    id: "contact",
    title: "10. Contact Us",
    content: [
      {
        subtitle: "Get in touch",
        text: "If you have questions or concerns about this Privacy Policy or our data practices, please contact us at privacy@soursync.com or through our Contact page.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroHeader />

      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-32 pb-20">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1DBDD8] mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4" style={{ letterSpacing: "-0.03em" }}>
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: <time dateTime="2026-05-18">May 18, 2026</time>
          </p>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
            At SourSync, we take your privacy seriously. This policy explains what data we collect,
            how we use it, and the choices you have. Please read it carefully.
          </p>
        </div>

        {/* Table of contents */}
        <nav className="mb-12 p-6 rounded-2xl border border-border bg-muted/30" aria-label="Table of contents">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Contents
          </p>
          <ol className="space-y-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-muted-foreground hover:text-[#1DBDD8] transition-colors duration-150"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                {section.title}
              </h2>
              <div className="space-y-5">
                {section.content.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-semibold text-foreground mb-1.5">
                      {item.subtitle}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <p className="text-sm text-muted-foreground">
            © 2026 SourSync. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-[#1DBDD8] transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-[#1DBDD8] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
