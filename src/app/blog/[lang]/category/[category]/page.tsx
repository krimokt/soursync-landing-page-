import { HeroHeader } from '@/components/ui/hero-header'
import { Footer } from '@/components/ui/footer'
import { ChatSupportWidget } from '@/components/ui/chat-support-widget'
import { BlogList } from '@/components/ui/blog-list'
import { getPostsByCategory, getUniqueCategories } from '@/lib/posts'
import { notFound, permanentRedirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ lang: string; category: string }>
  searchParams: Promise<{ page?: string }>
}

// Generate static params for all categories
export async function generateStaticParams() {
  const languages = ['en', 'fr', 'ar', 'zh']
  const params: Array<{ lang: string; category: string }> = []

  for (const lang of languages) {
    const categories = await getUniqueCategories(lang)
    params.push(
      ...categories.map((category) => ({
        lang,
        category: encodeURIComponent(category),
      }))
    )
  }

  return params
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { lang, category } = await params
  const decodedCategory = decodeURIComponent(category)

  return {
    title: `${decodedCategory} - SourSync Blog`,
    description: `Browse all blog posts in the ${decodedCategory} category. Insights, tips, and guides for sourcing agents.`,
    openGraph: {
      title: `${decodedCategory} - SourSync Blog`,
      description: `Browse all blog posts in the ${decodedCategory} category`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { lang, category } = await params
  const { page } = await searchParams
  const decodedCategory = decodeURIComponent(category)
  const currentPage = parseInt(page || '1', 10)

  // Validate language
  const validLanguages = ['en', 'fr', 'ar', 'zh']
  if (!validLanguages.includes(lang)) {
    permanentRedirect('/blog/en')
  }

  const posts = await getPostsByCategory(decodedCategory, lang)

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
          {/* Breadcrumbs */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <a
                  href={`/blog/${lang}`}
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>/</li>
              <li className="text-foreground">{decodedCategory}</li>
            </ol>
          </nav>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {decodedCategory}
            </h1>
            <p className="text-muted-foreground">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this
              category
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
                  href={`/blog/${lang}/category/${category}?page=${currentPage - 1}`}
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
                  href={`/blog/${lang}/category/${category}?page=${currentPage + 1}`}
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
                  href={`https://soursync.com/blog/${lang}/category/${category}?page=${currentPage - 1}`}
                />
              )}
              {currentPage < totalPages && (
                <link
                  rel="next"
                  href={`https://soursync.com/blog/${lang}/category/${category}?page=${currentPage + 1}`}
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

