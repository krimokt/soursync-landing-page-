'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Link2, FileText, CheckCircle2, AlertCircle } from 'lucide-react'

interface ImportResult {
  success: boolean
  post?: any
  message?: string
  error?: string
}

export function QuickImportForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [importMode, setImportMode] = useState<'paste' | 'url'>('paste')
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [language, setLanguage] = useState('en')
  const [result, setResult] = useState<ImportResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/admin/blog/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: importMode === 'paste' ? content : undefined,
          url: importMode === 'url' ? url : undefined,
          status,
          language,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setResult({
          success: false,
          error: data.error || 'Failed to import content',
        })
        setLoading(false)
        return
      }

      setResult({
        success: true,
        post: data.post,
        message: data.message,
      })

      // Redirect to edit page after a short delay
      setTimeout(() => {
        router.push(`/admin/blog/${data.post.id}/edit`)
        router.refresh()
      }, 2000)
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'An error occurred',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Import</CardTitle>
          <CardDescription>
            Paste content or provide a URL to automatically create a blog post
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Import Mode Toggle */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant={importMode === 'paste' ? 'default' : 'outline'}
                onClick={() => {
                  setImportMode('paste')
                  setResult(null)
                }}
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Paste Content
              </Button>
              <Button
                type="button"
                variant={importMode === 'url' ? 'default' : 'outline'}
                onClick={() => {
                  setImportMode('url')
                  setResult(null)
                }}
                className="flex items-center gap-2"
              >
                <Link2 className="w-4 h-4" />
                Import from URL
              </Button>
            </div>

            {/* Content Input */}
            {importMode === 'paste' ? (
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value)
                    setResult(null)
                  }}
                  placeholder="Paste your content here (ContentShake format, HTML, Markdown, or plain text)..."
                  rows={15}
                  className="font-mono text-sm"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Supports: ContentShake format, HTML, Markdown, or plain text
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value)
                    setResult(null)
                  }}
                  placeholder="https://example.com/article"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter a URL to fetch and import content from
                </p>
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="ar">Arabic</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            {/* Result Message */}
            {result && (
              <div
                className={`p-4 rounded-lg border ${
                  result.success
                    ? 'bg-green-500/10 border-green-500/20 text-green-500'
                    : 'bg-red-500/10 border-red-500/20 text-red-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  {result.success ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <div>
                    <p className="font-medium">
                      {result.success ? 'Success!' : 'Error'}
                    </p>
                    <p className="text-sm mt-1">
                      {result.message || result.error}
                    </p>
                    {result.success && result.post && (
                      <p className="text-xs mt-2 opacity-80">
                        Redirecting to edit page...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || (importMode === 'paste' && !content.trim()) || (importMode === 'url' && !url.trim())}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Import & Create Post
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

