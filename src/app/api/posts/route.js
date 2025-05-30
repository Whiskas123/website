import { getSortedPostsData } from "../../lib/posts";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getSortedPostsData(true);
  return NextResponse.json(posts);
}
