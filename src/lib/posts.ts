import { unstable_cache } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import readingTime from 'reading-time'

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  cover?: string
}

export interface Post {
  id: string
  slug: string
  language: string
  title: string
  description: string
  content: string // MDX content
  content_html: string | null // Rendered HTML cache
  toc: Array<{ id: string; text: string; level: number }> | null
  cover_image: string | null
  cover_alt: string | null
  category: string | null
  tags: string[]
  author_id: string | null
  author_name: string
  seo_title: string | null
  seo_description: string | null
  canonical_url: string | null
  noindex: boolean
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  updated_at: string
  created_at: string
  translation_group_id: string | null
  parent_post_id: string | null
  readingTime: string
}

export interface PostTranslation {
  language: string
  slug: string
  title: string
}

/**
 * Get all posts, filtered by language and status
 */
export async function getAllPosts(
  language: string = 'en',
  status: 'published' | 'draft' = 'published'
): Promise<Post[]> {
  return unstable_cache(
    async () => {
      const supabase = await createClient()
      let query = supabase
        .from('posts')
        .select('*')
        .eq('language', language)
        .eq('status', status)
        .order('published_at', { ascending: false })

      if (status === 'published') {
        query = query.eq('noindex', false) // Only include indexable posts
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching posts:', error)
        return []
      }

      if (!data) return []

      // Add reading time to each post
      return data.map((post) => ({
        ...post,
        content: post.content_mdx, // Use MDX content
        readingTime: readingTime(post.content_mdx).text,
      })) as Post[]
    },
    [`posts-${language}-${status}`],
    { revalidate: 3600 } // 1 hour cache
  )()
}

/**
 * Get a single post by slug and language
 */
export async function getPostBySlug(
  slug: string,
  language: string = 'en'
): Promise<Post | null> {
  return unstable_cache(
    async () => {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('language', language)
        .single()

      if (error || !data) {
        return null
      }

      return {
        ...data,
        content: data.content_mdx,
        readingTime: readingTime(data.content_mdx).text,
      } as Post
    },
    [`post-${language}-${slug}`],
    { revalidate: 3600 }
  )()
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(
  category: string,
  language: string = 'en'
): Promise<Post[]> {
  return unstable_cache(
    async () => {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', category)
        .eq('language', language)
        .eq('status', 'published')
        .eq('noindex', false)
        .order('published_at', { ascending: false })

      if (error || !data) {
        return []
      }

      return data.map((post) => ({
        ...post,
        content: post.content_mdx,
        readingTime: readingTime(post.content_mdx).text,
      })) as Post[]
    },
    [`posts-category-${language}-${category}`],
    { revalidate: 3600 }
  )()
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(
  tag: string,
  language: string = 'en'
): Promise<Post[]> {
  return unstable_cache(
    async () => {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('language', language)
        .eq('status', 'published')
        .eq('noindex', false)
        .contains('tags', [tag])
        .order('published_at', { ascending: false })

      if (error || !data) {
        return []
      }

      return data.map((post) => ({
        ...post,
        content: post.content_mdx,
        readingTime: readingTime(post.content_mdx).text,
      })) as Post[]
    },
    [`posts-tag-${language}-${tag}`],
    { revalidate: 3600 }
  )()
}

/**
 * Get all unique tags
 */
export async function getAllTags(language: string = 'en'): Promise<string[]> {
  return unstable_cache(
    async () => {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('posts')
        .select('tags')
        .eq('language', language)
        .eq('status', 'published')
        .eq('noindex', false)

      if (error || !data) {
        return []
      }

      const tags = new Set<string>()
      data.forEach((post) => {
        if (post.tags) {
          post.tags.forEach((tag) => tags.add(tag))
        }
      })

      return Array.from(tags).sort()
    },
    [`tags-${language}`],
    { revalidate: 3600 }
  )()
}

/**
 * Get all unique categories
 */
export async function getUniqueCategories(
  language: string = 'en'
): Promise<string[]> {
  return unstable_cache(
    async () => {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('posts')
        .select('category')
        .eq('language', language)
        .eq('status', 'published')
        .eq('noindex', false)
        .not('category', 'is', null)

      if (error || !data) {
        return []
      }

      const categories = new Set<string>()
      data.forEach((post) => {
        if (post.category) {
          categories.add(post.category)
        }
      })

      return Array.from(categories).sort()
    },
    [`categories-${language}`],
    { revalidate: 3600 }
  )()
}

/**
 * Get related posts by category and tags
 */
export async function getRelatedPosts(
  postId: string,
  limit: number = 5
): Promise<Post[]> {
  return unstable_cache(
    async () => {
      const supabase = await createClient()
      
      // First get the post to find its category and tags
      const { data: post } = await supabase
        .from('posts')
        .select('category, tags, language')
        .eq('id', postId)
        .single()

      if (!post) return []

      // Find related posts by category or tags
      let query = supabase
        .from('posts')
        .select('*')
        .eq('language', post.language)
        .eq('status', 'published')
        .eq('noindex', false)
        .neq('id', postId)
        .order('published_at', { ascending: false })
        .limit(limit)

      // If post has category, prioritize category matches
      if (post.category) {
        query = query.eq('category', post.category)
      }

      const { data, error } = await query

      if (error || !data || data.length < limit) {
        // If not enough by category, also search by tags
        if (post.tags && post.tags.length > 0) {
          const { data: tagData } = await supabase
            .from('posts')
            .select('*')
            .eq('language', post.language)
            .eq('status', 'published')
            .eq('noindex', false)
            .neq('id', postId)
            .overlaps('tags', post.tags)
            .order('published_at', { ascending: false })
            .limit(limit - (data?.length || 0))

          if (tagData) {
            const combined = [...(data || []), ...tagData]
            // Remove duplicates
            const unique = combined.filter(
              (post, index, self) =>
                index === self.findIndex((p) => p.id === post.id)
            )
            return unique
              .slice(0, limit)
              .map((p) => ({
                ...p,
                content: p.content_mdx,
                readingTime: readingTime(p.content_mdx).text,
              })) as Post[]
          }
        }
      }

      if (!data) return []

      return data.map((post) => ({
        ...post,
        content: post.content_mdx,
        readingTime: readingTime(post.content_mdx).text,
      })) as Post[]
    },
    [`related-posts-${postId}`],
    { revalidate: 3600 }
  )()
}

/**
 * Get all translations of a post
 */
export async function getPostTranslations(
  translationGroupId: string | null
): Promise<PostTranslation[]> {
  if (!translationGroupId) return []

  return unstable_cache(
    async () => {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('posts')
        .select('language, slug, title')
        .eq('translation_group_id', translationGroupId)
        .eq('status', 'published')

      if (error || !data) {
        return []
      }

      return data.map((post) => ({
        language: post.language,
        slug: post.slug,
        title: post.title,
      }))
    },
    [`translations-${translationGroupId}`],
    { revalidate: 3600 }
  )()
}

/**
 * Get redirect for a path
 */
export async function getRedirect(
  fromPath: string
): Promise<{ to_path: string; status_code: number } | null> {
  return unstable_cache(
    async () => {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('redirects')
        .select('to_path, status_code')
        .eq('from_path', fromPath)
        .single()

      if (error || !data) {
        return null
      }

      return {
        to_path: data.to_path,
        status_code: data.status_code,
      }
    },
    [`redirect-${fromPath}`],
    { revalidate: 3600 }
  )()
}

/**
 * Get next and previous posts (chronological)
 */
export async function getAdjacentPosts(
  postId: string,
  language: string = 'en'
): Promise<{ next: Post | null; previous: Post | null }> {
  return unstable_cache(
    async () => {
      const supabase = await createClient()
      
      // Get current post
      const { data: currentPost } = await supabase
        .from('posts')
        .select('published_at')
        .eq('id', postId)
        .single()

      if (!currentPost?.published_at) {
        return { next: null, previous: null }
      }

      // Get all published posts in same language, ordered by published_at
      const { data: allPosts } = await supabase
        .from('posts')
        .select('*')
        .eq('language', language)
        .eq('status', 'published')
        .eq('noindex', false)
        .order('published_at', { ascending: false })

      if (!allPosts) {
        return { next: null, previous: null }
      }

      const currentIndex = allPosts.findIndex((p) => p.id === postId)
      
      const next = currentIndex > 0 ? {
        ...allPosts[currentIndex - 1],
        content: allPosts[currentIndex - 1].content_mdx,
        readingTime: readingTime(allPosts[currentIndex - 1].content_mdx).text,
      } as Post : null

      const previous = currentIndex < allPosts.length - 1 ? {
        ...allPosts[currentIndex + 1],
        content: allPosts[currentIndex + 1].content_mdx,
        readingTime: readingTime(allPosts[currentIndex + 1].content_mdx).text,
      } as Post : null

      return { next, previous }
    },
    [`adjacent-posts-${postId}-${language}`],
    { revalidate: 3600 }
  )()
}

/**
 * Revalidate post-related paths (call this on publish/update)
 */
export async function revalidatePostPaths(
  slug: string,
  language: string,
  category?: string | null
): Promise<void> {
  // This function is called from server actions
  // The actual revalidation happens via revalidatePath in Next.js
  // This is just a placeholder for the API
  console.log(`Revalidating paths for post: ${language}/${slug}`)
}
