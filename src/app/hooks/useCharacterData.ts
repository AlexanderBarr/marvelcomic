import { useState, useEffect } from "react";
import { fetchMarvelCharactersById, fetchAllComics } from "~/server/queries";

interface ComicItem {
  resourceURI: string;
  name: string;
}

interface Comics {
  available: number;
  collectionURI: string;
  items: ComicItem[];
  returned: number;
}

interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: Comics;
}

function extractIdFromUrl(url: string): string | null {
  const match = url.match(/\/(\d+)$/);
  return match ? (match[1] ?? null) : null;
}

function extractComicIds(characters: Character[]): string[] {
  const comicIds: string[] = [];

  characters.forEach((character) => {
    character?.comics.items.forEach((item) => {
      const comicId = extractIdFromUrl(item.resourceURI);
      if (comicId) {
        comicIds.push(comicId);
      }
    });
  });

  return comicIds;
}

export function useCharacterData(photoId: string) {
  const [isBusy, setIsBusy] = useState(true);
  const [image, setImage] = useState<any>(null);
  const [comics, setComics] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idAsNumber = Number(photoId);
        if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

        const fetchedImage = await fetchMarvelCharactersById(idAsNumber);
        setImage(fetchedImage[0]);

        const comicIds = extractComicIds(fetchedImage);
        const fetchedComics = await fetchAllComics(comicIds);
        setComics(fetchedComics);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsBusy(false);
      }
    };

    fetchData();
  }, [photoId]);

  return { isBusy, image, comics };
}
