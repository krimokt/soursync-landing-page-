import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Post } from '@/lib/posts'

interface NextPreviousPostsProps {
  currentPost: Post
  nextPost: Post | null
  previousPost: Post | null
}

export function NextPreviousPosts({
  currentPost,
  nextPost,
  previousPost,
}: NextPreviousPostsProps) {
  if (!nextPost && !previousPost) {
    return null
  }

  return (
    <nav
      className="mt-16 pt-8 border-t border-border"
      aria-label="Post navigation"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Post */}
        {previousPost ? (
          <Link
            href={`/blog/${previousPost.language}/${previousPost.slug}`}
            className="group p-6 rounded-lg border border-border hover:border-[rgb(6,182,212)] transition-colors"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Previous Post</span>
            </div>
            <h3 className="font-semibold text-foreground group-hover:text-[rgb(6,182,212)] transition-colors">
              {previousPost.title}
            </h3>
          </Link>
        ) : (
          <div />
        )}

        {/* Next Post */}
        {nextPost && (
          <Link
            href={`/blog/${nextPost.language}/${nextPost.slug}`}
            className="group p-6 rounded-lg border border-border hover:border-[rgb(6,182,212)] transition-colors text-right md:text-left"
          >
            <div className="flex items-center justify-end md:justify-start gap-2 text-sm text-muted-foreground mb-2">
              <span>Next Post</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="font-semibold text-foreground group-hover:text-[rgb(6,182,212)] transition-colors">
              {nextPost.title}
            </h3>
          </Link>
        )}
      </div>
    </nav>
  )
}

