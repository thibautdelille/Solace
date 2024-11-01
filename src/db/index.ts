import { Advocate } from '@/types';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const setup = (): PostgresJsDatabase<Record<string, Advocate>> => {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set');
    return drizzle(postgres(''));
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db: PostgresJsDatabase<Record<string, Advocate>> = drizzle(queryClient);
  return db;
};

export default setup();
