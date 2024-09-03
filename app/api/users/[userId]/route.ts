import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const db = await getDb();
    const user = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        // Add other fields you need
      })
      .from(users)
      .where(eq(users.id, params.userId))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user[0]);
  } catch (error) {
    console.error("Detailed error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
