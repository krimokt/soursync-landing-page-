import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { BlogListTable } from '@/components/admin/blog-list-table'

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch all posts (admin can see all statuses)
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <main className="relative bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Blog Posts
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage your blog posts and content
              </p>
            </div>
            <a
              href="/admin/blog/new"
              className="px-4 py-2 bg-[rgb(6,182,212)] text-white rounded-md hover:bg-[rgb(6,182,212)]/90 transition-colors"
            >
              New Post
            </a>
          </div>

          <BlogListTable posts={posts || []} />
        </div>
    </main>
  )
}

