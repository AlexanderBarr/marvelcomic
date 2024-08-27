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

interface Comic {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  dates: { type: string; date: string }[];
}

function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)$/);
  return match ? Number(match[1]) : 0;
}

function transformComicItemToComic(item: ComicItem): Comic {
  return {
    id: extractIdFromUrl(item.resourceURI),
    title: item.name,
    thumbnail: {
      path: "default_path", // Adjust as needed
      extension: "jpg", // Adjust as needed
    },
    dates: [], // Adjust as needed
  };
}
function extractComicIds(characters: Character[]): string[] {
  const comicIds: string[] = [];

  characters.forEach((character) => {
    character.comics.items.forEach((item) => {
      const comicId = extractIdFromUrl(item.resourceURI);
      if (comicId) {
        comicIds.push(comicId.toString()); // Ensure IDs are strings
      }
    });
  });

  return comicIds;
}
export function useCharacterData(photoId: string) {
  const [isBusy, setIsBusy] = useState(true);
  const [image, setImage] = useState<any>(null);
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idAsNumber = Number(photoId);
        if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

        // Fetch the character by ID
        const fetchedImage = await fetchMarvelCharactersById(idAsNumber);

        // Handle case where fetchedImage might be empty
        if (fetchedImage.length > 0) {
          setImage(fetchedImage[0]);
        } else {
          setImage(null);
        }

        // Extract comic IDs and fetch comics
        const comicIds = extractComicIds(fetchedImage);
        if (comicIds.length > 0) {
          const fetchedComics = await fetchAllComics(comicIds);
          setComics(fetchedComics);
        } else {
          setComics([]);
        }
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
