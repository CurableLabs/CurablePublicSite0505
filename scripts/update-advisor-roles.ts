/**
 * Update Advisor Roles
 * Remove "Advisor in" prefix since badges already show they're advisors
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function updateAdvisorRoles() {
  console.log('🔄 Updating advisor roles...\n');

  const advisorsToUpdate = ['Asa', 'AJ', 'Peter', 'Max', 'Domino'];

  for (const name of advisorsToUpdate) {
    // Find the person
    const { data: people, error: searchError } = await supabase
      .from('people')
      .select('*')
      .eq('name', name);

    if (searchError) {
      console.error(`❌ Error searching for ${name}:`, searchError);
      continue;
    }

    if (people && people.length > 0) {
      const person = people[0];
      console.log(`✓ Found: ${person.name} - Current role: "${person.role}"`);

      // Update role to just "Engineering & AI"
      const { error: updateError } = await supabase
        .from('people')
        .update({ role: 'Engineering & AI' })
        .eq('id', person.id);

      if (updateError) {
        console.error(`❌ Error updating ${name}:`, updateError);
      } else {
        console.log(`✅ Updated: ${person.name} -> "Engineering & AI"\n`);
      }
    } else {
      console.log(`⚠️  Not found: ${name}\n`);
    }
  }

  console.log('🎉 Done! All advisor roles updated to match format.');
}

updateAdvisorRoles();
