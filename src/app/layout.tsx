import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Inter, Tajawal, Noto_Sans_SC } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const tajawal = Tajawal({ 
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-tajawal',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({ 
  subsets: ['latin'], // Noto Sans SC 'latin' subset or preload: false
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
  preload: false, // Often needed for large CJK fonts if subsetting isn't perfect
});

export const metadata: Metadata = {
  title: 'SourSync | Quotations, Orders & Logistics in One Platform',
  description: 'Stop managing sourcing projects in Excel and WhatsApp. SourSync centralizes quotations, orders, shipping status, and client reporting for modern sourcing teams.',
  verification: {
    google: '7_bZOWyQUW8GTWsqUleYgooQyII5ivMZhh70tjhTlWo',
  },
  openGraph: {
    title: 'SourSync | Quotations, Orders & Logistics in One Platform',
    description: 'Stop managing sourcing projects in Excel and WhatsApp. SourSync centralizes quotations, orders, shipping status, and client reporting for modern sourcing teams.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SourSync | Quotations, Orders & Logistics in One Platform',
    description: 'Stop managing sourcing projects in Excel and WhatsApp. SourSync centralizes quotations, orders, shipping status, and client reporting for modern sourcing teams.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${tajawal.variable} ${notoSansSC.variable}`} suppressHydrationWarning>
      <body className="antialiased">
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
