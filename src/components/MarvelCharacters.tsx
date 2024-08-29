"use client";
import React, { useState, useEffect } from "react";
import {
  fetchMarvelAllCharacters,
  fetchMarvelCharacter,
} from "~/server/queries";
import { CharacterCard } from "~/components/CharacterCard";
import { TopNavSearch } from "~/components/TopNavSearch";

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
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchCharacters = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const limit = 20;
      const newCharacters = await fetchMarvelAllCharacters(limit, offset);

      if (newCharacters.length < limit) {
        setHasMore(false);
      }

      setCharacters((prev) => [...prev, ...newCharacters]);
      setOffset((prev) => prev + limit);
    } catch (err) {
      setError("Failed to fetch characters. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const searchedCharacter = await fetchMarvelCharacter(searchQuery);
      setCharacters(searchedCharacter);
      setLoading(false);
    };
    fetchData().catch(console.error);
  }, [searchQuery]);

  const handleFetchMore = async () => {
    if (!loading && hasMore) {
      await fetchCharacters();
    }
  };

  return (
    <div>
      <h1 className="rounded-md py-4 text-center text-3xl font-bold text-white shadow-lg">
        Characters
      </h1>

      <div className="mb-4 flex items-center justify-center">
        <TopNavSearch
          onSearch={(query) => {
            setSearchQuery(query);
          }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            thumbnail={character.thumbnail}
          />
        ))}
      </div>
      <div className="flex justify-center p-4">
        <button
          onClick={handleFetchMore}
          className={`rounded-lg px-4 py-2 font-semibold text-white transition-colors duration-300 ${
            loading || !hasMore
              ? "cursor-not-allowed bg-gray-500"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
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
    </div>
  );
}
