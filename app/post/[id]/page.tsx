import { db } from "@/db/db";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Post({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
        notFound();
    }

    const post = await db.query.posts.findFirst({
        where: (posts, { eq }) => eq(posts.id, id),
        with: {
            author: true,
        }
    });
    if (!post || !post.author) {
        notFound();
    }

    return (
        <div className="p-5 max-w-3xl mx-auto">
            <p className="text-2xl font-bold">{post.title}</p>
            <span className="inline-flex my-2 gap-2 items-center">
                {post.author.image && <Image src={post.author.image} alt="Image" width="30" height="30" className="rounded-full border border-slate-300" />}
                <span>{post.author.name}</span>
            </span>
            <p className="my-5">{post.text}</p>
        </div>
    );
};