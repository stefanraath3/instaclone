import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function createUser(id: string, username: string, email: string) {
  const db = await getDb();
  try {
    await db.insert(users).values({
      id,
      username,
      email,
    });
    console.log("User created successfully:", { id, username, email });
  } catch (error) {
    console.error("Error creating user in database:", error);
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const db = await getDb();
    console.log("Querying database for user with ID:", id);
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    console.log("Database query result:", dbUser);
    return dbUser[0] || null;
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw error;
  }
}
