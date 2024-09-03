import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!db) {
    console.log("Creating new database connection");
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    db = drizzle(pool, { schema });
    console.log("Database connection created");
  } else {
    console.log("Using existing database connection");
  }
  return db;
}
