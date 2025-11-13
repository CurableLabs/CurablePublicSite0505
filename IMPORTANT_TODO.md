# 🚨 IMPORTANT TODO: Update About Page Team Members

## Current Situation
The website is now successfully pulling team member data from Supabase! However, you need to review and update the people listed on the About page.

## What You Need To Do

### 1. Review Current Team Members (32 people)
Go to your Supabase Dashboard:
- **URL**: https://ywjpkgtzgyczhpeyloel.supabase.co
- Navigate to: **Table Editor > people**

Current breakdown:
- **3 Founders**
- **8 Team Members** (Core Guardians)
- **20 Advisors**
- **1 Contributor**
- **0 Guardians**

### 2. Update Team Members

You can update the team in two ways:

#### Option A: Directly in Supabase Dashboard (Easy)
1. Go to Supabase Dashboard > Table Editor > people
2. Click on any row to edit
3. Update fields:
   - `name` - Person's full name
   - `role` - Their job title/role
   - `member_group` - 'founder', 'team', 'advisor', 'contributor', or 'guardian'
   - `bio` - Optional biography
   - `gpt_description` - Optional AI-generated description
   - `website` - Optional personal website
   - `avatar_url` - Image URL (already uploaded to Supabase Storage)
4. Save changes

#### Option B: Run the Migration Script Again (If needed)
If you need to completely replace the team data:
1. Update the static files in `src/data/people/` (if they exist)
2. Run: `npx tsx scripts/migrate-to-supabase.ts`

### 3. Add/Remove Team Members

**To Add a New Person:**
1. In Supabase Dashboard, go to Table Editor > people
2. Click "+ Insert row"
3. Fill in the fields
4. For avatar:
   - Upload image to Storage > avatars bucket
   - Copy the public URL
   - Paste into `avatar_url` field

**To Remove a Person:**
1. Find the row in Table Editor
2. Click the trash icon to delete

### 4. Update Avatar Images

If you need to change someone's avatar:
1. Go to Storage > avatars
2. Upload the new image
3. Copy the public URL
4. Update the `avatar_url` field in the people table

---

## Quick Checklist

- [ ] Review all 32 current team members
- [ ] Remove anyone who shouldn't be listed
- [ ] Add any missing team members
- [ ] Update roles/titles if needed
- [ ] Verify avatar images are correct
- [ ] Test the About page after changes

---

## Testing Your Changes

After updating:
1. Visit http://localhost:8080/about
2. Refresh the page (Cmd+R / Ctrl+R)
3. Verify all changes appear correctly
4. Check that stats footer shows correct counts

---

## Notes

- Changes in Supabase are **instant** - just refresh the page to see them
- The site uses React Query which caches data for performance
- If changes don't appear immediately, do a hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
- Avatar images are served from Supabase Storage CDN

---

**Remember to complete this before deploying to production!**
