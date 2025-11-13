/**
 * Hide Dax from About page
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

async function hideDax() {
  console.log('🔍 Searching for Dax...\n');

  const { data, error } = await supabase
    .from('people')
    .select('*')
    .ilike('name', '%Dax%');

  if (error) {
    console.error('Error searching for Dax:', error);
    return;
  }

  if (data && data.length > 0) {
    for (const person of data) {
      console.log(`✓ Found: ${person.name} (ID: ${person.id}, Role: ${person.role})`);

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
  } else {
    console.log('⚠️  Dax not found in database');
  }

  console.log('🎉 Done!');
}

hideDax();
