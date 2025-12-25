import { HeroHeader } from '@/components/ui/hero-header'
import { Footer } from '@/components/ui/footer'
import { ChatSupportWidget } from '@/components/ui/chat-support-widget'
import { BlogList } from '@/components/ui/blog-list'
import { getAllPosts } from '@/lib/posts'
import { permanentRedirect } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params
  const langNames: Record<string, string> = {
    en: 'English',
    fr: 'French',
    ar: 'Arabic',
    zh: 'Chinese',
  }

  return {
    title: `Blog - SourSync`,
    description: `Insights, tips, and guides for sourcing agents. Learn about quotation management, client portals, order tracking, and more.`,
    openGraph: {
      title: `Blog - SourSync`,
      description: `Insights, tips, and guides for sourcing agents`,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'fr' },
    { lang: 'ar' },
    { lang: 'zh' },
  ]
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { lang } = await params
  const { page } = await searchParams
  const currentPage = parseInt(page || '1', 10)

  // Validate language
  const validLanguages = ['en', 'fr', 'ar', 'zh']
  if (!validLanguages.includes(lang)) {
    permanentRedirect('/blog/en')
  }

  const posts = await getAllPosts(lang, 'published')

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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Insights, tips, and guides for sourcing agents
          </p>
        </div>

        <BlogList posts={paginatedPosts} language={lang} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="container mx-auto px-4 max-w-7xl mt-12 mb-8">
            <nav
              className="flex items-center justify-center gap-4"
              aria-label="Pagination"
            >
              {currentPage > 1 && (
                <Link
                  href={`/blog/${lang}?page=${currentPage - 1}`}
                  className="px-4 py-2 rounded-md border border-border hover:border-[rgb(6,182,212)] transition-colors"
                >
                  Previous
                </Link>
              )}

              <span className="text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages && (
                <Link
                  href={`/blog/${lang}?page=${currentPage + 1}`}
                  className="px-4 py-2 rounded-md border border-border hover:border-[rgb(6,182,212)] transition-colors"
                >
                  Next
                </Link>
              )}
            </nav>

            {/* Pagination links for SEO */}
            <div className="hidden">
              {currentPage > 1 && (
                <link
                  rel="prev"
                  href={`https://soursync.com/blog/${lang}?page=${currentPage - 1}`}
                />
              )}
              {currentPage < totalPages && (
                <link
                  rel="next"
                  href={`https://soursync.com/blog/${lang}?page=${currentPage + 1}`}
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

