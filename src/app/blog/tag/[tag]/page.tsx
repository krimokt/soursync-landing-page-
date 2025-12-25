import { permanentRedirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ tag: string }>
}

export default async function LegacyTagPage({ params }: PageProps) {
  const { tag } = await params
  // Redirect old tag URLs to new language-prefixed structure (default to English)
  permanentRedirect(`/blog/en/tag/${tag}`)
}




