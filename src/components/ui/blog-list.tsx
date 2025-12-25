'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import type { Post } from '@/lib/posts'

interface BlogListProps {
  posts: Post[]
  language?: string
}

export function BlogList({ posts, language = 'en' }: BlogListProps) {
  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and guides for sourcing agents
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.language || language}/${post.slug}`}>
                  <Card className="group relative overflow-hidden border-border bg-card hover:border-[rgb(6,182,212)]/30 hover:shadow-xl hover:shadow-[rgb(6,182,212)]/10 transition-all duration-300 cursor-pointer h-full">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(6,182,212)]/0 via-[rgb(6,182,212)]/0 to-[rgb(6,182,212)]/0 group-hover:from-[rgb(6,182,212)]/5 group-hover:via-[rgb(6,182,212)]/0 group-hover:to-[rgb(6,182,212)]/5 transition-all duration-300 pointer-events-none" />
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-[rgb(6,182,212)]/10 text-[rgb(6,182,212)] border border-[rgb(6,182,212)]/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <CardTitle className="text-xl font-semibold text-foreground group-hover:text-[rgb(6,182,212)] transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground line-clamp-3 mt-2">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative z-10">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {post.published_at
                                ? format(new Date(post.published_at), 'MMM d, yyyy')
                                : 'Draft'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{post.readingTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[rgb(6,182,212)] group-hover:gap-3 transition-all duration-300">
                        <span className="text-sm font-medium">Read more</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}




