/**
 * Import ContentShake AI article format to Supabase blog database
 * 
 * Usage: npx tsx scripts/import-contentshake-article.ts [path-to-blog.txt]
 */

import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: path.join(process.cwd(), '.env.local') })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface ParsedArticle {
  title: string
  seoTitle: string
  metaDescription: string
  keywords: string[]
  language: string
  content: string
  slug: string
}

/**
 * Generate slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100) // Limit length
}

/**
 * Parse ContentShake AI format from text file
 */
function parseContentShakeArticle(filePath: string): ParsedArticle {
  const content = fs.readFileSync(filePath, 'utf8')
  
  if (!content || content.trim().length === 0) {
    throw new Error('File is empty or could not be read')
  }
  
  // Handle different line endings (Windows \r\n, Mac \r, Unix \n)
  let lines = content.split(/\r?\n|\r/).map(l => l.trim())
  
  // Filter out completely empty lines but keep the structure
  // Actually, let's keep all lines to preserve structure
  lines = content.split(/\r?\n|\r/)

  let title = ''
  let seoTitle = ''
  let metaDescription = ''
  let keywords: string[] = []
  let language = 'en'
  let articleStartIndex = -1

  // Parse metadata
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Extract title
    if (line.startsWith('Title:')) {
      title = line.replace(/^Title:\s*/, '').trim()
    }

    // Extract SEO title tag
    if (line.startsWith('Title Tag:')) {
      seoTitle = line.replace(/^Title Tag:\s*/, '').trim()
    }

    // Extract meta description
    if (line.startsWith('Meta Description:')) {
      metaDescription = line.replace(/^Meta Description:\s*/, '').trim()
    }

    // Extract keywords - handle case where keywords are on next line
    if (line.startsWith('Keywords:')) {
      const keywordsStr = line.replace(/^Keywords:\s*/, '').trim()
      if (keywordsStr) {
        keywords = keywordsStr
          .split(',')
          .map(k => k.trim())
          .filter(k => k.length > 0)
      } else if (i + 1 < lines.length) {
        // Keywords might be on the next line
        const nextLine = lines[i + 1].trim()
        if (nextLine && !nextLine.includes(':')) {
          keywords = nextLine
            .split(',')
            .map(k => k.trim())
            .filter(k => k.length > 0)
        }
      }
    }

    // Extract language
    if (line.startsWith('Language:')) {
      const langStr = line.replace(/^Language:\s*/, '').trim().toLowerCase()
      if (langStr === 'english') language = 'en'
      else if (langStr === 'french') language = 'fr'
      else if (langStr === 'arabic') language = 'ar'
      else if (langStr === 'chinese') language = 'zh'
    }

      // Find where article content starts - look for "Article" section
    if (line === 'Article') {
      // Article content starts after "Additional requirements from the customer." line
      // which is typically 2 lines after "Article"
      articleStartIndex = i + 2
      break
    }
  }

  // If article start not found, look for the first substantial content after metadata (around line 28)
  if (articleStartIndex === -1) {
    for (let i = 26; i < Math.min(lines.length, 35); i++) {
      const line = lines[i].trim()
      // Look for the article title or first substantial paragraph
      if (line.length > 50 && (line.includes('When it comes to') || (line.includes('Why Use') && line.length > 50))) {
        articleStartIndex = i
        break
      }
    }
  }

  // Final fallback: start from line 28 (where content typically begins)
  if (articleStartIndex === -1) {
    articleStartIndex = 28
  }

  if (articleStartIndex >= lines.length) {
    throw new Error(`Article start index ${articleStartIndex} is beyond file length ${lines.length}`)
  }

  // Extract article content
  const articleLines = lines.slice(articleStartIndex)
  const articleContent = convertToMDX(articleLines)

  // Generate slug
  const slug = generateSlug(title || seoTitle)

  return {
    title: title || seoTitle,
    seoTitle: seoTitle || title,
    metaDescription,
    keywords,
    language,
    content: articleContent,
    slug,
  }
}

/**
 * Convert plain text article to MDX format
 */
function convertToMDX(lines: string[]): string {
  const mdxLines: string[] = []
  let inSummary = false
  let previousLineWasHeading = false
  let skipNextLine = false

  // Known main section headings
  const mainSections = [
    'What is Alibaba?',
    'What is a Sourcing Agent?',
    'The Advantages of Using a Sourcing Agent',
    'The Drawbacks of Relying Solely on Alibaba',
    'China Sourcing Fees: Sourcing Agent vs. Alibaba',
    'Making the Right Choice for Your Business',
    'Conclusion',
  ]

  // Known subsection headings
  const subsections = [
    'The Scale of Alibaba',
    "Alibaba's Role in Global Trade",
    'Search and Verification on Alibaba',
    'The Role of Sourcing Agents',
    'Expertise and Network',
    'Risk Mitigation',
    'Personalized Service',
    'Tailored Supplier Selection',
    'Direct Communication',
    'Ongoing Relationship Building',
    'Expertise and Local Knowledge',
    'Navigating Cultural Nuances',
    'Market Insights',
    'Compliance and Regulations',
    'Quality Control',
    'Pre-Production Inspections',
    'In-Process Quality Checks',
    'Final Product Inspections',
    'Time and Cost Efficiency',
    'Streamlined Supplier Research',
    'Negotiation and Pricing',
    'Logistics and Coordination',
    'Language Barriers',
    'Misinterpretation of Specifications',
    'Negotiation Challenges',
    'Cultural Differences',
    'Scams and Fraud',
    'Identifying Legitimate Suppliers',
    'Payment Security',
    'Due Diligence',
    'Lack of Customization',
    'Custom Product Development',
    'Brand Alignment',
    'Prototype and Sampling',
    'Understanding the Costs',
    'Comprehensive Cost Analysis',
    'Hidden Costs',
    'Value for Money',
    'Sourcing Agent Fees',
    'Fee Structures',
    'Transparency in Costs',
    'Return on Investment',
    'Alibaba Costs',
    'Platform Fees',
    'Potential Middlemen',
    'Risk of Additional Costs',
    'Factors to Consider',
    'Assessing Your Needs',
    'Evaluating the Trade-Offs',
    'Long-Term Strategy',
  ]

  for (let i = 0; i < lines.length; i++) {
    if (skipNextLine) {
      skipNextLine = false
      continue
    }

    let line = lines[i].trim()

    // Skip empty lines at the start
    if (mdxLines.length === 0 && !line) continue

    // Skip the first line if it's a duplicate title
    if (i === 0 && line.includes('Why Use a Sourcing Agent')) {
      continue
    }

    // Handle Summary section as blockquote
    if (line === 'Summary' && i + 1 < lines.length) {
      inSummary = true
      mdxLines.push('')
      mdxLines.push('> **Summary**')
      continue
    }

    // End summary blockquote when we hit the next main section
    if (inSummary) {
      if (mainSections.some(section => line === section)) {
        inSummary = false
        mdxLines.push('')
      } else if (line) {
        mdxLines.push(`> ${line}`)
      }
      continue
    }

    // Skip empty lines
    if (!line) {
      if (!previousLineWasHeading && mdxLines.length > 0 && mdxLines[mdxLines.length - 1] !== '') {
        mdxLines.push('')
      }
      previousLineWasHeading = false
      continue
    }

    // Check if it's a main section heading
    if (mainSections.includes(line)) {
      if (mdxLines.length > 0 && mdxLines[mdxLines.length - 1] !== '') {
        mdxLines.push('')
      }
      mdxLines.push(`## ${line}`)
      previousLineWasHeading = true
      continue
    }

    // Check if it's a subsection heading
    if (subsections.includes(line)) {
      if (mdxLines.length > 0 && mdxLines[mdxLines.length - 1] !== '') {
        mdxLines.push('')
      }
      mdxLines.push(`### ${line}`)
      previousLineWasHeading = true
      continue
    }

    // Handle image references in text
    if (line.includes('Alibaba platform interface')) {
      mdxLines.push('')
      mdxLines.push('![Alibaba platform interface](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=630&fit=crop)')
      mdxLines.push('')
      // Remove the image reference from the line
      line = line.replace(/Alibaba platform interface/g, '').trim()
      if (!line) continue
    }

    if (line.includes('Sourcing agent negotiating in China')) {
      mdxLines.push('')
      mdxLines.push('![Sourcing agent negotiating in China](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=630&fit=crop)')
      mdxLines.push('')
      // Remove the image reference from the line
      line = line.replace(/Sourcing agent negotiating in China/g, '').trim()
      if (!line) continue
    }

    // Handle "Comparing sourcing fees" section with image
    if (line === 'Comparing sourcing fees' && i + 1 < lines.length) {
      const nextLine = lines[i + 1].trim()
      if (nextLine.includes('unsplash') || nextLine.includes('by ')) {
        mdxLines.push('')
        mdxLines.push('![Comparing sourcing fees](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=630&fit=crop)')
        mdxLines.push('')
        // Extract photographer attribution
        if (nextLine.includes('by ') && nextLine.includes('@')) {
          const match = nextLine.match(/by\s+([^(]+)\s*\(([^)]+)\)/)
          if (match) {
            const photographer = match[1].trim()
            const url = match[2].trim()
            mdxLines.push(`*Photo by [${photographer}](${url}) on Unsplash*`)
            mdxLines.push('')
            skipNextLine = true
          }
        }
        continue
      }
    }

    // Handle Unsplash attribution standalone
    if (line.includes('unsplash.com') || (line.includes('by ') && line.includes('@'))) {
      const match = line.match(/by\s+([^(]+)\s*\(([^)]+)\)/)
      if (match) {
        const photographer = match[1].trim()
        const url = match[2].trim()
        mdxLines.push('')
        mdxLines.push(`*Photo by [${photographer}](${url}) on Unsplash*`)
        mdxLines.push('')
      }
      continue
    }

    // Regular paragraph
    mdxLines.push(line)
    previousLineWasHeading = false
  }

  return mdxLines.join('\n').trim()
}

/**
 * Extract table of contents from MDX content
 */
function extractTOC(content: string): Array<{ id: string; text: string; level: number }> {
  const toc: Array<{ id: string; text: string; level: number }> = []
  const lines = content.split('\n')
  
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
  
  return toc
}

/**
 * Main import function
 */
async function importArticle(filePath: string): Promise<void> {
  console.log(`\n📖 Parsing ContentShake article from: ${filePath}\n`)

  try {
    // Parse the article
    const article = parseContentShakeArticle(filePath)
    
    console.log('✅ Parsed article metadata:')
    console.log(`   Title: ${article.title}`)
    console.log(`   SEO Title: ${article.seoTitle}`)
    console.log(`   Language: ${article.language}`)
    console.log(`   Slug: ${article.slug}`)
    console.log(`   Tags: ${article.keywords.join(', ')}`)
    console.log(`   Description: ${article.metaDescription.substring(0, 80)}...`)

    // Check for existing post with same slug
    const { data: existing } = await supabase
      .from('posts')
      .select('id, slug')
      .eq('slug', article.slug)
      .eq('language', article.language)
      .single()

    if (existing) {
      console.log(`\n⚠️  Post with slug "${article.slug}" already exists.`)
      console.log('   Use a different title or delete the existing post first.')
      return
    }

    // Extract TOC
    const toc = extractTOC(article.content)

    // Generate translation group ID
    const translationGroupId = randomUUID()

    // Prepare post data
    const postData = {
      slug: article.slug,
      language: article.language,
      title: article.title,
      description: article.metaDescription,
      content_mdx: article.content,
      content_html: null, // Will be generated on first render
      toc: toc.length > 0 ? toc : null,
      cover_image: null,
      cover_alt: null,
      category: null,
      tags: article.keywords,
      author_name: 'SourSync Team',
      seo_title: article.seoTitle,
      seo_description: article.metaDescription,
      canonical_url: null,
      noindex: false,
      status: 'published' as const,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      translation_group_id: translationGroupId,
      parent_post_id: null,
    }

    console.log('\n💾 Inserting into database...')

    // Insert into database
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
      .single()

    if (error) {
      throw error
    }

    console.log('\n✅ Successfully imported article!')
    console.log(`   Post ID: ${data.id}`)
    console.log(`   View at: /blog/${article.language}/${article.slug}`)
    console.log(`   Admin: /admin/blog/${data.id}/edit`)

  } catch (error: any) {
    console.error('\n❌ Error importing article:')
    console.error(error.message)
    if (error.details) {
      console.error('Details:', error.details)
    }
    process.exit(1)
  }
}

// Main execution
const filePath = process.argv[2] || path.join(process.cwd(), 'blog.txt')

if (!fs.existsSync(filePath)) {
  console.error(`❌ File not found: ${filePath}`)
  process.exit(1)
}

importArticle(filePath)

