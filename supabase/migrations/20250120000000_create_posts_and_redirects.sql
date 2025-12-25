-- Create posts table for blog CMS
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  title text NOT NULL,
  description text NOT NULL,
  content_mdx text NOT NULL, -- Raw MDX source
  content_html text, -- Rendered HTML cache (nullable, populated on publish)
  toc jsonb, -- Table of contents (optional)
  cover_image text,
  cover_alt text,
  category text, -- Simple text for MVP (can normalize later)
  tags text[] DEFAULT '{}',
  author_id uuid REFERENCES auth.users(id),
  author_name text NOT NULL, -- Denormalized for performance
  seo_title text, -- Overrides title for SEO
  seo_description text, -- Overrides description
  canonical_url text, -- Custom canonical (usually null, uses default)
  noindex boolean DEFAULT false,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamp,
  updated_at timestamp DEFAULT now(),
  created_at timestamp DEFAULT now(),
  translation_group_id uuid, -- Groups all translations together
  parent_post_id uuid REFERENCES posts(id), -- Original post for translations
  
  -- Constraints
  UNIQUE(language, slug), -- Critical: slug unique per language
  CHECK (language IN ('en', 'fr', 'ar', 'zh'))
);

-- Create redirects table (separate from posts)
CREATE TABLE redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path text NOT NULL UNIQUE, -- e.g., '/blog/old-slug'
  to_path text NOT NULL, -- e.g., '/blog/en/new-slug'
  status_code int DEFAULT 308 CHECK (status_code IN (301, 302, 307, 308)),
  created_at timestamp DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_posts_status_published ON posts(status, published_at) WHERE status = 'published';
CREATE INDEX idx_posts_language_parent ON posts(language, parent_post_id);
CREATE INDEX idx_posts_translation_group ON posts(translation_group_id);
CREATE INDEX idx_posts_category ON posts(category) WHERE category IS NOT NULL;
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
CREATE INDEX idx_posts_published_lang ON posts(language, published_at) WHERE status = 'published' AND noindex = false;
CREATE INDEX idx_redirects_from_path ON redirects(from_path);

-- Function to check if user is admin
-- This function checks against the admin email allowlist
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_email text;
BEGIN
  -- Get current user's email
  SELECT email INTO user_email
  FROM auth.users
  WHERE id = auth.uid();
  
  -- Check if email is in admin allowlist
  -- Update this list to match your admin emails
  RETURN user_email IN (
    'groupechannel@gmail.com'
    -- Add more admin emails here as needed
  );
END;
$$;

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;

-- Posts: Everyone can read published posts (noindex doesn't affect access, only meta)
CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT
  USING (status = 'published');

-- Posts: Only admins can insert/update/delete
CREATE POLICY "Admins can manage posts"
  ON posts FOR ALL
  USING (is_admin_user());

-- Redirects: Public read, admin write
CREATE POLICY "Public can read redirects"
  ON redirects FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage redirects"
  ON redirects FOR ALL
  USING (is_admin_user());

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

