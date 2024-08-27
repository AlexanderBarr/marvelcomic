import Link from "next/link";
import MarvelCharacters from "./_component/MarvelCharacters";

export default function HomePage() {
  return (
    <main className="flex flex-wrap">
      <MarvelCharacters /> {/* Use the client component */}
    </main>
  );
}
