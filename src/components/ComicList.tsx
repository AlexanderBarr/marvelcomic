import Image from "next/image";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";

interface ComicDate {
  type: string;
  date: string;
}

interface ComicThumbnail {
  path: string;
  extension: string;
}

interface Comic {
  id: number;
  title: string;
  thumbnail: ComicThumbnail;
  dates: ComicDate[];
}

export function ComicList({ comics }: { comics: Comic[] }) {
  const handleComicClick = (comic: Comic) => {
    toast(
      <div className="flex items-center gap-2 text-white">
        <span className="text-lg">Added {comic.title}</span>
      </div>,
      {
        duration: 10000,
        id: `comic-toast-${comic.id}`,
      },
    );
  };
  return (
    <div className="flex h-svh flex-col">
      {comics.map((comic) => {
        const onSaleDate = comic.dates.find(
          (date) => date.type === "onsaleDate",
        )?.date;

        return (
          <div
            key={comic.id}
            className="comic-item flex cursor-pointer flex-col items-center"
            onClick={() => handleComicClick(comic)}
          >
            <Toaster />

            <Image
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              width={250}
              height={250}
              className="object-cover"
            />
            <p className="mt-2 text-center">{comic.title}</p>
            {onSaleDate && (
              <p>Date: {new Date(onSaleDate).toLocaleDateString()}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
