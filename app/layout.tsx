import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Post",
  description: "idk",
};

async function Navbar() {
  const session = await auth();

  return (
    <nav className="px-3 flex justify-between items-center sticky bg-pink-100 border-b border-pink-200 h-12">
      <Link href="/" className="text-xl font-bold">Posts</Link>
      <div className="flex gap-5 items-center">
        {!session && (
          <form className="flex items-center" action={async () => {
            "use server";
            await signIn('github');
          }}>
            <button>Sign in</button>
          </form>
        )}
        {session && (
          <>
            <Link href="/">
              {session.user?.image
                && <Image src={session.user.image} alt="Profile"
                          width="32" height="32" className="border border-slate-300 rounded-full" />}
              {!(session.user?.image) && <span>Profile</span>}
            </Link>
            <Link href="/post/create" className="flex items-center justify-center">New post</Link>
            <form className="flex items-center" action={async () => {
              "use server";
              await signOut();
            }}>
              <button>Sign out</button>
            </form>
          </>
        )}
      </div>
    </nav>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
