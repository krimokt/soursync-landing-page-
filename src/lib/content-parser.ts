/**
 * Content Parser Service
 * Handles parsing of various content formats and URL scraping
 */

export interface ParsedContent {
  title: string
  description: string
  content: string // MDX format
  seoTitle?: string
  seoDescription?: string
  keywords?: string[]
  language?: string
  images?: string[]
  author?: string
}

export type ContentFormat = 'contentshake' | 'html' | 'markdown' | 'plain-text'

/**
 * Detect content format
 */
export function detectContentFormat(content: string): ContentFormat {
  const trimmed = content.trim()

  // Check for ContentShake format
  if (trimmed.startsWith('ContentShake AI') || trimmed.includes('Title Tag:') || trimmed.includes('Meta Description:')) {
    return 'contentshake'
  }

  // Check for HTML
  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return 'html'
  }

  // Check for Markdown
  if (/^#{1,6}\s|^\*\s|^-\s|^\d+\.\s|\[.*\]\(.*\)/m.test(trimmed)) {
    return 'markdown'
  }

  return 'plain-text'
}

/**
 * Parse ContentShake format
 */
export function parseContentShake(content: string): ParsedContent {
  const lines = content.split(/\r?\n|\r/)
  
  let title = ''
  let seoTitle = ''
  let metaDescription = ''
  let keywords: string[] = []
  let language = 'en'
  let articleStartIndex = -1

  // Parse metadata
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (line.startsWith('Title:')) {
      title = line.replace(/^Title:\s*/, '').trim()
    }

    if (line.startsWith('Title Tag:')) {
      seoTitle = line.replace(/^Title Tag:\s*/, '').trim()
    }

    if (line.startsWith('Meta Description:')) {
      metaDescription = line.replace(/^Meta Description:\s*/, '').trim()
    }

    if (line.startsWith('Keywords:')) {
      const keywordsStr = line.replace(/^Keywords:\s*/, '').trim()
      if (keywordsStr) {
        keywords = keywordsStr.split(',').map(k => k.trim()).filter(k => k.length > 0)
      } else if (i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim()
        if (nextLine && !nextLine.includes(':')) {
          keywords = nextLine.split(',').map(k => k.trim()).filter(k => k.length > 0)
        }
      }
    }

    if (line.startsWith('Language:')) {
      const langStr = line.replace(/^Language:\s*/, '').trim().toLowerCase()
      if (langStr === 'english') language = 'en'
      else if (langStr === 'french') language = 'fr'
      else if (langStr === 'arabic') language = 'ar'
      else if (langStr === 'chinese') language = 'zh'
    }

    if (line === 'Article') {
      articleStartIndex = i + 2
      break
    }
  }

  // Find article start if not found
  if (articleStartIndex === -1) {
    for (let i = 26; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.length > 50 && (line.includes('When it comes to') || (line.includes('Why Use') && line.length > 50))) {
        articleStartIndex = i
        break
      }
    }
  }

  if (articleStartIndex === -1) {
    articleStartIndex = 28
  }

  if (articleStartIndex >= lines.length) {
    throw new Error('Could not find article content start')
  }

  // Convert to MDX
  const mdxContent = convertContentShakeToMDX(lines.slice(articleStartIndex))

  return {
    title: title || seoTitle || 'Untitled Post',
    description: metaDescription || extractFirstParagraph(mdxContent),
    content: mdxContent,
    seoTitle: seoTitle || title,
    seoDescription: metaDescription,
    keywords,
    language,
  }
}

/**
 * Convert ContentShake content to MDX
 */
function convertContentShakeToMDX(lines: string[]): string {
  const mdxLines: string[] = []
  let inSummary = false
  let previousLineWasHeading = false
  let skipNextLine = false

  const mainSections = [
    'What is Alibaba?',
    'What is a Sourcing Agent?',
    'The Advantages of Using a Sourcing Agent',
    'The Drawbacks of Relying Solely on Alibaba',
    'China Sourcing Fees: Sourcing Agent vs. Alibaba',
    'Making the Right Choice for Your Business',
    'Conclusion',
  ]

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

    if (mdxLines.length === 0 && !line) continue

    if (i === 0 && line.includes('Why Use a Sourcing Agent')) {
      continue
    }

    if (line === 'Summary' && i + 1 < lines.length) {
      inSummary = true
      mdxLines.push('')
      mdxLines.push('> **Summary**')
      continue
    }

    if (inSummary) {
      if (mainSections.some(section => line === section)) {
        inSummary = false
        mdxLines.push('')
      } else if (line) {
        mdxLines.push(`> ${line}`)
      }
      continue
    }

    if (!line) {
      if (!previousLineWasHeading && mdxLines.length > 0 && mdxLines[mdxLines.length - 1] !== '') {
        mdxLines.push('')
      }
      previousLineWasHeading = false
      continue
    }

    if (mainSections.includes(line)) {
      if (mdxLines.length > 0 && mdxLines[mdxLines.length - 1] !== '') {
        mdxLines.push('')
      }
      mdxLines.push(`## ${line}`)
      previousLineWasHeading = true
      continue
    }

    if (subsections.includes(line)) {
      if (mdxLines.length > 0 && mdxLines[mdxLines.length - 1] !== '') {
        mdxLines.push('')
      }
      mdxLines.push(`### ${line}`)
      previousLineWasHeading = true
      continue
    }

    if (line.includes('Alibaba platform interface')) {
      mdxLines.push('')
      mdxLines.push('![Alibaba platform interface](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=630&fit=crop)')
      mdxLines.push('')
      line = line.replace(/Alibaba platform interface/g, '').trim()
      if (!line) continue
    }

    if (line.includes('Sourcing agent negotiating in China')) {
      mdxLines.push('')
      mdxLines.push('![Sourcing agent negotiating in China](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=630&fit=crop)')
      mdxLines.push('')
      line = line.replace(/Sourcing agent negotiating in China/g, '').trim()
      if (!line) continue
    }

    if (line === 'Comparing sourcing fees' && i + 1 < lines.length) {
      const nextLine = lines[i + 1].trim()
      if (nextLine.includes('unsplash') || nextLine.includes('by ')) {
        mdxLines.push('')
        mdxLines.push('![Comparing sourcing fees](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=630&fit=crop)')
        mdxLines.push('')
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

    mdxLines.push(line)
    previousLineWasHeading = false
  }

  return mdxLines.join('\n').trim()
}

/**
 * Parse HTML content
 */
export async function parseHTML(html: string, url?: string): Promise<ParsedContent> {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i) || 
                     html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
  const title = titleMatch ? titleMatch[1].trim() : 'Untitled Post'

  // Extract description
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
  const description = metaDescMatch ? metaDescMatch[1].trim() : ''

  // Extract main content
  let content = ''
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
                       html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
                       html.match(/<div[^>]*class=["'][^"']*content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)
  
  if (articleMatch) {
    content = htmlToMDX(articleMatch[1])
  } else {
    // Fallback: extract from body
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
    if (bodyMatch) {
      content = htmlToMDX(bodyMatch[1])
    }
  }

  // Extract images
  const imageMatches = html.matchAll(/<img[^>]*src=["']([^"']+)["']/gi)
  const images: string[] = []
  for (const match of imageMatches) {
    let imgUrl = match[1]
    if (url && !imgUrl.startsWith('http')) {
      try {
        const baseUrl = new URL(url)
        imgUrl = new URL(imgUrl, baseUrl.origin).href
      } catch {
        // Invalid URL, skip
      }
    }
    if (imgUrl.startsWith('http')) {
      images.push(imgUrl)
    }
  }

  return {
    title,
    description: description || extractFirstParagraph(content),
    content: content || 'No content extracted',
    images: images.length > 0 ? images : undefined,
  }
}

/**
 * Convert HTML to MDX
 */
function htmlToMDX(html: string): string {
  let mdx = html
    // Remove scripts and styles
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    // Convert headings
    .replace(/<h1[^>]*>([^<]+)<\/h1>/gi, '\n## $1\n')
    .replace(/<h2[^>]*>([^<]+)<\/h2>/gi, '\n### $1\n')
    .replace(/<h3[^>]*>([^<]+)<\/h3>/gi, '\n#### $1\n')
    // Convert paragraphs
    .replace(/<p[^>]*>([^<]+)<\/p>/gi, '$1\n\n')
    // Convert links
    .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi, '[$2]($1)')
    // Convert images
    .replace(/<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, '![$2]($1)')
    .replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']+)["'][^>]*>/gi, '![$1]($2)')
    .replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, '![]($1)')
    // Convert lists
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<li[^>]*>([^<]+)<\/li>/gi, '- $1\n')
    // Convert strong/bold
    .replace(/<strong[^>]*>([^<]+)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>([^<]+)<\/b>/gi, '**$1**')
    // Convert emphasis/italic
    .replace(/<em[^>]*>([^<]+)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>([^<]+)<\/i>/gi, '*$1*')
    // Remove remaining HTML tags
    .replace(/<[^>]+>/g, '')
    // Clean up whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  return mdx
}

/**
 * Parse plain text content
 */
export function parsePlainText(content: string): ParsedContent {
  const lines = content.split(/\r?\n|\r/).filter(l => l.trim())
  const title = lines[0] || 'Untitled Post'
  const description = lines[1] || extractFirstParagraph(content)
  
  // Convert to basic MDX
  const mdxContent = lines.slice(1).join('\n\n')

  return {
    title: title.length > 100 ? 'Untitled Post' : title,
    description,
    content: mdxContent,
  }
}

/**
 * Parse markdown content
 */
export function parseMarkdown(content: string): ParsedContent {
  const lines = content.split(/\r?\n|\r/)
  const title = lines.find(l => l.match(/^#\s+/))?.replace(/^#\s+/, '').trim() || 'Untitled Post'
  const description = extractFirstParagraph(content)

  return {
    title,
    description,
    content,
  }
}

/**
 * Extract first paragraph for description
 */
function extractFirstParagraph(content: string, maxLength: number = 160): string {
  // Remove markdown formatting
  const plain = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .trim()

  // Get first paragraph
  const firstPara = plain.split(/\n\n/)[0] || plain.split('\n')[0] || plain

  if (firstPara.length <= maxLength) {
    return firstPara
  }

  return firstPara.substring(0, maxLength - 3) + '...'
}

/**
 * Fetch and parse content from URL
 */
export async function fetchAndParseURL(url: string): Promise<ParsedContent> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`)
    }

    const html = await response.text()
    return await parseHTML(html, url)
  } catch (error: any) {
    throw new Error(`Error fetching URL: ${error.message}`)
  }
}

/**
 * Main parse function - auto-detects format and parses
 */
export async function parseContent(
  content: string,
  sourceUrl?: string
): Promise<ParsedContent> {
  const format = detectContentFormat(content)

  switch (format) {
    case 'contentshake':
      return parseContentShake(content)
    case 'html':
      return await parseHTML(content, sourceUrl)
    case 'markdown':
      return parseMarkdown(content)
    case 'plain-text':
      return parsePlainText(content)
    default:
      return parsePlainText(content)
  }
}

