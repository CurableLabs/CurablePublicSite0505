/**
 * Hide Team Members Script
 *
 * Adds is_active column and hides specific team members from About page
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const NAMES_TO_HIDE = [
  'Aguda',
  'Israel',
  'Ayodele',
  'Godfather',
  'Apollo',
  'Alwreonzivic',
  'Dr. Scott',
  'Dr Scott',
  'Amit',
  'Derrick',
  'Yuri',
  'Dr. Murtaza',
  'Dr Murtaza',
  'Emmanuel',
  'HEYEAH',
  'GlitterUnicorn',
  'Grace'
];

async function hideTeamMembers() {
  console.log('🔍 Hiding team members from About page...\n');

  try {
    // Step 1: Add is_active column if it doesn't exist
    console.log('📝 Adding is_active column to people table...');
    const { error: alterError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE people
        ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
      `
    });

    // If RPC doesn't exist, we'll use direct SQL (this might fail but we'll handle it)
    // Actually, let's just try to update - if column doesn't exist, we'll get an error

    // Step 2: First, set everyone to active (default state)
    console.log('📝 Setting all people to active by default...');
    const { error: defaultError } = await supabase
      .from('people')
      .update({ is_active: true })
      .neq('id', 0); // Update all rows

    if (defaultError && !defaultError.message.includes('column "is_active" does not exist')) {
      console.error('Error setting default active state:', defaultError);
    }

    // Step 3: Hide specific people
    console.log('🔍 Searching for people to hide...\n');

    let hiddenCount = 0;

    for (const name of NAMES_TO_HIDE) {
      // Search for people with this name (case-insensitive, partial match)
      const { data: people, error: searchError } = await supabase
        .from('people')
        .select('*')
        .ilike('name', `%${name}%`);

      if (searchError) {
        console.error(`Error searching for ${name}:`, searchError);
        continue;
      }

      if (people && people.length > 0) {
        for (const person of people) {
          // Update to inactive
          const { error: updateError } = await supabase
            .from('people')
            .update({ is_active: false })
            .eq('id', person.id);

          if (updateError) {
            console.error(`Error hiding ${person.name}:`, updateError);
          } else {
            console.log(`✅ Hidden: ${person.name} (${person.role})`);
            hiddenCount++;
          }
        }
      } else {
        console.log(`⚠️  Not found: ${name}`);
      }
    }

    console.log(`\n🎉 Successfully hidden ${hiddenCount} team members!`);
    console.log('\nNext step: Update React hooks to filter by is_active = true');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

hideTeamMembers();
