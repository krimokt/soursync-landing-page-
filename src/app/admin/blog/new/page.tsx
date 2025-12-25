import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { BlogEditor } from '@/components/admin/blog-editor'

export default async function NewBlogPostPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="relative bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            New Blog Post
          </h1>
          <BlogEditor user={user} />
        </div>
    </main>
  )
}

