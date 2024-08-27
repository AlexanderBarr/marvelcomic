"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
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
  // other properties
}

type CharacterResponse = Character[];
// Mock API functions to simulate data fetching
const getImage = async (id: number) => {
  // Replace with your actual API call
  return fetchMarvelCharactersById(id);
};

function extractIdFromUrl(url: string): string | null {
  const match = url.match(/\/(\d+)$/);
  return match ? (match[1] ?? null) : null;
}
function extractComicIds(characters: CharacterResponse): string[] {
  const comicIds: string[] = [];

  characters.forEach((character) => {
    character.comics.items.forEach((item) => {
      const comicId = extractIdFromUrl(item.resourceURI);
      if (comicId) {
        comicIds.push(comicId);
      }
    });
  });

  return comicIds;
}

export function FullPageImageView(props: { photoId: string }) {
  const [isBusy, setIsBusy] = useState(true);
  const [image, setImage] = useState<any>(null); // Adjust type as needed
  const [comicImg, setComicImg] = useState<any>(null); // Adjust type as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idAsNumber = Number(props.photoId);
        if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

        const fetchedImage = await getImage(idAsNumber);
        setImage(fetchedImage[0]);

        console.log(fetchedImage); // Log the data

        const comicIds = extractComicIds(fetchedImage);

        console.log(comicIds);
        const comics = await fetchAllComics(comicIds);
        setComicImg(comics);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsBusy(false);
      }
    };

    fetchData();
  }, [props.photoId]);

  if (isBusy) {
    return (
      <div className="flex h-full w-screen items-center justify-center text-white">
        <div>Loading...</div> {/* Customize your loading screen here */}
      </div>
    );
  }

  return (
    <div className="flex h-full w-screen min-w-0 items-center justify-center text-white">
      <div className="flex-shrink flex-grow">
        {image && (
          <Image
            src={`${image.thumbnail.path}.${image.thumbnail.extension}`}
            alt={image.name}
            className="object-cover"
            width={192}
            height={192}
          />
        )}
      </div>
      <div className="flex h-full w-56 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-xl">{image?.name}</div>

        <div className="p-2">
          <div>Description:</div>
          <div>{image?.description}</div>
        </div>
        <div className="comics-list">
          {comicImg.map((comic) => (
            <div key={comic.id} className="comic-item">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <p>{comic.title}</p>
            </div>
          ))}
        </div>
        <div className="p-2">
          {/* Implement delete functionality if needed */}
          <form
            action={async () => {
              //   "use server";
              // await deleteImage(idAsNumber); // Uncomment and implement deleteImage function
            }}
          >
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    </div>
  );
}
