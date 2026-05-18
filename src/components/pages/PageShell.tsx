"use client";
import { HeroHeader } from "@/components/ui/hero-header";
import { Footer } from "@/components/ui/footer";
import { ChatSupportWidget } from "@/components/ui/chat-support-widget";
import { ScrollRestore } from "@/components/ui/scroll-restore";
import { ForceLanguage } from "@/components/ui/force-language";
import type { Language } from "@/lib/language-context";

interface PageShellProps {
  lang?: Language;
  children: React.ReactNode;
}

export function PageShell({ lang, children }: PageShellProps) {
  return (
    <main className="relative bg-background min-h-screen">
      {lang && <ForceLanguage lang={lang} />}
      <ScrollRestore />
      <HeroHeader />
      <div className="relative z-10 pt-24">
        {children}
      </div>
      <Footer />
      <ChatSupportWidget />
    </main>
  );
}
