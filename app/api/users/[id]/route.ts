import { NextResponse } from "next/server";
import { getUserById } from "@/lib/db/queries";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Fetching user with ID:", params.id);
    const user = await getUserById(params.id);
    console.log("User fetched:", user);
    if (user) {
      return NextResponse.json(user);
    } else {
      console.log("User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Detailed error fetching user:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
