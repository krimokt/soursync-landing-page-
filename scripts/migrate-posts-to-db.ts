/**
 * Migration script to move MDX blog posts to Supabase database
 * 
 * Usage: npx tsx scripts/migrate-posts-to-db.ts
 */

import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import matter from 'gray-matter'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  cover?: string
}

/**
 * Extract table of contents from MDX content
 */
function extractTOC(content: string): Array<{ id: string; text: string; level: number }> {
  const toc: Array<{ id: string; text: string; level: number }> = []
  const lines = content.split('\n')
  
  for (const line of lines) {
    // Match markdown headings (# ## ###)
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const text = headingMatch[2].trim()
      // Generate ID from text (simple slug)
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      
      toc.push({ id, text, level })
    }
  }
  
  return toc
}

/**
 * Generate slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Migrate a single MDX file to the database
 */
async function migratePost(fileName: string): Promise<void> {
  const filePath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const frontmatter = data as PostFrontmatter
  
  // Generate slug from filename (remove .mdx extension)
  const slug = fileName.replace(/\.mdx$/, '')
  
  // Extract TOC
  const toc = extractTOC(content)
  
  // Generate translation group ID (one per post for now)
  const translationGroupId = randomUUID()
  
  // Parse date
  const publishedAt = frontmatter.date ? new Date(frontmatter.date).toISOString() : new Date().toISOString()
  
  // Default author (you can update this)
  const authorName = 'SourSync Team'
  
  const postData = {
    slug,
    language: 'en', // Default to English for existing posts
    title: frontmatter.title,
    description: frontmatter.description,
    content_mdx: content,
    content_html: null, // Will be rendered on first publish
    toc: toc.length > 0 ? toc : null,
    cover_image: frontmatter.cover || null,
    cover_alt: null, // Can be added later
    category: null, // Can be added later
    tags: frontmatter.tags || [],
    author_id: null, // Can be set later if you have user IDs
    author_name: authorName,
    seo_title: null,
    seo_description: null,
    canonical_url: null,
    noindex: false,
    status: 'published',
    published_at: publishedAt,
    translation_group_id: translationGroupId,
    parent_post_id: null,
  }
  
  try {
    const { data: insertedPost, error } = await supabase
      .from('posts')
      .insert(postData)
      .select()
      .single()
    
    if (error) {
      console.error(`Error migrating ${fileName}:`, error.message)
      throw error
    }
    
    console.log(`✓ Migrated: ${frontmatter.title} (${slug})`)
    return insertedPost
  } catch (error: any) {
    console.error(`✗ Failed to migrate ${fileName}:`, error.message)
    throw error
  }
}

/**
 * Main migration function
 */
async function migrateAllPosts() {
  console.log('Starting blog post migration...\n')
  
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.error(`Posts directory not found: ${postsDirectory}`)
    process.exit(1)
  }
  
  // Get all MDX files
  const files = fs.readdirSync(postsDirectory)
  const mdxFiles = files.filter(file => file.endsWith('.mdx'))
  
  if (mdxFiles.length === 0) {
    console.log('No MDX files found to migrate')
    return
  }
  
  console.log(`Found ${mdxFiles.length} MDX file(s) to migrate\n`)
  
  const results = {
    success: 0,
    failed: 0,
    errors: [] as Array<{ file: string; error: string }>,
  }
  
  // Migrate each file
  for (const file of mdxFiles) {
    try {
      await migratePost(file)
      results.success++
    } catch (error: any) {
      results.failed++
      results.errors.push({
        file,
        error: error.message,
      })
    }
  }
  
  // Print summary
  console.log('\n' + '='.repeat(50))
  console.log('Migration Summary')
  console.log('='.repeat(50))
  console.log(`✓ Successfully migrated: ${results.success}`)
  console.log(`✗ Failed: ${results.failed}`)
  
  if (results.errors.length > 0) {
    console.log('\nErrors:')
    results.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`)
    })
  }
  
  console.log('\nMigration complete!')
}

// Run migration
if (require.main === module) {
  migrateAllPosts()
    .then(() => {
      process.exit(0)
    })
    .catch((error) => {
      console.error('Migration failed:', error)
      process.exit(1)
    })
}

export { migrateAllPosts }

