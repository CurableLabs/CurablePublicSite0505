-- Curable Labs Public Site Database Schema Migration
-- Run this in your Supabase SQL Editor: https://ywjpkgtzgyczhpeyloel.supabase.co

-- ============================================================================
-- 1. PEOPLE TABLE (Team Members, Advisors, Founders)
-- ============================================================================
CREATE TABLE IF NOT EXISTS people (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar_url TEXT,
  member_group TEXT NOT NULL CHECK (member_group IN ('team', 'advisor', 'founder', 'contributor', 'guardian')),
  gpt_description TEXT,
  bio TEXT,
  website TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for filtering by group
CREATE INDEX idx_people_group ON people(member_group);
CREATE INDEX idx_people_display_order ON people(display_order);

-- ============================================================================
-- 2. HAIKUS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS haikus (
  id BIGSERIAL PRIMARY KEY,
  line1 TEXT NOT NULL,
  line2 TEXT NOT NULL,
  line3 TEXT NOT NULL,
  theme TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('philosophy', 'science', 'healing', 'technology', 'nature')),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_haikus_category ON haikus(category);
CREATE INDEX idx_haikus_display_order ON haikus(display_order);

-- ============================================================================
-- 3. CORE VALUES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS core_values (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_core_values_display_order ON core_values(display_order);

-- ============================================================================
-- 4. WHITEPAPER SECTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS whitepaper_sections (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_whitepaper_sections_display_order ON whitepaper_sections(display_order);

-- ============================================================================
-- 5. KEY SECTIONS TABLE (Homepage Feature Cards)
-- ============================================================================
CREATE TABLE IF NOT EXISTS key_sections (
  id BIGSERIAL PRIMARY KEY,
  heading TEXT NOT NULL,
  sub TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_key_sections_display_order ON key_sections(display_order);

-- ============================================================================
-- 6. TOKENOMICS TABLE (Token Allocation Data)
-- ============================================================================
CREATE TABLE IF NOT EXISTS tokenomics (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  allocation_percentage DECIMAL(5,2) NOT NULL,
  vesting_details TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tokenomics_display_order ON tokenomics(display_order);

-- ============================================================================
-- 7. MISSION & COPY CONTENT TABLE (For mission statement, token copy, etc.)
-- ============================================================================
CREATE TABLE IF NOT EXISTS site_content (
  id BIGSERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_site_content_key ON site_content(key);

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE haikus ENABLE ROW LEVEL SECURITY;
ALTER TABLE core_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE whitepaper_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE tokenomics ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access" ON people FOR SELECT USING (true);
CREATE POLICY "Public read access" ON haikus FOR SELECT USING (true);
CREATE POLICY "Public read access" ON core_values FOR SELECT USING (true);
CREATE POLICY "Public read access" ON whitepaper_sections FOR SELECT USING (true);
CREATE POLICY "Public read access" ON key_sections FOR SELECT USING (true);
CREATE POLICY "Public read access" ON tokenomics FOR SELECT USING (true);
CREATE POLICY "Public read access" ON site_content FOR SELECT USING (true);

-- Admin write access (authenticated users with admin role)
-- Note: You'll need to set up Supabase Auth and assign admin roles
CREATE POLICY "Admin write access" ON people FOR ALL USING (
  auth.role() = 'authenticated'
  AND auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "Admin write access" ON haikus FOR ALL USING (
  auth.role() = 'authenticated'
  AND auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "Admin write access" ON core_values FOR ALL USING (
  auth.role() = 'authenticated'
  AND auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "Admin write access" ON whitepaper_sections FOR ALL USING (
  auth.role() = 'authenticated'
  AND auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "Admin write access" ON key_sections FOR ALL USING (
  auth.role() = 'authenticated'
  AND auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "Admin write access" ON tokenomics FOR ALL USING (
  auth.role() = 'authenticated'
  AND auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "Admin write access" ON site_content FOR ALL USING (
  auth.role() = 'authenticated'
  AND auth.jwt() ->> 'role' = 'admin'
);

-- ============================================================================
-- 9. UPDATED_AT TRIGGER FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_people_updated_at BEFORE UPDATE ON people
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_haikus_updated_at BEFORE UPDATE ON haikus
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_core_values_updated_at BEFORE UPDATE ON core_values
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_whitepaper_sections_updated_at BEFORE UPDATE ON whitepaper_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_key_sections_updated_at BEFORE UPDATE ON key_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tokenomics_updated_at BEFORE UPDATE ON tokenomics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 10. STORAGE BUCKET FOR AVATARS (Run separately in Storage section)
-- ============================================================================
-- Go to Storage > Create Bucket in Supabase Dashboard
-- Bucket name: avatars
-- Public: true
-- Or run this SQL after creating the bucket manually:

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('avatars', 'avatars', true)
-- ON CONFLICT (id) DO NOTHING;

-- -- Set up storage policies for public read
-- CREATE POLICY "Public read access" ON storage.objects FOR SELECT
-- USING (bucket_id = 'avatars');

-- -- Admin write access to storage
-- CREATE POLICY "Admin write access" ON storage.objects FOR ALL
-- USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
-- Next steps:
-- 1. Run the migration script in the data directory to populate tables
-- 2. Upload avatar images to Supabase Storage
-- 3. Update TypeScript types to match this schema
