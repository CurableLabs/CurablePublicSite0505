# Supabase Migration Guide

## Overview
This guide walks you through migrating the Curable Labs public site from static TypeScript data to your NEW Supabase instance.

---

## Step 1: Run SQL Schema Migration

1. **Open Supabase SQL Editor**
   - Go to: https://ywjpkgtzgyczhpeyloel.supabase.co/project/ywjpkgtzgyczhpeyloel/sql
   - Or navigate to: Dashboard > SQL Editor > New Query

2. **Copy and Paste SQL**
   - Open: `supabase/migrations/001_initial_schema.sql`
   - Copy the ENTIRE file contents
   - Paste into the SQL Editor

3. **Execute the Migration**
   - Click "Run" or press `Cmd+Enter` (Mac) / `Ctrl+Enter` (Windows)
   - You should see: "Success. No rows returned"

4. **Verify Tables Were Created**
   - Go to: Database > Tables
   - You should see 7 new tables:
     - `people`
     - `haikus`
     - `core_values`
     - `whitepaper_sections`
     - `key_sections`
     - `tokenomics`
     - `site_content`

---

## Step 2: Create Storage Bucket (Manual)

The SQL script creates the tables, but you need to manually create the storage bucket:

1. **Go to Storage Section**
   - Navigate to: Storage > Create Bucket

2. **Create Bucket**
   - **Name**: `avatars`
   - **Public**: ✅ Checked (public access)
   - **File size limit**: 5MB
   - Click "Create bucket"

3. **Set Storage Policies** (if not auto-created)
   - Go to: Storage > avatars > Policies
   - Add policy: "Public read access" for SELECT operations
   - Add policy: "Authenticated write access" for INSERT/UPDATE/DELETE

---

## Step 3: Run Data Migration Script

Now populate the database with your existing data:

```bash
# Make sure you're in the project root
cd /Users/ilyssaevans/Documents/GitHub/CurablePublicSite0505

# Run the migration script
npx tsx scripts/migrate-to-supabase.ts
```

**Expected Output:**
```
🚀 Starting migration to Supabase...
📍 Target: https://ywjpkgtzgyczhpeyloel.supabase.co

📋 Migrating People...
  ✅ Uploaded: avatar1.jpg
  ✅ Uploaded: avatar2.jpg
  ...
  ✅ Migrated 31 people

🎋 Migrating Haikus...
  ✅ Migrated 6 haikus

💎 Migrating Core Values...
  ✅ Migrated 4 core values

📄 Migrating Whitepaper Sections...
  ✅ Migrated 10 whitepaper sections

🔑 Migrating Key Sections...
  ✅ Migrated 4 key sections

✨ Migration completed successfully!
```

---

## Step 4: Verify Data in Supabase

1. **Check Tables**
   - Go to: Database > Table Editor
   - Click on each table (`people`, `haikus`, etc.)
   - Verify data is present

2. **Check Storage**
   - Go to: Storage > avatars
   - You should see all avatar images uploaded

3. **Test Data Fetching**
   ```bash
   # Test with Supabase API
   curl "https://ywjpkgtzgyczhpeyloel.supabase.co/rest/v1/people?select=*" \
     -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3anBrZ3R6Z3ljemhwZXlsb2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMDY5MjIsImV4cCI6MjA3ODU4MjkyMn0.sLnUiiY-kXoGc8NQO0vP8TInEEYcfhwIUtqGs5ciQW4"
   ```

---

## Troubleshooting

### Error: "Missing Supabase credentials"
- Make sure `.env` file exists and contains:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_SERVICE_ROLE_KEY`

### Error: "relation 'people' does not exist"
- Run the SQL migration script first (Step 1)

### Error: "bucket 'avatars' not found"
- Create the storage bucket manually (Step 2)

### Images not uploading
- Check file paths: `/public/lovable-uploads/`
- Verify storage bucket is public
- Check service role key has storage permissions

### RLS Policy Errors
- Make sure RLS policies are created from the SQL script
- For testing, you can temporarily disable RLS:
  ```sql
  ALTER TABLE people DISABLE ROW LEVEL SECURITY;
  ```

---

## Next Steps

After successful migration:
1. ✅ Update TypeScript types to match new schema
2. ✅ Create React Query hooks for data fetching
3. ✅ Update components to fetch from Supabase
4. ✅ Build admin interface
5. ✅ Test locally
6. ✅ Deploy to Render

---

## Rollback (if needed)

To rollback the migration:

```sql
-- Drop all tables (in order, due to constraints)
DROP TABLE IF EXISTS people CASCADE;
DROP TABLE IF EXISTS haikus CASCADE;
DROP TABLE IF EXISTS core_values CASCADE;
DROP TABLE IF EXISTS whitepaper_sections CASCADE;
DROP TABLE IF EXISTS key_sections CASCADE;
DROP TABLE IF EXISTS tokenomics CASCADE;
DROP TABLE IF EXISTS site_content CASCADE;
```

Then delete the `avatars` storage bucket from the Supabase Dashboard.
