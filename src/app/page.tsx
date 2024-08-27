import Image from "next/image";
import Link from "next/link";
import MarvelCharacters from "./_components/MarvelCharacters";
// import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="">
      <MarvelCharacters />
      {/* <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn> */}
    </main>
  );
}
