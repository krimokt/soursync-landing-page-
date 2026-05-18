import type { Metadata } from "next";
import Link from "next/link";
import { HeroHeader } from "@/components/ui/hero-header";
import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Terms of Service | SourSync",
  description:
    "Read SourSync's Terms of Service. Understand the rules, rights, and responsibilities that govern your use of our sourcing operations platform.",
  metadataBase: new URL("https://soursync.com"),
  alternates: { canonical: "https://soursync.com/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms of Service | SourSync",
    description:
      "Review the terms and conditions that govern your use of SourSync's sourcing management platform.",
    url: "https://soursync.com/terms",
    siteName: "SourSync",
    type: "website",
  },
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      {
        subtitle: "Agreement to terms",
        text: 'By accessing or using SourSync ("Service", "Platform", "we", "us"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use our Service.',
      },
      {
        subtitle: "Eligibility",
        text: "You must be at least 18 years old and have the legal capacity to enter into a binding agreement to use SourSync. By using our Service, you represent that you meet these requirements.",
      },
    ],
  },
  {
    id: "description",
    title: "2. Description of Service",
    content: [
      {
        subtitle: "What SourSync provides",
        text: "SourSync is a sourcing operations platform designed for sourcing agents and import/export businesses. It enables users to manage quotations, purchase orders, shipments, payments, and client portals in one unified workspace.",
      },
      {
        subtitle: "Service availability",
        text: "We strive to maintain high availability but do not guarantee uninterrupted access. We may modify, suspend, or discontinue features at any time with reasonable notice to users.",
      },
    ],
  },
  {
    id: "accounts",
    title: "3. Accounts & Registration",
    content: [
      {
        subtitle: "Account responsibility",
        text: "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at security@soursync.com if you suspect unauthorised access.",
      },
      {
        subtitle: "Accurate information",
        text: "You agree to provide accurate, current, and complete information during registration and to update your information as necessary to keep it accurate.",
      },
      {
        subtitle: "One account per user",
        text: "Each user may maintain only one account. Creating multiple accounts to circumvent restrictions or abuse the platform is prohibited.",
      },
    ],
  },
  {
    id: "acceptable-use",
    title: "4. Acceptable Use",
    content: [
      {
        subtitle: "Permitted use",
        text: "You may use SourSync only for lawful business purposes in connection with sourcing, procurement, and supply chain management activities.",
      },
      {
        subtitle: "Prohibited activities",
        text: "You may not: (a) violate any applicable laws or regulations; (b) infringe intellectual property rights; (c) transmit malware or harmful code; (d) attempt to gain unauthorised access to our systems; (e) scrape or harvest data without permission; (f) use the platform to engage in fraud or deceptive practices; (g) resell or sublicense access without written consent.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "5. Intellectual Property",
    content: [
      {
        subtitle: "SourSync's IP",
        text: "All content, software, trademarks, logos, and materials on the SourSync platform are owned by or licensed to SourSync and are protected by applicable intellectual property laws. You may not copy, modify, or distribute them without our explicit written permission.",
      },
      {
        subtitle: "Your content",
        text: "You retain ownership of the data and content you upload to SourSync. By uploading content, you grant SourSync a limited licence to store, process, and display it solely to provide the Service to you.",
      },
    ],
  },
  {
    id: "payment",
    title: "6. Payment & Subscriptions",
    content: [
      {
        subtitle: "Billing",
        text: "Paid plans are billed on a subscription basis (monthly or annual) as described on our Pricing page. All fees are in USD and are non-refundable except where required by law.",
      },
      {
        subtitle: "Cancellation",
        text: "You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. You retain access to paid features until then.",
      },
      {
        subtitle: "Price changes",
        text: "We may change subscription prices with at least 30 days' advance notice. Continued use after a price change constitutes acceptance of the new pricing.",
      },
    ],
  },
  {
    id: "data-privacy",
    title: "7. Data & Privacy",
    content: [
      {
        subtitle: "Data processing",
        text: "Our collection and use of your personal data is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using SourSync, you consent to our data practices as described in the Privacy Policy.",
      },
      {
        subtitle: "Data security",
        text: "We implement reasonable technical and organisational measures to protect your data. However, no system is entirely secure, and we cannot guarantee absolute data security.",
      },
    ],
  },
  {
    id: "disclaimers",
    title: "8. Disclaimers & Limitation of Liability",
    content: [
      {
        subtitle: "As-is service",
        text: 'SourSync is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.',
      },
      {
        subtitle: "Limitation of liability",
        text: "To the maximum extent permitted by law, SourSync shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of the Service.",
      },
    ],
  },
  {
    id: "termination",
    title: "9. Termination",
    content: [
      {
        subtitle: "By you",
        text: "You may stop using SourSync and close your account at any time via account settings or by contacting support.",
      },
      {
        subtitle: "By us",
        text: "We reserve the right to suspend or terminate your account if you violate these Terms, engage in fraudulent activity, or for other legitimate business reasons, with or without notice depending on the severity of the violation.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "10. Governing Law & Disputes",
    content: [
      {
        subtitle: "Applicable law",
        text: "These Terms are governed by applicable law. Any disputes shall first be attempted to be resolved informally by contacting legal@soursync.com. If unresolved, disputes shall be subject to binding arbitration.",
      },
    ],
  },
  {
    id: "changes",
    title: "11. Changes to These Terms",
    content: [
      {
        subtitle: "Updates",
        text: "We may update these Terms from time to time. We will notify you of material changes by email or in-app notification at least 14 days before they take effect. Continued use of SourSync after changes become effective constitutes acceptance.",
      },
    ],
  },
  {
    id: "contact",
    title: "12. Contact",
    content: [
      {
        subtitle: "Questions about these Terms",
        text: "If you have questions about these Terms of Service, please contact us at legal@soursync.com or through our Contact page. We aim to respond within 5 business days.",
      },
    ],
  },
];

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: <time dateTime="2026-05-18">May 18, 2026</time>
          </p>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
            Please read these Terms of Service carefully before using SourSync.
            They govern your access to and use of our platform and services.
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
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-[#1DBDD8] transition-colors">
              Privacy Policy
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
