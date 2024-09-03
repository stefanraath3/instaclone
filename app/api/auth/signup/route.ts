import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const { id, email } = await request.json();
    const db = await getDb();

    const newUser = await db
      .insert(users)
      .values({
        id,
        email,
        username: email.split("@")[0], // Generate a username from email
      })
      .returning();

    return NextResponse.json(newUser[0]);
  } catch (error) {
    console.error("Detailed error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
