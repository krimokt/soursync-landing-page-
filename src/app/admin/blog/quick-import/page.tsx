import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { QuickImportForm } from '@/components/admin/quick-import-form'

export default async function QuickImportPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="relative bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Quick Import
          </h1>
          <p className="text-lg text-muted-foreground">
            Paste content or provide a URL to automatically create a blog post
          </p>
        </div>

        <QuickImportForm />
      </div>
    </main>
  )
}

