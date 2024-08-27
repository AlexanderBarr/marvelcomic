import Image from "next/image";

// Define interfaces for better type safety
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
  return (
    <div className="comics-list grid grid-cols-3 gap-4">
      {comics.map((comic) => {
        // Extract the on sale date from the dates array
        const onSaleDate = comic.dates.find(
          (date) => date.type === "onsaleDate",
        )?.date;

        return (
          <div key={comic.id} className="comic-item flex flex-col items-center">
            <Image
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              width={150}
              height={150}
              className="object-cover"
            />
            <p className="mt-2 text-center">Title: {comic.title}</p>
            {/* Display the on sale date in a human-readable format */}
            {onSaleDate && (
              <p>
                Publication Date: {new Date(onSaleDate).toLocaleDateString()}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
