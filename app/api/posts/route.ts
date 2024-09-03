import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { posts, users } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const db = await getDb();
    const allPosts = await db
      .select({
        id: posts.id,
        caption: posts.caption,
        imageUrl: posts.imageUrl,
        createdAt: posts.createdAt,
        username: users.username,
        userAvatarUrl: users.avatarUrl,
      })
      .from(posts)
      .innerJoin(users, eq(posts.userId, users.id))
      .orderBy(desc(posts.createdAt));
    return NextResponse.json(allPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDb();
    const { userId, caption, imageUrl } = await request.json();
    console.log("Received data:", { userId, caption, imageUrl });

    // Check if the user exists
    const userExists = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (userExists.length === 0) {
      console.error("User not found:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newPost = await db
      .insert(posts)
      .values({ userId, caption, imageUrl })
      .returning();
    console.log("Inserted post:", newPost);

    const postWithUser = await db
      .select({
        id: posts.id,
        caption: posts.caption,
        imageUrl: posts.imageUrl,
        createdAt: posts.createdAt,
        username: users.username,
        userAvatarUrl: users.avatarUrl,
      })
      .from(posts)
      .innerJoin(users, eq(posts.userId, users.id))
      .where(eq(posts.id, newPost[0].id))
      .limit(1);
    console.log("Post with user:", postWithUser);

    return NextResponse.json(postWithUser[0]);
  } catch (error) {
    console.error("Detailed error creating post:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
