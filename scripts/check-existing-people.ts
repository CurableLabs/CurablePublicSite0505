/**
 * Check Existing People
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

async function checkPeople() {
  const namesToCheck = ['Asa', 'AJ', 'Peter', 'Max', 'Domino'];

  console.log('🔍 Checking for existing people...\n');

  for (const name of namesToCheck) {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .ilike('name', `%${name}%`);

    if (error) {
      console.error(`Error checking ${name}:`, error);
    } else if (data && data.length > 0) {
      data.forEach(person => {
        console.log(`✓ Found: ${person.name} - ${person.role} (ID: ${person.id}, Active: ${person.is_active})`);
      });
    } else {
      console.log(`✗ Not found: ${name}`);
    }
  }
}

checkPeople();
