import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { HeroHeader } from '@/components/ui/hero-header'
import { Footer } from '@/components/ui/footer'
import { ChatSupportWidget } from '@/components/ui/chat-support-widget'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  
  try {
    const post = getPostBySlug(slug)
    
    return {
      title: `${post.title} - SourSync Blog`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
      },
    }
  } catch {
    return {
      title: 'Post Not Found - SourSync Blog',
    }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  
  let post
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }

  return (
    <main className="relative bg-background min-h-screen">
      <HeroHeader />
      
      <article className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Link */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[rgb(6,182,212)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Post Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-[rgb(6,182,212)]/10 text-[rgb(6,182,212)] border border-[rgb(6,182,212)]/20 hover:bg-[rgb(6,182,212)]/20 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </header>

          {/* Post Content */}
          <div className="prose prose-invert prose-lg max-w-none
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
          ">
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

          {/* Post Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[rgb(6,182,212)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all posts
              </Link>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://soursync.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[rgb(6,182,212)] transition-colors"
                >
                  Twitter
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://soursync.com/blog/${post.slug}`)}`}
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


