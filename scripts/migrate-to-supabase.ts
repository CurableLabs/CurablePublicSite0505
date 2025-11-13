/**
 * Migration Script: Static Data to Supabase
 *
 * This script migrates all static TypeScript data to the NEW Supabase instance:
 * - People (team, advisors, founders)
 * - Haikus
 * - Core Values
 * - Whitepaper Sections
 * - Key Sections
 * - Avatar Images to Supabase Storage
 *
 * Run with: npx tsx scripts/migrate-to-supabase.ts
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

// Import static data
import { founders } from '../src/data/people/founders';
import { team } from '../src/data/people/team';
import { advisors } from '../src/data/people/advisors';
import { guardians } from '../src/data/people/guardians';
import { haikus } from '../src/data/haikus';
import { values } from '../src/data/values';
import { sections as whitepaperSections } from '../src/data/whitepaperSections';
import { keyCards } from '../src/data/keySections';

// Initialize Supabase client with service role key (has admin privileges)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('Required: VITE_SUPABASE_URL, VITE_SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function clearTable(tableName: string) {
  console.log(`🗑️  Clearing table: ${tableName}`);
  const { error } = await supabase.from(tableName).delete().neq('id', 0);
  if (error) {
    console.error(`Error clearing ${tableName}:`, error.message);
  }
}

async function uploadImage(filePath: string, storagePath: string): Promise<string | null> {
  try {
    const imageBuffer = readFileSync(filePath);
    const fileName = storagePath.split('/').pop() || 'unknown';

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(storagePath, imageBuffer, {
        contentType: 'image/jpeg', // Adjust based on actual file type
        upsert: true
      });

    if (error) {
      console.error(`  ❌ Failed to upload ${fileName}:`, error.message);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(storagePath);

    console.log(`  ✅ Uploaded: ${fileName}`);
    return urlData.publicUrl;
  } catch (err) {
    console.error(`  ❌ Error reading file ${filePath}:`, err);
    return null;
  }
}

// ============================================================================
// MIGRATION FUNCTIONS
// ============================================================================

async function migratePeople() {
  console.log('\n📋 Migrating People...');

  // Combine all people data
  const allPeople = [
    ...founders.map(p => ({ ...p, group: 'founder' as const })),
    ...team.map(p => ({ ...p, group: 'team' as const })),
    ...advisors.map(p => ({ ...p, group: 'advisor' as const })),
    ...guardians.map(p => ({ ...p, group: 'guardian' as const }))
  ];

  console.log(`  Total people to migrate: ${allPeople.length}`);

  // Create storage bucket if it doesn't exist
  console.log('  Creating avatars storage bucket...');
  const { error: bucketError } = await supabase.storage.createBucket('avatars', {
    public: true,
    fileSizeLimit: 5242880, // 5MB
  });

  if (bucketError && !bucketError.message.includes('already exists')) {
    console.error('  ⚠️  Bucket creation error:', bucketError.message);
  } else {
    console.log('  ✅ Avatars bucket ready');
  }

  // Upload images and prepare data
  const peopleData = [];
  for (const person of allPeople) {
    let avatarUrl = null;

    // Upload avatar image if it exists
    if (person.avatar) {
      const localPath = join(process.cwd(), 'public', person.avatar);
      if (existsSync(localPath)) {
        const storagePath = person.avatar.replace('lovable-uploads/', '');
        avatarUrl = await uploadImage(localPath, storagePath);
      } else {
        console.log(`  ⚠️  Image not found: ${localPath}`);
      }
    }

    peopleData.push({
      id: person.id,
      name: person.name,
      role: person.role,
      avatar_url: avatarUrl || person.avatar,
      member_group: person.group,
      gpt_description: person.gptDescription || null,
      bio: person.bio || null,
      website: person.website || null,
      display_order: person.id
    });
  }

  // Insert into database
  const { data, error } = await supabase
    .from('people')
    .insert(peopleData)
    .select();

  if (error) {
    console.error('❌ Error inserting people:', error.message);
  } else {
    console.log(`✅ Migrated ${data?.length || 0} people`);
  }
}

async function migrateHaikus() {
  console.log('\n🎋 Migrating Haikus...');

  const haikusData = haikus.map((haiku, index) => ({
    id: haiku.id,
    line1: haiku.lines[0],
    line2: haiku.lines[1],
    line3: haiku.lines[2],
    theme: haiku.theme,
    category: haiku.category,
    display_order: index + 1
  }));

  const { data, error } = await supabase
    .from('haikus')
    .insert(haikusData)
    .select();

  if (error) {
    console.error('❌ Error inserting haikus:', error.message);
  } else {
    console.log(`✅ Migrated ${data?.length || 0} haikus`);
  }
}

async function migrateCoreValues() {
  console.log('\n💎 Migrating Core Values...');

  const valuesData = values.map((value, index) => ({
    id: value.id,
    title: value.title,
    description: value.description,
    icon: value.icon,
    display_order: index + 1
  }));

  const { data, error } = await supabase
    .from('core_values')
    .insert(valuesData)
    .select();

  if (error) {
    console.error('❌ Error inserting core values:', error.message);
  } else {
    console.log(`✅ Migrated ${data?.length || 0} core values`);
  }
}

async function migrateWhitepaperSections() {
  console.log('\n📄 Migrating Whitepaper Sections...');

  const sectionsData = whitepaperSections.map((section, index) => ({
    title: section.title,
    body: section.body,
    display_order: index + 1
  }));

  const { data, error } = await supabase
    .from('whitepaper_sections')
    .insert(sectionsData)
    .select();

  if (error) {
    console.error('❌ Error inserting whitepaper sections:', error.message);
  } else {
    console.log(`✅ Migrated ${data?.length || 0} whitepaper sections`);
  }
}

async function migrateKeySections() {
  console.log('\n🔑 Migrating Key Sections...');

  const keySectionsData = keyCards.map((section, index) => ({
    heading: section.heading,
    sub: section.sub,
    display_order: index + 1
  }));

  const { data, error } = await supabase
    .from('key_sections')
    .insert(keySectionsData)
    .select();

  if (error) {
    console.error('❌ Error inserting key sections:', error.message);
  } else {
    console.log(`✅ Migrated ${data?.length || 0} key sections`);
  }
}

// ============================================================================
// MAIN MIGRATION
// ============================================================================

async function runMigration() {
  console.log('🚀 Starting migration to Supabase...');
  console.log(`📍 Target: ${SUPABASE_URL}\n`);

  try {
    // Optional: Clear existing data (uncomment if you want to start fresh)
    // await clearTable('people');
    // await clearTable('haikus');
    // await clearTable('core_values');
    // await clearTable('whitepaper_sections');
    // await clearTable('key_sections');

    // Run migrations
    await migratePeople();
    await migrateHaikus();
    await migrateCoreValues();
    await migrateWhitepaperSections();
    await migrateKeySections();

    console.log('\n✨ Migration completed successfully!');
    console.log('\n📊 Summary:');
    console.log('  - People: Founders, Team, Advisors, Guardians');
    console.log('  - Haikus: Poetry content');
    console.log('  - Core Values: Company values');
    console.log('  - Whitepaper: Full whitepaper sections');
    console.log('  - Key Sections: Homepage feature cards');
    console.log('\n🎉 Your data is now in Supabase!');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
runMigration();
