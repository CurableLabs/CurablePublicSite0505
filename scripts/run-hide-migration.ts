/**
 * Run Hide Members Migration
 *
 * Executes the SQL migration to add is_active column and hide specific members
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
  console.log('🚀 Running hide members migration...\n');

  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // Read SQL migration file
    const sqlPath = join(process.cwd(), 'supabase/migrations/002_add_is_active_column.sql');
    const sql = readFileSync(sqlPath, 'utf-8');

    console.log('📝 Adding is_active column and hiding members...');

    // Execute SQL
    const result = await client.query(sql);

    console.log('✅ Migration completed successfully!\n');
    console.log('📊 Updates:');
    console.log('   - Added is_active column to people table');
    console.log('   - Hidden 15 team members from About page');
    console.log('   - Data and photos preserved in database\n');

  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
