import crypto from "crypto";

// Define the base URL and keys
const marvelApiStart =
  "https://gateway.marvel.com:443/v1/public/characters?apikey=";
const marvelPublicKey = "dacd124f34943f4f40c5692e6a750038";
const marvelPrivateKey = "a499974f88943a7e7f430c2a0268ef100335cd3d";

// Define interfaces for API responses
interface ComicThumbnail {
  path: string;
  extension: string;
}

interface ComicDate {
  type: string;
  date: string;
}

interface ComicItem {
  resourceURI: string;
  name: string;
}

interface Comic {
  id: number;
  title: string;
  thumbnail: ComicThumbnail;
  dates: ComicDate[];
}

interface CharacterThumbnail {
  path: string;
  extension: string;
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
  thumbnail: CharacterThumbnail;
  resourceURI: string;
  comics: Comics;
}

interface ApiResponse<T> {
  data: {
    results: T[];
  };
}

function generateHash(ts: string): string {
  return crypto
    .createHash("md5")
    .update(ts + marvelPrivateKey + marvelPublicKey)
    .digest("hex");
}

export async function fetchMarvelCharacter(name: string): Promise<Character[]> {
  const ts = new Date().getTime().toString();
  const hash = generateHash(ts);
  const requestUrl = `${marvelApiStart}${marvelPublicKey}&ts=${ts}&hash=${hash}&nameStartsWith=${name}`;

  const response = await fetch(requestUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch Marvel characters");
  }

  const data: ApiResponse<Character> = await response.json();
  return data.data.results;
}

export async function fetchMarvelAllCharacters(
  limit = 100,
  offset = 0,
): Promise<Character[]> {
  const ts = new Date().getTime().toString();
  const hash = generateHash(ts);
  const requestUrl = `${marvelApiStart}${marvelPublicKey}&ts=${ts}&hash=${hash}&limit=${limit}&offset=${offset}`;

  console.log("requestUrl:", requestUrl);
  const response = await fetch(requestUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch Marvel characters");
  }

  const data: ApiResponse<Character> = await response.json();
  console.log(data);

  return data.data.results;
}

export async function fetchMarvelCharactersById(
  id: number,
): Promise<Character[]> {
  const ts = new Date().getTime().toString();
  const hash = generateHash(ts);
  const marvelApiStartWithId = `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=`;
  const requestUrl = `${marvelApiStartWithId}${marvelPublicKey}&ts=${ts}&hash=${hash}`;

  const response = await fetch(requestUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch Marvel characters");
  }

  const data: ApiResponse<Character> = await response.json();
  return data.data.results;
}

export async function fetchComicById(comicId: string): Promise<Comic> {
  const ts = new Date().getTime().toString();
  const hash = generateHash(ts);
  const marvelApiStartWithId = `https://gateway.marvel.com:443/v1/public/comics/${comicId}?apikey=`;
  const requestUrl = `${marvelApiStartWithId}${marvelPublicKey}&ts=${ts}&hash=${hash}`;

  const response = await fetch(requestUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch comic with ID: ${comicId}`);
  }

  const data: ApiResponse<Comic> = await response.json();

  // Handle cases where no results are returned
  const comic = data.data.results[0];
  if (!comic) {
    throw new Error(`Comic with ID ${comicId} not found`);
  }

  return comic;
}

export async function fetchAllComics(comicIds: string[]): Promise<Comic[]> {
  return await Promise.all(comicIds.map((id) => fetchComicById(id)));
}
