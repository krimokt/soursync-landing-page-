import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Inter, Tajawal, Noto_Sans_SC, Bricolage_Grotesque, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-tajawal',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'SourSync | Sourcing Agent Software — Quotations & Orders',
  description: 'Replace WhatsApp and Excel with one platform. Manage quotations, orders, shipping, payments, and client portals for sourcing agents and import/export businesses.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  metadataBase: new URL('https://soursync.com'),
  alternates: {
    canonical: 'https://soursync.com',
    languages: {
      'en': 'https://soursync.com',
      'fr': 'https://soursync.com/fr',
      'ar': 'https://soursync.com/ar',
      'zh-Hans': 'https://soursync.com/zh',
      'x-default': 'https://soursync.com',
    },
  },
  verification: {
    google: '7_bZOWyQUW8GTWsqUleYgooQyII5ivMZhh70tjhTlWo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'SourSync | Sourcing Agent Software',
    description: 'Replace WhatsApp and Excel with one professional platform for sourcing agents.',
    type: 'website',
    url: 'https://soursync.com',
    locale: 'en_US',
    siteName: 'SourSync',
    images: [{
      url: 'https://soursync.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'SourSync — Sourcing Agent Software',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SourSync | Sourcing Agent Software',
    description: 'Replace WhatsApp and Excel with one professional sourcing management system.',
    images: ['https://soursync.com/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${tajawal.variable} ${notoSansSC.variable} ${bricolageGrotesque.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LQLLTGVXJH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LQLLTGVXJH');
          `}
        </Script>

        {/* Umami Analytics */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="cc30e2ad-7356-4f2e-934b-59a602dc9749"
          strategy="afterInteractive"
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
