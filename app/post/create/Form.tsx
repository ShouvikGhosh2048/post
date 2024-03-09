"use client";

import { Input, Submit, TextArea } from "@/app/components/formComponents";
import { createPost } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function CreatePostForm() {
    const [errors, formAction] = useFormState(createPost, []);

    return (
        <form action={formAction} className="flex flex-col items-center max-w-md mx-auto space-y-5">
            {errors && errors.length > 0 && (
                <div>
                    {errors.map((error, i) => <p key={i}>{error}</p>)}
                </div>
            )}
            <Input name="title" maxLength={256} placeholder="Title" required/>
            <TextArea name="text" placeholder="Text" required/>
            <Submit text="Create post"/>
        </form>
    );
};