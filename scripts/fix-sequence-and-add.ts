/**
 * Fix Sequence and Add Asa & AJ
 */

import 'dotenv/config';
import { Client } from 'pg';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ Missing DATABASE_URL');
  process.exit(1);
}

async function fixSequenceAndAdd() {
  const client = new Client({ connectionString: DATABASE_URL });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // Check current max ID
    const maxIdResult = await client.query('SELECT MAX(id) FROM people');
    const maxId = maxIdResult.rows[0].max || 0;
    console.log(`📊 Current max ID: ${maxId}`);

    // Fix the sequence
    console.log('🔧 Fixing sequence...');
    await client.query(`SELECT setval('people_id_seq', ${maxId}, true)`);
    console.log('✅ Sequence fixed\n');

    // Add Asa
    console.log('📝 Adding Asa...');
    const asaResult = await client.query(`
      INSERT INTO people (name, role, member_group, avatar_url, is_active, display_order)
      VALUES ('Asa', 'Advisor in Engineering & AI', 'advisor', NULL, true, 100)
      RETURNING *
    `);
    console.log(`✅ Added Asa (ID: ${asaResult.rows[0].id})`);

    // Add AJ
    console.log('📝 Adding AJ...');
    const ajResult = await client.query(`
      INSERT INTO people (name, role, member_group, avatar_url, is_active, display_order)
      VALUES ('AJ', 'Advisor in Engineering & AI', 'advisor', NULL, true, 101)
      RETURNING *
    `);
    console.log(`✅ Added AJ (ID: ${ajResult.rows[0].id})`);

    console.log('\n🎉 Successfully added Asa and AJ!');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

fixSequenceAndAdd();
