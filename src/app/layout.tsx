import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
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
  verification: {
    google: '5WX0RsC0ggsgDZK4zndZfeRGMMTKlixAa-h-s9Gkl7Q',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${tajawal.variable} ${notoSansSC.variable}`}>
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
        
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
