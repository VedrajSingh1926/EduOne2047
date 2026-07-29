import { initializeDatabase } from './src/lib/db-init';
initializeDatabase().then(res => {
  console.log("Result:", res);
  process.exit(0);
});
