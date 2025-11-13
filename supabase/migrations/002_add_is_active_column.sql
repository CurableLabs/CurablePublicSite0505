-- Add is_active column to people table
-- This allows hiding team members without deleting their data

ALTER TABLE people
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Create index for filtering active members
CREATE INDEX IF NOT EXISTS idx_people_is_active ON people(is_active);

-- Set specific people to inactive (hidden from About page)
UPDATE people SET is_active = false
WHERE name ILIKE '%Aguda%'
   OR name ILIKE '%Israel%'
   OR name ILIKE '%Ayodele%'
   OR name ILIKE '%Godfather%'
   OR name ILIKE '%Apollo%'
   OR name ILIKE '%Alwreonzivic%'
   OR name ILIKE '%Dr. Scott%'
   OR name ILIKE '%Dr Scott%'
   OR name ILIKE '%Amit%'
   OR name ILIKE '%Derrick%'
   OR name ILIKE '%Yuri%'
   OR name ILIKE '%Dr. Murtaza%'
   OR name ILIKE '%Dr Murtaza%'
   OR name ILIKE '%Emmanuel%'
   OR name ILIKE '%HEYEAH%'
   OR name ILIKE '%GlitterUnicorn%'
   OR name ILIKE '%Grace%';
