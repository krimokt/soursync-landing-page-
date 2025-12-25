'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

interface Post {
  id?: string
  slug: string
  language: string
  title: string
  description: string
  content_mdx: string
  cover_image: string | null
  cover_alt: string | null
  category: string | null
  tags: string[]
  seo_title: string | null
  seo_description: string | null
  canonical_url: string | null
  noindex: boolean
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
}

interface BlogEditorProps {
  user: { id: string; email?: string }
  post?: Post
}

export function BlogEditor({ user, post }: BlogEditorProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<Post>({
    slug: post?.slug || '',
    language: post?.language || 'en',
    title: post?.title || '',
    description: post?.description || '',
    content_mdx: post?.content_mdx || '',
    cover_image: post?.cover_image || null,
    cover_alt: post?.cover_alt || null,
    category: post?.category || null,
    tags: post?.tags || [],
    seo_title: post?.seo_title || null,
    seo_description: post?.seo_description || null,
    canonical_url: post?.canonical_url || null,
    noindex: post?.noindex || false,
    status: post?.status || 'draft',
    published_at: post?.published_at || null,
  })

  const [tagInput, setTagInput] = useState('')

  // Auto-generate slug from title
  useEffect(() => {
    if (!post && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      setFormData((prev) => ({ ...prev, slug }))
    }
  }, [formData.title, post])

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const postData = {
        ...formData,
        author_id: user.id,
        author_name: user.email || 'Admin',
        updated_at: new Date().toISOString(),
      }

      if (post?.id) {
        // Update existing post
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', post.id)

        if (error) throw error
        router.push('/admin/blog')
        router.refresh()
      } else {
        // Create new post
        const { error } = await supabase.from('posts').insert([postData])

        if (error) throw error
        router.push('/admin/blog')
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={3}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={formData.language}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, language: e.target.value }))
                }
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="ar">Arabic</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as 'draft' | 'published' | 'archived',
                  }))
                }
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label className="block text-sm font-medium mb-2">
              MDX Content *
            </label>
            <textarea
              required
              value={formData.content_mdx}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content_mdx: e.target.value }))
              }
              rows={20}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground font-mono text-sm"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              value={formData.category || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                placeholder="Add a tag"
                className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-foreground"
              />
              <Button type="button" onClick={handleAddTag}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-muted rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cover Image URL</label>
            <input
              type="text"
              value={formData.cover_image || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, cover_image: e.target.value }))
              }
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cover Alt Text</label>
            <input
              type="text"
              value={formData.cover_alt || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, cover_alt: e.target.value }))
              }
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">SEO Title</label>
            <input
              type="text"
              value={formData.seo_title || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, seo_title: e.target.value }))
              }
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              SEO Description
            </label>
            <textarea
              value={formData.seo_description || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  seo_description: e.target.value,
                }))
              }
              rows={3}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Canonical URL
            </label>
            <input
              type="text"
              value={formData.canonical_url || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  canonical_url: e.target.value,
                }))
              }
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="noindex"
              checked={formData.noindex}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, noindex: e.target.checked }))
              }
              className="w-4 h-4"
            />
            <label htmlFor="noindex" className="text-sm font-medium">
              Noindex (prevent search engine indexing)
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/blog')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

