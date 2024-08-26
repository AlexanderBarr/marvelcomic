// services/marvelApi.ts
import crypto from "crypto";

const marvelApiStart =
  "https://gateway.marvel.com:443/v1/public/characters?apikey=";
const marvelPublicKey = "dacd124f34943f4f40c5692e6a750038";
const marvelPrivateKey = "a499974f88943a7e7f430c2a0268ef100335cd3d";

function generateHash(ts: string): string {
  return crypto
    .createHash("md5")
    .update(ts + marvelPrivateKey + marvelPublicKey)
    .digest("hex");
}

export async function fetchMarvelCharacter(name: string) {
  const ts = new Date().getTime().toString();
  const hash = generateHash(ts);
  const requestUrl = `${marvelApiStart}${marvelPublicKey}&ts=${ts}&hash=${hash}&nameStartsWith=${name}`;

  const response = await fetch(requestUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch Marvel characters");
  }

  const data = await response.json();
  return data.data.results;
}

export async function fetchMarvelAllCharacters(
  limit: number = 100,
  offset: number = 0,
) {
  const ts = new Date().getTime().toString();
  const hash = generateHash(ts);
  const requestUrl = `${marvelApiStart}${marvelPublicKey}&ts=${ts}&hash=${hash}&limit=${limit}&offset=${offset}`;

  console.log("requestUrl:", requestUrl);
  const response = await fetch(requestUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch Marvel characters");
  }

  const data = await response.json();
  console.log(data);

  return data.data.results;
}
