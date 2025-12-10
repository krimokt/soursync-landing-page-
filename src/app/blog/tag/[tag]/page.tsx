import { HeroHeader } from '@/components/ui/hero-header'
import { Footer } from '@/components/ui/footer'
import { ChatSupportWidget } from '@/components/ui/chat-support-widget'
import { BlogList } from '@/components/ui/blog-list'
import { getPostsByTag, getAllTags } from '@/lib/posts'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ tag: string }>
}

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  
  return {
    title: `Posts tagged "${decodedTag}" - SourSync Blog`,
    description: `Browse all blog posts about ${decodedTag}. Insights, tips, and guides for sourcing agents.`,
    openGraph: {
      title: `Posts tagged "${decodedTag}" - SourSync Blog`,
      description: `Browse all blog posts about ${decodedTag}`,
      type: 'website',
    },
  }
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <main className="relative bg-background min-h-screen">
      <HeroHeader />
      
      <div className="relative z-10 pt-24">
        <div className="container mx-auto px-4 max-w-7xl mb-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(6,182,212)]/10 border border-[rgb(6,182,212)]/20 mb-4">
              <span className="text-sm font-medium text-[rgb(6,182,212)]">
                Tag: {decodedTag}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Posts tagged "{decodedTag}"
            </h1>
            <p className="text-muted-foreground">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
            </p>
          </div>
        </div>
        
        <BlogList posts={posts} />
      </div>
      
      <Footer />
      <ChatSupportWidget />
    </main>
  )
}

