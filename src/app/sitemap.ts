import { MetadataRoute } from 'next'
import { getAllPosts, getUniqueCategories } from '@/lib/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://soursync.com'
  const languages = ['en', 'fr', 'ar', 'zh']

  const entries: MetadataRoute.Sitemap = []

  // Static pages
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  })

  entries.push({
    url: `${baseUrl}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  })

  entries.push({
    url: `${baseUrl}/contact`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  })

  // Blog posts (only published, noindex=false)
  for (const lang of languages) {
    // Add blog list page for each language
    entries.push({
      url: `${baseUrl}/blog/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })

    const posts = await getAllPosts(lang, 'published')

    for (const post of posts) {
      if (post.noindex) continue // Skip noindex posts

      entries.push({
        url: `${baseUrl}/blog/${lang}/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }

    // Category pages
    const categories = await getUniqueCategories(lang)
    for (const category of categories) {
      entries.push({
        url: `${baseUrl}/blog/${lang}/category/${encodeURIComponent(category)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  // Pagination: If > 50k URLs, split into multiple sitemaps
  // For now, return single sitemap

  return entries
}
