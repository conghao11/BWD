import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './server/db';
import path from 'path';


async function main() {
  const migrationsPath = path.resolve('./migrations');
console.log('📂 Using migrations folder at:', migrationsPath);

await migrate(db, {
  migrationsFolder: migrationsPath,
});
  try {
    console.log('📦 Starting database migration...');
    await migrate(db, {
      migrationsFolder: './migrations',
    });
    console.log('✅ Migration completed successfully.');
  } catch (err) {
    console.error('❌ Migration failed:');

    // Ghi log chi tiết để biết bản chất lỗi
    if (err instanceof Error) {
      console.error('Error message:', err.message);
      console.error('Stack trace:', err.stack);
    } else {
      try {
        console.error('Raw error object:', JSON.stringify(err, null, 2));
      } catch {
        console.error('Unknown error:', err);
      }
    }

    process.exit(1);
  }
}

main();
