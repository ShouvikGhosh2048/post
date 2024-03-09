"use server";

import { auth } from '@/auth';
import { db } from '@/db/db';
import { posts } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const postSchema = z.object({
    title: z.string({
        invalid_type_error: "Invalid title",
    }).max(256, 'The title has a limit of 256 characters.'),
    text: z.string({
        invalid_type_error: "Invalid text",
    }),
});

export async function createPost(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        redirect('/');
    }

    const fields = postSchema.safeParse({
        title: formData.get('title'),
        text: formData.get('text'),
    });

    if (!fields.success) {
        return fields.error.flatten().fieldErrors.title;
    }

    let id;
    try {
        id = (await db.insert(posts).values({
            title: fields.data.title,
            text: fields.data.text,
            authorId: session.user.id,
        }).returning({ id: posts.id }))[0].id;
    } catch {
        return ["Couldn't create the post: DB error"];
    }

    revalidatePath('/');
    redirect(`/post/${id}`)
}