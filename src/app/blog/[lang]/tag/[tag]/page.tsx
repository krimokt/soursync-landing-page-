import { HeroHeader } from '@/components/ui/hero-header'
import { Footer } from '@/components/ui/footer'
import { ChatSupportWidget } from '@/components/ui/chat-support-widget'
import { BlogList } from '@/components/ui/blog-list'
import { getPostsByTag, getAllTags } from '@/lib/posts'
import { notFound, permanentRedirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ lang: string; tag: string }>
  searchParams: Promise<{ page?: string }>
}

// Generate static params for all tags
export async function generateStaticParams() {
  const languages = ['en', 'fr', 'ar', 'zh']
  const params: Array<{ lang: string; tag: string }> = []

  for (const lang of languages) {
    const tags = await getAllTags(lang)
    params.push(...tags.map((tag) => ({ lang, tag: encodeURIComponent(tag) })))
  }

  return params
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { lang, tag } = await params
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

export default async function TagPage({ params, searchParams }: PageProps) {
  const { lang, tag } = await params
  const { page } = await searchParams
  const decodedTag = decodeURIComponent(tag)
  const currentPage = parseInt(page || '1', 10)

  // Validate language
  const validLanguages = ['en', 'fr', 'ar', 'zh']
  if (!validLanguages.includes(lang)) {
    permanentRedirect('/blog/en')
  }

  const posts = await getPostsByTag(decodedTag, lang)

  if (posts.length === 0) {
    notFound()
  }

  // Pagination: 10 posts per page
  const postsPerPage = 10
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = posts.slice(startIndex, endIndex)

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
              Posts tagged &quot;{decodedTag}&quot;
            </h1>
            <p className="text-muted-foreground">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
            </p>
          </div>
        </div>

        <BlogList posts={paginatedPosts} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="container mx-auto px-4 max-w-7xl mt-12 mb-8">
            <nav
              className="flex items-center justify-center gap-4"
              aria-label="Pagination"
            >
              {currentPage > 1 && (
                <a
                  href={`/blog/${lang}/tag/${tag}?page=${currentPage - 1}`}
                  className="px-4 py-2 rounded-md border border-border hover:border-[rgb(6,182,212)] transition-colors"
                >
                  Previous
                </a>
              )}

              <span className="text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages && (
                <a
                  href={`/blog/${lang}/tag/${tag}?page=${currentPage + 1}`}
                  className="px-4 py-2 rounded-md border border-border hover:border-[rgb(6,182,212)] transition-colors"
                >
                  Next
                </a>
              )}
            </nav>

            {/* Pagination links for SEO */}
            <div className="hidden">
              {currentPage > 1 && (
                <link
                  rel="prev"
                  href={`https://soursync.com/blog/${lang}/tag/${tag}?page=${currentPage - 1}`}
                />
              )}
              {currentPage < totalPages && (
                <link
                  rel="next"
                  href={`https://soursync.com/blog/${lang}/tag/${tag}?page=${currentPage + 1}`}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <ChatSupportWidget />
    </main>
  )
}

