import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { parseContent, fetchAndParseURL } from '@/lib/content-parser'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { content, url, status = 'draft', language = 'en' } = body

    if (!content && !url) {
      return NextResponse.json(
        { error: 'Either content or url must be provided' },
        { status: 400 }
      )
    }

    // Fetch content from URL if provided
    let parsedContent
    if (url) {
      parsedContent = await fetchAndParseURL(url)
    } else {
      parsedContent = await parseContent(content)
    }

    // Generate slug from title
    const slug = parsedContent.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 100)

    // Check for existing post with same slug
    const { data: existing } = await supabase
      .from('posts')
      .select('id, slug')
      .eq('slug', slug)
      .eq('language', parsedContent.language || language)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: `Post with slug "${slug}" already exists`, existingId: existing.id },
        { status: 409 }
      )
    }

    // Extract TOC from content
    const toc: Array<{ id: string; text: string; level: number }> = []
    const lines = parsedContent.content.split('\n')
    
    for (const line of lines) {
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
      if (headingMatch) {
        const level = headingMatch[1].length
        const text = headingMatch[2].trim()
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
        
        toc.push({ id, text, level })
      }
    }

    // Prepare post data
    const postData = {
      slug,
      language: parsedContent.language || language,
      title: parsedContent.title,
      description: parsedContent.description,
      content_mdx: parsedContent.content,
      content_html: null,
      toc: toc.length > 0 ? toc : null,
      cover_image: parsedContent.images?.[0] || null,
      cover_alt: parsedContent.title,
      category: null,
      tags: parsedContent.keywords || [],
      author_id: user.id,
      author_name: user.email || 'Admin',
      seo_title: parsedContent.seoTitle || parsedContent.title,
      seo_description: parsedContent.seoDescription || parsedContent.description,
      canonical_url: url || null,
      noindex: false,
      status: status as 'draft' | 'published',
      published_at: status === 'published' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      translation_group_id: randomUUID(),
      parent_post_id: null,
    }

    // Insert into database
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
      .single()

    if (error) {
      console.error('Error creating post:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      post: data,
      message: `Post created successfully as ${status}`,
    })
  } catch (error: any) {
    console.error('Error importing content:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to import content' },
      { status: 500 }
    )
  }
}

