import { auth } from "@/auth";
import CreatePostForm from "./Form";
import { redirect } from "next/navigation";

export default async function CreatePost() {
    const session = await auth();
    if (!session?.user) {
        redirect('/');
    }

    return (
        <div className="p-5">
            <p className="text-2xl text-center mb-5">Create post</p>
            <CreatePostForm/>
        </div>
    );
}