"use client";

import { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export function Submit({ text }: { text: string }) {
    const { pending } = useFormStatus();

    return (<button type="submit" className="px-3 py-2 bg-pink-700 text-white rounded" disabled={pending}>{text}</button>);
}

type InputAreaProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "disabled">;
export function Input(props: InputAreaProps) {
    const { pending } = useFormStatus();
    return (<input {...props} className="p-3 border rounded w-full" disabled={pending}/>);
}

type TextAreaProps = Omit<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "disabled">;
export function TextArea(props: TextAreaProps) {
    const { pending } = useFormStatus();
    return (<textarea {...props} className="p-3 border rounded w-full" rows={5} disabled={pending}/>);
}