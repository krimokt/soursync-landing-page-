# Automated Blog Post Import System

## Overview
Create a system that allows automatic blog post creation from:
1. **Pasted Content** - Paste ContentShake format or plain text content
2. **URL Import** - Provide a URL, system fetches and parses content
3. **Quick Paste Interface** - Simple UI for pasting and auto-creating posts

## Implementation Steps

### 1. Create Quick Import Page
Create `/admin/blog/quick-import` page with:
- Text area for pasting content
- URL input field for importing from links
- Auto-detect content format (ContentShake, plain text, HTML)
- Preview of parsed content before publishing
- Options: Save as draft or publish immediately

### 2. Create Import API Endpoint
Create `/api/admin/blog/import` that:
- Accepts raw content or URL
- Parses ContentShake format (reuse existing parser)
- Scrapes content from URLs (using fetch + HTML parsing)
- Extracts metadata (title, description, images)
- Converts to MDX format
- Creates blog post in database
- Returns created post ID

### 3. URL Content Scraper
Create utility function to:
- Fetch HTML from URL
- Extract article content (using common patterns)
- Extract title, description, images
- Convert HTML to MDX
- Handle different content sources (Medium, WordPress, etc.)

### 4. Content Parser Service
Create service that:
- Detects content format automatically
- Parses ContentShake format
- Parses plain text
- Parses HTML/Markdown
- Extracts images and converts to MDX format
- Generates SEO metadata if missing

### 5. Enhanced Blog Editor Integration
Update blog editor to:
- Add "Quick Import" button
- Support pasting ContentShake format directly
- Auto-populate fields from pasted content
- Show import preview before saving

## Files to Create/Modify

1. **`src/app/admin/blog/quick-import/page.tsx`** (new)
   - Quick import UI page

2. **`src/components/admin/quick-import-form.tsx`** (new)
   - Form component for pasting content or URLs

3. **`src/app/api/admin/blog/import/route.ts`** (new)
   - API endpoint for importing content

4. **`src/lib/content-parser.ts`** (new)
   - Content parsing utilities
   - Format detection
   - ContentShake parser (reuse from script)
   - URL scraper
   - HTML to MDX converter

5. **`src/components/admin/blog-editor.tsx`** (modify)
   - Add quick import functionality

## Technical Details

### Content Format Detection
- Check for ContentShake format (starts with "ContentShake AI")
- Check for HTML tags
- Check for Markdown syntax
- Default to plain text

### URL Scraping Strategy
- Use fetch to get HTML
- Parse with regex or simple HTML parser
- Extract:
  - Title from `<title>` or `<h1>`
  - Description from meta tags or first paragraph
  - Content from `<article>`, `<main>`, or common content selectors
  - Images from `<img>` tags
- Convert HTML to MDX (strip scripts, clean formatting)

### Auto-Metadata Generation
- Generate slug from title
- Extract keywords from content (simple keyword extraction)
- Generate description from first paragraph if missing
- Set default category based on content analysis

## Success Criteria
- User can paste ContentShake format and create post with one click
- User can paste URL and system fetches and creates post
- User can paste plain text and system creates formatted post
- All imports create valid MDX content
- Posts are created with proper metadata
- Preview shows before publishing

## Future Enhancements
- Support for multiple content sources (Medium, WordPress, Substack)
- AI-powered content enhancement
- Automatic image optimization
- Bulk import from multiple URLs
- Scheduled imports
- Content validation and quality checks

