import { notFound, permanentRedirect } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { HeroHeader } from '@/components/ui/hero-header'
import { Footer } from '@/components/ui/footer'
import { ChatSupportWidget } from '@/components/ui/chat-support-widget'
import {
  getPostBySlug,
  getRedirect,
  getPostTranslations,
  getRelatedPosts,
  getAdjacentPosts,
} from '@/lib/posts'
import { format } from 'date-fns'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import Image from 'next/image'

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const { getAllPosts } = await import('@/lib/posts')
  const languages = ['en', 'fr', 'ar', 'zh']
  const params: Array<{ lang: string; slug: string }> = []

  for (const lang of languages) {
    const posts = await getAllPosts(lang, 'published')
    params.push(...posts.map((post) => ({ lang, slug: post.slug })))
  }

  return params
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params

  try {
    const post = await getPostBySlug(slug, lang)
    if (!post) {
      return {
        title: 'Post Not Found - SourSync Blog',
      }
    }

    const url = `https://soursync.com/blog/${lang}/${slug}`
    const title = post.seo_title || post.title
    const description = post.seo_description || post.description

    // Get translations for hreflang
    const translations = await getPostTranslations(post.translation_group_id || null)

    const hreflangLinks = translations.map((t) => ({
      hreflang: t.language,
      href: `https://soursync.com/blog/${t.language}/${t.slug}`,
    }))

    // Add self reference
    hreflangLinks.push({
      hreflang: post.language,
      href: url,
    })

    // Add x-default (usually English)
    const enTranslation = translations.find((t) => t.language === 'en')
    if (enTranslation) {
      hreflangLinks.push({
        hreflang: 'x-default',
        href: `https://soursync.com/blog/en/${enTranslation.slug}`,
      })
    } else if (post.language === 'en') {
      hreflangLinks.push({
        hreflang: 'x-default',
        href: url,
      })
    }

    return {
      title,
      description,
      alternates: {
        canonical: post.canonical_url || url,
        languages: Object.fromEntries(
          hreflangLinks.map((link) => [link.hreflang, link.href])
        ),
      },
      robots: {
        index: !post.noindex,
        follow: true,
      },
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.published_at || undefined,
        modifiedTime: post.updated_at,
        tags: post.tags,
        url: url,
        siteName: 'SourSync',
        locale: post.language === 'ar' ? 'ar_SA' : post.language === 'fr' ? 'fr_FR' : post.language === 'zh' ? 'zh_CN' : 'en_US',
        images: post.cover_image
          ? [
              {
                url: `https://soursync.com${post.cover_image}`,
                width: 1200,
                height: 630,
                alt: post.cover_alt || post.title,
              },
            ]
          : [
              {
                url: `https://soursync.com/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    }
  } catch {
    return {
      title: 'Post Not Found - SourSync Blog',
    }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params

  // Check redirects table first
  const redirect = await getRedirect(`/blog/${lang}/${slug}`)
  if (redirect) {
    permanentRedirect(redirect.to_path) // 308 permanent redirect
  }

  const post = await getPostBySlug(slug, lang)

  if (!post) {
    notFound() // 404
  }

  // Handle archived posts
  if (post.status === 'archived') {
    notFound() // Use 404 for simplicity
  }

  // Handle drafts (only admins can view - this is handled by RLS, but we check here too)
  if (post.status === 'draft') {
    notFound() // Non-admins will get 404
  }

  // Get translations for language switcher
  const translations = await getPostTranslations(post.translation_group_id || null)

  // Get related posts
  const relatedPosts = await getRelatedPosts(post.id, 5)

  // Get adjacent posts (next/previous)
  const { next: nextPost, previous: previousPost } = await getAdjacentPosts(
    post.id,
    lang
  )

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seo_title || post.title,
    description: post.seo_description || post.description,
    image: post.cover_image
      ? `https://soursync.com${post.cover_image}`
      : 'https://soursync.com/soursync-logo.svg',
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: post.author_name,
      url: post.author_id
        ? `https://soursync.com/about#${post.author_id}`
        : 'https://soursync.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SourSync',
      logo: {
        '@type': 'ImageObject',
        url: 'https://soursync.com/soursync-logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://soursync.com/blog/${post.language}/${post.slug}`,
    },
    articleSection: post.category || undefined,
    keywords: post.tags.join(', '),
  }

  // BreadcrumbList schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://soursync.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `https://soursync.com/blog/${lang}`,
      },
      ...(post.category
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: post.category,
              item: `https://soursync.com/blog/${lang}/category/${post.category}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: post.category ? 4 : 3,
        name: post.title,
        item: `https://soursync.com/blog/${lang}/${post.slug}`,
      },
    ],
  }

  return (
    <main className="relative bg-background min-h-screen">
      {/* Add JSON-LD to the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <HeroHeader />

      <article className="relative z-10 pt-24 pb-16" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href={`/blog/${lang}`}
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              {post.category && (
                <>
                  <li>/</li>
                  <li>
                    <Link
                      href={`/blog/${lang}/category/${post.category}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {post.category}
                    </Link>
                  </li>
                </>
              )}
              <li>/</li>
              <li className="text-foreground">{post.title}</li>
            </ol>
          </nav>

          {/* Back Link */}
          <Link
            href={`/blog/${lang}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[rgb(6,182,212)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Post Header */}
          <header className="mb-12">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/${lang}/tag/${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-[rgb(6,182,212)]/10 text-[rgb(6,182,212)] border border-[rgb(6,182,212)]/20 hover:bg-[rgb(6,182,212)]/20 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
              {post.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.published_at}>
                    {format(new Date(post.published_at), 'MMMM d, yyyy')}
                  </time>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>
              {post.author_name && (
                <div className="text-muted-foreground">
                  By {post.author_name}
                </div>
              )}
              {/* Language Switcher */}
              <div className="ml-auto">
                <BlogLanguageSwitcher
                  currentLanguage={post.language}
                  translations={translations}
                />
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="mb-12">
              <Image
                src={post.cover_image}
                alt={post.cover_alt || post.title}
                width={1200}
                height={630}
                priority
                className="w-full h-auto rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Post Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
            prose-headings:text-foreground prose-headings:font-semibold
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-[rgb(6,182,212)] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:text-muted-foreground prose-ul:my-6
            prose-ol:text-muted-foreground prose-ol:my-6
            prose-li:my-2
            prose-code:text-[rgb(6,182,212)] prose-code:bg-[rgb(6,182,212)]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-muted prose-pre:border prose-pre:border-border
            prose-blockquote:border-l-[rgb(6,182,212)] prose-blockquote:text-muted-foreground
            prose-hr:border-border prose-hr:my-8
          "
          >
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                  ],
                },
              }}
            />
          </div>

          {/* Next/Previous Navigation */}
          <NextPreviousPosts
            currentPost={post}
            nextPost={nextPost}
            previousPost={previousPost}
          />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Related Posts
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.language}/${relatedPost.slug}`}
                    className="block p-4 rounded-lg border border-border hover:border-[rgb(6,182,212)] transition-colors"
                  >
                    <h3 className="font-semibold text-foreground mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Post Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Link
                href={`/blog/${lang}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[rgb(6,182,212)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all posts
              </Link>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://soursync.com/blog/${lang}/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[rgb(6,182,212)] transition-colors"
                >
                  Twitter
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://soursync.com/blog/${lang}/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[rgb(6,182,212)] transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </div>
      </article>

      <Footer />
      <ChatSupportWidget />
    </main>
  )
}

