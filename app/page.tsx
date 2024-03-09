import { db } from "@/db/db";
import { posts } from "@/db/schema";
import { sql } from "drizzle-orm";
import Link from "next/link";

export default async function Home() {
  const allPosts = await db.query.posts.findMany({
    columns: {
      text: false
    },
    extras: {
      // We only need the first 50 characters.
      // We fetch 1 more character to check whether the string has length <= 50.
      text: sql<string>`substring(${posts.text}, 1, 51)`.as('text'),
    },
    with: {
      author: true,
    }
  });

  return (
    <div className="py-10 px-5">
      {allPosts.map(post => (
        <div key={post.id} className="border rounded mb-7 hover:bg-pink-50">
          <Link href={`/post/${post.id}`} className="block px-5 py-2">
            <p className="text-2xl font-bold">{post.title}</p>
            <p className="text-slate-700 mb-3">- {post.author?.name}</p>
            <p>{post.text.length > 50 ? post.text.slice(0, 50) + '...' : post.text}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
