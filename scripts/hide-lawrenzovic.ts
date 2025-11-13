/**
 * Hide Lawrenzovic from About page
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

async function hideLawrenzovic() {
  console.log('🔍 Searching for Lawrenzovic...\n');

  // Search for variations of the name
  const searchTerms = ['Lawrenzovic', 'Alwreonzivic', 'lawren', 'wreon'];

  for (const term of searchTerms) {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .ilike('name', `%${term}%`);

    if (error) {
      console.error(`Error searching for ${term}:`, error);
      continue;
    }

    if (data && data.length > 0) {
      for (const person of data) {
        console.log(`✓ Found: ${person.name} (ID: ${person.id})`);

        // Hide this person
        const { error: updateError } = await supabase
          .from('people')
          .update({ is_active: false })
          .eq('id', person.id);

        if (updateError) {
          console.error(`❌ Error hiding ${person.name}:`, updateError);
        } else {
          console.log(`✅ Hidden: ${person.name}\n`);
        }
      }
    }
  }

  console.log('🎉 Done! Lawrenzovic is now hidden from the About page.');
}

hideLawrenzovic();
