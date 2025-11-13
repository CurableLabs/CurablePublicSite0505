/**
 * Run SQL Migration Script
 *
 * Executes the schema migration SQL directly against the Supabase database
 */

import 'dotenv/config';
import { Client } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ Missing DATABASE_URL in .env file');
  process.exit(1);
}

async function runMigration() {
  console.log('🚀 Running SQL migration...');
  console.log(`📍 Target: ${DATABASE_URL.split('@')[1]}\n`);

  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    // Connect to database
    await client.connect();
    console.log('✅ Connected to database\n');

    // Read SQL migration file
    const sqlPath = join(process.cwd(), 'supabase/migrations/001_initial_schema.sql');
    const sql = readFileSync(sqlPath, 'utf-8');

    console.log('📝 Executing SQL migration...');

    // Execute SQL
    await client.query(sql);

    console.log('✅ SQL migration completed successfully!\n');
    console.log('📊 Created tables:');
    console.log('   - people');
    console.log('   - haikus');
    console.log('   - core_values');
    console.log('   - whitepaper_sections');
    console.log('   - key_sections');
    console.log('   - tokenomics');
    console.log('   - site_content');
    console.log('\n🎉 Database schema is ready!\n');

  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
