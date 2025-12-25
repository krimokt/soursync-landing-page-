import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { BlogEditor } from '@/components/admin/blog-editor'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch the post
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !post) {
    notFound()
  }

  return (
    <main className="relative bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Edit Blog Post
          </h1>
          <BlogEditor user={user} post={post} />
        </div>
    </main>
  )
}

