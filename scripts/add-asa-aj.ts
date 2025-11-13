/**
 * Add Asa and AJ
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

async function addAsaAndAJ() {
  console.log('🚀 Adding Asa and AJ...\n');

  const people = [
    {
      name: 'Asa',
      role: 'Advisor in Engineering & AI',
      member_group: 'advisor',
      avatar_url: null,
      is_active: true,
      display_order: 100,
    },
    {
      name: 'AJ',
      role: 'Advisor in Engineering & AI',
      member_group: 'advisor',
      avatar_url: null,
      is_active: true,
      display_order: 101,
    },
  ];

  for (const person of people) {
    const { data, error } = await supabase
      .from('people')
      .insert([person])
      .select();

    if (error) {
      console.error(`❌ Error adding ${person.name}:`, error.message);
    } else {
      console.log(`✅ Added: ${person.name}`);
    }
  }

  console.log('\n✅ Done!');
}

addAsaAndAJ();
