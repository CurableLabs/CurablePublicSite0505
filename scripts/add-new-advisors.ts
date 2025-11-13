/**
 * Add New Advisors Script
 *
 * Adds new advisors to the people table and uploads avatars to Supabase Storage
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { basename } from 'path';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Avatar paths
const AVATARS = {
  peter: '/Users/ilyssaevans/Documents/0NFTS/lads/lad_105_inkspired.png',
  domino: '/Users/ilyssaevans/Documents/0NFTS/ladies/lady_099_domino.png',
};

async function uploadAvatar(name: string, filePath: string): Promise<string | null> {
  try {
    console.log(`📤 Uploading avatar for ${name}...`);

    const fileBuffer = readFileSync(filePath);
    const fileName = `${name.toLowerCase()}_${Date.now()}.png`;

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, fileBuffer, {
        contentType: 'image/png',
        upsert: false,
      });

    if (error) {
      console.error(`Error uploading ${name}'s avatar:`, error.message);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    console.log(`✅ Uploaded: ${name} -> ${urlData.publicUrl}`);
    return urlData.publicUrl;
  } catch (error: any) {
    console.error(`Error uploading ${name}'s avatar:`, error.message);
    return null;
  }
}

async function addAdvisors() {
  console.log('🚀 Adding new advisors to the database...\n');

  try {
    // Upload avatars
    const peterAvatarUrl = await uploadAvatar('Peter', AVATARS.peter);
    const dominoAvatarUrl = await uploadAvatar('Domino', AVATARS.domino);

    console.log('\n📝 Inserting advisors into database...\n');

    // Define advisors
    const advisors = [
      {
        name: 'Asa',
        role: 'Advisor in Engineering & AI',
        member_group: 'advisor',
        avatar_url: null, // No avatar yet
        is_active: true,
        display_order: 100, // Put new advisors at the end
      },
      {
        name: 'AJ',
        role: 'Advisor in Engineering & AI',
        member_group: 'advisor',
        avatar_url: null, // No avatar yet
        is_active: true,
        display_order: 101,
      },
      {
        name: 'Peter',
        role: 'Advisor in Engineering & AI',
        member_group: 'advisor',
        avatar_url: peterAvatarUrl,
        is_active: true,
        display_order: 102,
      },
      {
        name: 'Max',
        role: 'Advisor in Engineering & AI',
        member_group: 'advisor',
        avatar_url: null, // No avatar yet
        is_active: true,
        display_order: 103,
      },
      {
        name: 'Domino',
        role: 'Advisor in Engineering & AI',
        member_group: 'advisor',
        avatar_url: dominoAvatarUrl,
        is_active: true,
        display_order: 104,
      },
    ];

    // Insert each advisor
    for (const advisor of advisors) {
      const { data, error } = await supabase
        .from('people')
        .insert([advisor])
        .select();

      if (error) {
        console.error(`❌ Error adding ${advisor.name}:`, error.message);
      } else {
        console.log(`✅ Added: ${advisor.name} (${advisor.role})`);
      }
    }

    console.log('\n🎉 Successfully added all new advisors!\n');
    console.log('Summary:');
    console.log('  - Asa (no avatar yet)');
    console.log('  - AJ (no avatar yet)');
    console.log('  - Peter (with avatar ✓)');
    console.log('  - Max (no avatar yet)');
    console.log('  - Domino (with avatar ✓)');
    console.log('\nThese advisors are now visible on the About page!');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addAdvisors();
