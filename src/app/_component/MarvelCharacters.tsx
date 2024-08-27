"use client"; // Mark this file as a Client Component
export const dynamic = "force-dynamic";
import React, { useState } from "react";
import { fetchMarvelAllCharacters } from "../services/marvelApi";
import Link from "next/link";

interface CharacterData {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export default function MarvelCharacters() {
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0); // Track the current offset
  const [hasMore, setHasMore] = useState(true); // To control if more data is available

  const fetchMoreCharacters = async () => {
    if (loading) return; // Prevent multiple fetches at the same time
    setLoading(true);

    try {
      const limit = 1; // Number of characters to fetch per request
      const newCharacters = await fetchMarvelAllCharacters(limit, offset);

      if (newCharacters.length < limit) {
        setHasMore(false); // No more characters to load
      }

      setCharacters((prev) => [...prev, ...newCharacters]);
      setOffset((prev) => prev + limit); // Increment the offset
    } catch (err) {
      setError("Failed to fetch characters. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchMore = () => {
    if (!loading && hasMore) {
      fetchMoreCharacters();
    }
  };

  const handleCharacterClick = (name: string) => {
    console.log(name);
  };

  return (
    <div>
      <h1>Characters</h1>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {characters.map((character) => (
          <div key={character.id} className="flex items-center justify-center">
            {/* <button
              onClick={() => handleCharacterClick(character.name)}
              className="relative overflow-hidden rounded"
              style={{ width: "80px", height: "80px" }}
            > */}
            <Link
              href={`/character/${character.id}`}
              className="relative overflow-hidden rounded"
              style={{ width: "80px", height: "80px" }}
            >
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-xs font-semibold text-white">
                {character.name}
              </span>
            </Link>
            {/* </button> */}
          </div>
        ))}
      </div>
      <button
        onClick={handleFetchMore}
        className="rounded bg-blue-500 p-2 text-white"
        disabled={loading || !hasMore}
      >
        {loading
          ? "Loading..."
          : hasMore
            ? "Load More Characters"
            : "No More Characters"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
