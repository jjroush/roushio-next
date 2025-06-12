require('dotenv').config({ path: ['.env.local', '.env'] });
const pool = require('../lib/db');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const client = await pool.connect();
  try {
    const migrationSQL = fs.readFileSync(
      path.join(__dirname, '../migrations/create_subscribers_table.sql'),
      'utf8'
    );
    
    await client.query(migrationSQL);
    console.log('Migration completed successfully');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();