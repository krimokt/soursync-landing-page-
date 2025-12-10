"use client";

import { motion } from 'motion/react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with SourSync: A Complete Guide for Sourcing Agents',
    description: 'Learn how to streamline your sourcing operations with SourSync. This comprehensive guide covers everything from setting up your account to managing your first order.',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Getting Started',
    slug: 'getting-started-with-soursync',
  },
  {
    id: '2',
    title: 'How to Create Professional Quotations That Get Approved Faster',
    description: 'Discover best practices for creating clear, structured quotations that help your clients make decisions quickly and reduce back-and-forth communication.',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Best Practices',
    slug: 'professional-quotations-guide',
  },
  {
    id: '3',
    title: 'Managing Multiple Clients: Tips for Solo Sourcing Agents',
    description: 'Learn how to efficiently manage multiple clients without mixing conversations or files. Organize your pipelines and improve your follow-up discipline.',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Productivity',
    slug: 'managing-multiple-clients',
  },
  {
    id: '4',
    title: 'Building Trust with Your Clients Through Transparent Communication',
    description: 'Explore how SourSync\'s client portal helps you build trust and professionalism by giving clients visibility into their orders, shipping, and payments.',
    date: '2024-01-01',
    readTime: '4 min read',
    category: 'Client Relations',
    slug: 'building-trust-with-clients',
  },
  {
    id: '5',
    title: 'The Future of Sourcing: Why Digital Tools Are Essential',
    description: 'Understand why modern sourcing agents are moving away from WhatsApp and Excel to structured platforms that scale with their business.',
    date: '2023-12-28',
    readTime: '8 min read',
    category: 'Industry Insights',
    slug: 'future-of-sourcing',
  },
  {
    id: '6',
    title: 'Payment Tracking Made Simple: A Guide for Sourcing Agents',
    description: 'Learn how to track deposits, balances, and payment steps per order to reduce accounting confusion and improve client relationships.',
    date: '2023-12-25',
    readTime: '5 min read',
    category: 'Financial Management',
    slug: 'payment-tracking-guide',
  },
];

export function BlogSection() {
  const { t } = useLanguage();

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
            {t('blog.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="group relative overflow-hidden border-border bg-card hover:border-[rgb(6,182,212)]/30 hover:shadow-xl hover:shadow-[rgb(6,182,212)]/10 transition-all duration-300 cursor-pointer h-full">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgb(6,182,212)]/0 via-[rgb(6,182,212)]/0 to-[rgb(6,182,212)]/0 group-hover:from-[rgb(6,182,212)]/5 group-hover:via-[rgb(6,182,212)]/0 group-hover:to-[rgb(6,182,212)]/5 transition-all duration-300 pointer-events-none" />
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[rgb(6,182,212)]/10 text-[rgb(6,182,212)] border border-[rgb(6,182,212)]/20">
                        {post.category}
                      </span>
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
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
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
      </div>
    </section>
  );
}

