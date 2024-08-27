import MarvelCharacters from "./_components/MarvelCharacters";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="">
      <MarvelCharacters />
    </main>
  );
}
