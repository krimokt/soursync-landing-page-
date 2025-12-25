'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Eye, Edit, Trash2, Search, Filter } from 'lucide-react'

interface Post {
  id: string
  slug: string
  language: string
  title: string
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  updated_at: string
  category: string | null
  tags: string[]
  noindex: boolean
}

interface BlogListTableProps {
  posts: Post[]
}

export function BlogListTable({ posts: initialPosts }: BlogListTableProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [languageFilter, setLanguageFilter] = useState<string>('all')

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    const matchesLanguage =
      languageFilter === 'all' || post.language === languageFilter

    return matchesSearch && matchesStatus && matchesLanguage
  })

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }

    // Soft delete - set status to archived
    const response = await fetch(`/api/admin/blog/${postId}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      setPosts(posts.filter((p) => p.id !== postId))
    } else {
      alert('Failed to delete post')
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-500/10 text-green-500 border-green-500/20',
      draft: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      archived: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    }

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded border ${
          styles[status as keyof typeof styles] || styles.draft
        }`}
      >
        {status}
      </span>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[rgb(6,182,212)]"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-[rgb(6,182,212)]"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-[rgb(6,182,212)]"
          >
            <option value="all">All Languages</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="ar">Arabic</option>
            <option value="zh">Chinese</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  Language
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  Updated
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No posts found
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {post.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /{post.slug}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-muted-foreground uppercase">
                        {post.language}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(post.status)}
                        {post.noindex && (
                          <span className="text-xs text-muted-foreground">
                            (noindex)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-muted-foreground">
                        {post.category || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(post.updated_at), 'MMM d, yyyy')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {post.status === 'published' && (
                          <a
                            href={`/blog/${post.language}/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            title="View post"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        )}
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          title="Edit post"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredPosts.length} of {posts.length} posts
      </div>
    </div>
  )
}

