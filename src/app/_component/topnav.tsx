"use client";
// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
// import { UploadButton } from "~/utils/uploadthing";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b bg-blue-700 p-4 text-xl font-semibold">
      <div>Marvel Comics</div>

      <div className="flex flex-row items-center gap-4">
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
      </div>
    </nav>
  );
}
