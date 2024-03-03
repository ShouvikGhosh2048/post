import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import { db } from "./db/db";
import { createTable } from "./db/schema";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: DrizzleAdapter(db, createTable),
    providers: [github],
});