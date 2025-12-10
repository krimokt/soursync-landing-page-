import { HeroHeader } from "@/components/ui/hero-header";
import { Footer } from "@/components/ui/footer";
import About from "@/components/ui/about";
import { ChatSupportWidget } from "@/components/ui/chat-support-widget";

export default function AboutPage() {
  return (
    <main className="relative bg-background min-h-screen">
      <HeroHeader />
      
      <div className="relative z-10 pt-24">
        <div className="container mx-auto px-4 py-16">
          <About />
        </div>
      </div>
      
      <Footer />
      <ChatSupportWidget />
    </main>
  );
}

