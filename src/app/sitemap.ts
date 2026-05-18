import { MetadataRoute } from 'next'
import { getAllPosts, getUniqueCategories } from '@/lib/posts'

const baseUrl = 'https://soursync.com'
const langs = ['en', 'fr', 'ar', 'zh'] as const

// Language prefix: 'en' uses no prefix (root), others use /lang
const prefix = (lang: string, path: string) =>
  lang === 'en' ? `${baseUrl}${path}` : `${baseUrl}/${lang}${path}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  // ── Homepages (one per language) ──────────────────────────────────────
  const homepageLastMod = new Date('2025-05-01');
  for (const lang of langs) {
    entries.push({
      url: prefix(lang, ''),
      lastModified: homepageLastMod,
      changeFrequency: 'weekly',
      priority: lang === 'en' ? 1.0 : 0.95,
    })
  }

  // ── Core marketing pages (4 languages each) ──────────────────────────
  const marketingPages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/features',  priority: 0.9,  freq: 'monthly' },
    { path: '/solution',  priority: 0.9,  freq: 'monthly' },
    { path: '/pricing',   priority: 0.9,  freq: 'weekly'  },
    { path: '/about',     priority: 0.7,  freq: 'monthly' },
    { path: '/contact',   priority: 0.7,  freq: 'monthly' },
  ]

  const marketingLastMod = new Date('2025-05-01');

  // ── Demo page (EN only) ───────────────────────────────────────────────
  entries.push({
    url: `${baseUrl}/demo`,
    lastModified: marketingLastMod,
    changeFrequency: 'monthly',
    priority: 0.8,
  })

  for (const lang of langs) {
    for (const page of marketingPages) {
      entries.push({
        url: prefix(lang, page.path),
        lastModified: marketingLastMod,
        changeFrequency: page.freq,
        priority: lang === 'en' ? page.priority : page.priority - 0.05,
      })
    }
  }

  // ── Blog pages ────────────────────────────────────────────────────────
  for (const lang of langs) {
    entries.push({
      url: `${baseUrl}/blog/${lang}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    })

    const posts = await getAllPosts(lang, 'published')
    for (const post of posts) {
      if (post.noindex) continue
      entries.push({
        url: `${baseUrl}/blog/${lang}/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }

    const categories = await getUniqueCategories(lang)
    for (const category of categories) {
      entries.push({
        url: `${baseUrl}/blog/${lang}/category/${encodeURIComponent(category)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  return entries
}
