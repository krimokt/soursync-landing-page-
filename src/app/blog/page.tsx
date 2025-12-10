import { HeroHeader } from "@/components/ui/hero-header";
import { Footer } from "@/components/ui/footer";
import { ChatSupportWidget } from "@/components/ui/chat-support-widget";
import { BlogList } from "@/components/ui/blog-list";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: 'Blog - SourSync',
  description: 'Insights, tips, and guides for sourcing agents. Learn about quotation management, client portals, order tracking, and more.',
  openGraph: {
    title: 'Blog - SourSync',
    description: 'Insights, tips, and guides for sourcing agents',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="relative bg-background min-h-screen">
      <HeroHeader />
      
      <div className="relative z-10 pt-24">
        <BlogList posts={posts} />
      </div>
      
      <Footer />
      <ChatSupportWidget />
    </main>
  );
}

